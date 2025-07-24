// src/types/sections.ts

export interface Section {
  /** Which Act this comes from */
  act: 'IPC' | 'CrPC' | 'CPC' | 'BNS' | 'BNSS' | 'BSA';
  /** Section number or identifier */
  number: string;
  /** First sentence of the section text */
  title: string;
  /** Everything after the first sentence, for quick overviews */
  summary: string;
  /** The complete, uncut section text */
  fullText: string;
}
