import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatStudyDuration',
  standalone: true
})
export class FormatStudyDurationPipe implements PipeTransform {
  /**
   * Formats raw minutes into "Xh YYm" format with optional quick-win labeling.
   * Example: 45, true -> "45 mins (Quick Win)"
   */
  transform(estimatedMinutes: number | null | undefined, isQuickWin: boolean = false): string {
    if (!estimatedMinutes || estimatedMinutes <= 0) {
      return isQuickWin ? '0 mins (Quick Win)' : '0 mins';
    }

    const hours: number = Math.floor(estimatedMinutes / 60);
    const minutes: number = estimatedMinutes % 60;

    let formattedTime = '';
    if (hours === 0) {
      formattedTime = `${minutes} mins`;
    } else {
      const paddedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      formattedTime = `${hours}h ${paddedMinutes}m`;
    }

    return isQuickWin ? `${formattedTime} • Quick Win` : formattedTime;
  }
}