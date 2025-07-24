import { diffLines, Change } from 'diff';

export interface Comparison {
  similarities:    string[];
  differences:     string[];
  majorChanges:    string[];
  implications:    string[];
}

/** Raw line‐by‐line diff between two texts */
export function getDiff(src: string, tgt: string): Change[] {
  return diffLines(src, tgt);
}

/** Bucket diff into your four categories */
export function categorizeDiff(diff: Change[]): Comparison {
  const sim: string[]  = [];
  const rem: string[]  = [];
  const add: string[]  = [];
  const imp: string[]  = [];

  diff.forEach(chunk => {
    const lines = chunk.value.trim().split('\n').filter(Boolean);
    if (chunk.added)      add.push(...lines);
    else if (chunk.removed) rem.push(...lines);
    else                  sim.push(...lines);
  });

  return {
    similarities: sim.slice(0,4),
    differences:  rem.slice(0,4),
    majorChanges: add.slice(0,4),
    implications: imp,   // leave empty or derive later
  };
}
