
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'copyright',
  standalone: true
})
export class CopyrightPipe implements PipeTransform {
  /**
   * Transforms an entity name into a formatted copyright string with the current year.
   * Example: 'Stephanie Otteson' -> '© 2026 Stephanie Otteson. All Rights Reserved.'
   */
  transform(brandOrOwnerName: string | null | undefined, startingYear?: number): string {
    const currentYear: number = new Date().getFullYear();
    const owner: string = brandOrOwnerName && brandOrOwnerName.trim() ? brandOrOwnerName.trim() : 'Application';

    if (startingYear && startingYear < currentYear) {
      return `© ${startingYear}–${currentYear} ${owner}. All Rights Reserved.`;
    }

    return `© ${currentYear} ${owner}. All Rights Reserved.`;
  }
}