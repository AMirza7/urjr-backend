// src/utils/sectionSearch.ts
import Fuse from 'fuse.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ipcData  from '../constants/ipc_sections_full.json';
import crpcData from '../constants/crpc_sections_full.json';
import cpcData  from '../constants/cpc_sections_full.json';
import bnsData  from '../constants/bns_sections_full.json';
import bnssData from '../constants/bnss_sections_full.json';
import bsaData  from '../constants/bsa_sections_full.json';

import type { Section } from '../types/sections';

type Act = Section['act'] | 'All';

const RAW: Record<Act, Omit<Section, 'act'>[]> = {
  IPC:  ipcData,
  CrPC: crpcData,
  CPC:  cpcData,
  BNS:  bnsData,
  BNSS: bnssData,
  BSA:  bsaData,
  All:  [...ipcData, ...crpcData, ...cpcData, ...bnsData, ...bnssData, ...bsaData],
};

const CACHE_KEY = (act: Act) => `@SectionsCache:${act}`;

async function loadSections(act: Act): Promise<Section[]> {
  try {
    const key = CACHE_KEY(act);
    const raw = await AsyncStorage.getItem(key);
    if (raw) return JSON.parse(raw) as Section[];

    const base = RAW[act];
    const withAct: Section[] = base.map(item => ({ ...item, act })) as Section[];
    await AsyncStorage.setItem(key, JSON.stringify(withAct));
    return withAct;
  } catch {
    return RAW[act].map(item => ({ ...item, act })) as Section[];
  }
}

export async function searchSections(
  act: Act,
  query: string
): Promise<Section[]> {
  const sections = await loadSections(act);
  const fuse = new Fuse(sections, {
    keys: ['number', 'title', 'summary', 'fullText'],
    threshold: 0.25,
    includeScore: true,
  });
  return fuse.search(query).map(r => r.item);
}

export const clearSectionCache = (act: Act) =>
  AsyncStorage.removeItem(CACHE_KEY(act));

export const refreshSectionCache = async (act: Act) => {
  const data = RAW[act].map(item => ({ ...item, act })) as Section[];
  await AsyncStorage.setItem(CACHE_KEY(act), JSON.stringify(data));
};
