import { Injectable } from "@angular/core";
import { DayCell, MonthCalendar } from "../../models/calendar.model";
import { IdDateWeek } from "../../models/calendar.type";

@Injectable({
    providedIn: 'root',
})
export class CalendarService {
    public generateYearCalendar(year: number, startOfWeek = 1): MonthCalendar[] {
        const monthNames = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];

        const months: MonthCalendar[] = [];
        for (let m = 0; m < 12; m++) {
            months.push(this.generateMonthCalendar(year, m, startOfWeek, monthNames[m]));
        }
        return months;
    }

    public toIso(date: Date): string {
        const y = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${y}-${mm}-${dd}`;
    }

    public makeIdDateWeek(year: number, month: number, week: number): IdDateWeek {
        return `${year}-${month}-${week}`;
    }

    // Helper: returns a new Date advanced by n days
    private addDays(d: Date, n: number): Date {
        return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
    }

    /**
     * Generate a month calendar with the rule:
     * - The first week starts at the 1st of the month (never include previous-month days).
     * - Full intermediate weeks have 7 days.
     * - The last week is extended with next-month days until it completes the week.
     *
     * Weeks returned here may have variable length only for the first week.
     */
    public generateMonthCalendar(year: number, monthIndex: number, startOfWeek: number, monthName?: string): MonthCalendar {
        const firstOfMonth = new Date(year, monthIndex, 1);
        const lastOfMonth = new Date(year, monthIndex + 1, 0); // last day of this month
        const endOfWeek = (startOfWeek + 6) % 7; // day index that ends a week

        const weeks: DayCell[][] = [];

        // Start building weeks from the 1st (never before)
        let start = new Date(firstOfMonth.getFullYear(), firstOfMonth.getMonth(), firstOfMonth.getDate());

        // Outer loop: create weeks while the starting day is <= last day of month
        while (start <= lastOfMonth) {
            const week: DayCell[] = [];
            // Build the week starting at `d`
            let d = new Date(start.getFullYear(), start.getMonth(), start.getDate());
            while (true) {
                const inMonth = (d.getFullYear() === year && d.getMonth() === monthIndex);
                week.push({
                    date: new Date(d.getFullYear(), d.getMonth(), d.getDate()),
                    year: d.getFullYear(),
                    month: d.getMonth(),
                    day: d.getDate(),
                    inMonth,
                    iso: this.toIso(d),
                });

                // If this day is the end-of-week, finish this week.
                if (d.getDay() === endOfWeek) {
                    d = this.addDays(d, 1); // next week start
                    break;
                }

                // Otherwise advance one day (this may enter next month for the final week — that's intended)
                d = this.addDays(d, 1);
                // Safety: if we've pushed far beyond lastOfMonth and wrapped many days, keep pushing until endOfWeek
                // The loop continues until endOfWeek is reached.
            }

            weeks.push(week);

            // Next week's start is `d`. If d > lastOfMonth then we have already completed the final week (possibly padded with next-month days),
            // and the while-loop will stop because start (which we set below) would be > lastOfMonth.
            start = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        }

        return {
            year,
            month: monthIndex,
            monthName: monthName ?? `${monthIndex + 1}`,
            weeks,
            selected: false,
        };
    }
}