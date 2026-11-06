
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysRemaining',
  standalone: true
})
export class DaysRemainingPipe implements PipeTransform {
  /**
   * Transforms a target ISO date string (YYYY-MM-DD) into a countdown or overdue badge.
   * Example: "2026-11-08" -> "3 days left"
   */
  transform(targetDateString: string | null | undefined): string {
    if (!targetDateString) {
      return 'No date set';
    }

    const today: Date = new Date();
    // Normalize today to midnight for fair calendar-day arithmetic
    today.setHours(0, 0, 0, 0);

    const [year, month, day] = targetDateString.split('-').map(Number);
    const targetDate: Date = new Date(year, month - 1, day);
    targetDate.setHours(0, 0, 0, 0);

    const differenceInMilliseconds: number = targetDate.getTime() - today.getTime();
    const differenceInDays: number = Math.round(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    if (differenceInDays < 0) {
      const overdueDays: number = Math.abs(differenceInDays);
      return overdueDays === 1 ? '1 day overdue' : `${overdueDays} days overdue`;
    }

    if (differenceInDays === 0) {
      return 'Due today';
    }

    if (differenceInDays === 1) {
      return '1 day remaining';
    }

    return `${differenceInDays} days remaining`;
  }
}