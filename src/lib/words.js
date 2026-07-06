import fs from 'fs/promises';
import path from 'path';

export const LEVELS = {
  N5: { label: 'N5' },
  N4: { label: 'N4' },
  N3: { label: 'N3' },
  N2: { label: 'N2' },
  N1: { label: 'N1' },
};

export function isValidLevel(level) {
  return Object.prototype.hasOwnProperty.call(LEVELS, level);
}

export function getLevelLabel(level) {
  return LEVELS[level]?.label ?? level;
}

// 폴더를 직접 읽어 Day{n}.json 파일 개수를 반환
export async function getTotalDays(level) {
  if (!isValidLevel(level)) return 0;
  const dirPath = path.join(process.cwd(), 'src', 'words', level);
  try {
    const files = await fs.readdir(dirPath);
    return files.filter((f) => /^Day\d+\.json$/.test(f)).length;
  } catch {
    return 0;
  }
}

// 파일명이 Day{n}.json (대문자)
export async function getWords(level, day) {
  if (!isValidLevel(level)) return null;
  const filePath = path.join(process.cwd(), 'src', 'words', level, `Day${day}.json`);
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function parseDayParam(dayParam) {
  const match = /^day(\d+)$/.exec(dayParam || '');
  return match ? parseInt(match[1], 10) : null;
}