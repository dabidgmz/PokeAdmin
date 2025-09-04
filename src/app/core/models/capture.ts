export type Rarity = 'common' | 'rare' | 'epic' | 'legend';

export interface Capture {
  id: string;
  trainerName: string;
  species: string;
  rarity: Rarity;
  date: string; // ISO
}