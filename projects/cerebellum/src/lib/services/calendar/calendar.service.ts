import { Injectable } from "@angular/core";
import { DayCell, MonthCalendar } from "../../models/calendar.model";

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

    public generateMonthCalendar(year: number, monthIndex: number, startOfWeek: number, monthName?: string): MonthCalendar {
        const firstOfMonth = new Date(year, monthIndex, 1);
        const lastOfMonth = new Date(year, monthIndex + 1, 0); // day 0 of next month is last day of current

        // JS getDay(): 0=Sunday .. 6=Saturday
        const firstDow = firstOfMonth.getDay();
        const diff = (firstDow - startOfWeek + 7) % 7; // number of days to go back to reach startOfWeek
        const startDate = new Date(year, monthIndex, 1 - diff); // may be previous month's date

        const weeks: DayCell[][] = [];
        let current = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        let includedLastDay = false;

        while (!includedLastDay) {
            const week: DayCell[] = [];
            for (let i = 0; i < 7; i++) {
                const inMonth = (current.getFullYear() === year && current.getMonth() === monthIndex);
                if (inMonth && current.getDate() === lastOfMonth.getDate()) {
                    includedLastDay = true;
                }
                week.push({
                    date: new Date(current.getFullYear(), current.getMonth(), current.getDate()),
                    year: current.getFullYear(),
                    month: current.getMonth(),
                    day: current.getDate(),
                    inMonth,
                    iso: this.toIso(current),
                });
                // advance one day
                current = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 1);
            }
            weeks.push(week);
            // safety: prevent infinite loop (shouldn't happen), but break if too many weeks
            if (weeks.length > 8) break;
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

