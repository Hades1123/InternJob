export class DateUtil {
  static formatDate(date: Date, format: string = 'dd/mm/yyyy'): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    if (format === 'dd/mm/yyyy') {
      return `${day}/${month}/${year}`;
    }

    if (format === 'mm/dd/yyyy') {
      return `${month}/${day}/${year}`;
    }

    if (format === 'yyyy-mm-dd') {
      return `${year}-${month}-${day}`;
    }

    return date.toISOString();
  }

  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static isExpired(date: Date): boolean {
    return date < new Date();
  }

  static getMillisecondsFromDays(days: number): number {
    return days * 24 * 60 * 60 * 1000;
  }

  static getMillisecondsFromHours(hours: number): number {
    return hours * 60 * 60 * 1000;
  }
}