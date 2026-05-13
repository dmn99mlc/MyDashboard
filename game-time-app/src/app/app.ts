import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type GameTimeEntry = {
date: string;
allocatedTime: string;
playTime: string;
};

@Component({
selector: 'app-root',
imports: [CommonModule, FormsModule],
templateUrl: './app.html',
styleUrl: './app.css',
})
export class App {

data: GameTimeEntry[] = [];

newEntry: GameTimeEntry = {
date: this.getTodayDate(),
  allocatedTime: '',
  playTime: ''
};

timerSeconds = 0;
timerInterval: any = null;
isTimerRunning = false;

addEntry() {

  if (
    !this.newEntry.date ||
    !this.newEntry.allocatedTime ||
    !this.newEntry.playTime
  ) {
    return;
  }

  this.data.push({ ...this.newEntry });

  this.newEntry = {
    date: this.getTodayDate(),
    allocatedTime: '',
    playTime: ''
  };
}

removeEntry(index: number) {
  this.data.splice(index, 1);
}

startTimer() {

  if (this.isTimerRunning) {
    return;
  }

  this.isTimerRunning = true;

  this.timerInterval = setInterval(() => {

    this.timerSeconds++;

    this.newEntry.playTime = this.secondsToTime(this.timerSeconds);

  }, 1000);
}

stopTimer() {

  clearInterval(this.timerInterval);

  this.isTimerRunning = false;
}

resetTimer() {

  this.stopTimer();

  this.timerSeconds = 0;

  this.newEntry.playTime = '00:00';
}

secondsToTime(totalSeconds: number): string {

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

getTodayDate(): string {

  const today = new Date();

  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  return `${day}-${month}-${year}`;
}

timeToMinutes(time: string): number {

  const [hours, minutes] = time.split(':').map(Number);

  return (hours * 60) + minutes;
}

minutesToTime(totalMinutes: number): string {

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

getTotalAllocatedTime(): string {

  const total = this.data.reduce((sum, entry) => {
    return sum + this.timeToMinutes(entry.allocatedTime);
  }, 0);

  return this.minutesToTime(total);
}

getTotalPlayTime(): string {

  const total = this.data.reduce((sum, entry) => {
    return sum + this.timeToMinutes(entry.playTime);
  }, 0);

  return this.minutesToTime(total);
}
}
