import { Injectable } from '@angular/core';
import { Trainer } from '../models/trainer';

@Injectable({ providedIn: 'root' })
export class UserService {
  private mockTrainers: Trainer[] = [
    { id: '1', name: 'Ash Ketchum', email: 'ash@utt.edu.mx', teamCount: 6, bannedUntil: null },
    { id: '2', name: 'Misty Waterflower', email: 'misty@utt.edu.mx', teamCount: 3, bannedUntil: null },
    { id: '3', name: 'Brock Harrison', email: 'brock@utt.edu.mx', teamCount: 4, bannedUntil: null },
    { id: '4', name: 'Gary Oak', email: 'gary@utt.edu.mx', teamCount: 5, bannedUntil: null },
    { id: '5', name: 'Serena Yvonne', email: 'serena@utt.edu.mx', teamCount: 2, bannedUntil: null },
  ];

  getTrainers(): Trainer[] {
    return [...this.mockTrainers];
  }

  banTrainer(id: string, days: number = 7): void {
    const trainer = this.mockTrainers.find(t => t.id === id);
    if (trainer) {
      const banDate = new Date();
      banDate.setDate(banDate.getDate() + days);
      trainer.bannedUntil = banDate.toISOString();
    }
  }

  unbanTrainer(id: string): void {
    const trainer = this.mockTrainers.find(t => t.id === id);
    if (trainer) {
      trainer.bannedUntil = null;
    }
  }

  resetTrainer(id: string): void {
    const trainer = this.mockTrainers.find(t => t.id === id);
    if (trainer) {
      trainer.teamCount = 0;
    }
  }
}