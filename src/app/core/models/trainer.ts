export interface Trainer {
  id: string;
  name: string;
  email: string;
  teamCount: number;
  bannedUntil?: string | null;
}