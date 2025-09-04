export interface User {
  id: string;
  email: string;
  name: string;
  role: 'prof_ox' | 'admin' | 'viewer';
  avatarUrl?: string;
  bannedUntil?: string | null;
}

export interface LoginResult {
  requires2fa: boolean;
  tempToken?: string;
}