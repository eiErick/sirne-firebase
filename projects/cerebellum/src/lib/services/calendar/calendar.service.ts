import { Injectable } from "@angular/core";
import { DayCell, MonthCalendar } from "../../models/calendar.model";
import { IdDateWeek } from "../../models/calendar.type";

export interface CalendarOptions {
    startOfWeek?: number;
    hiddenWeekdays?: number[]; // 0 = domingo, 6 = sábado
}

@Injectable({
    providedIn: 'root',
})
export class CalendarService {
    public generateYearCalendar(year: number, options: CalendarOptions = {}): MonthCalendar[] {
        const monthNames = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];

        const months: MonthCalendar[] = [];
        for (let m = 0; m < 12; m++) {
            months.push(
                this.generateMonthCalendar(
                    year,
                    m,
                    options.startOfWeek ?? 1,
                    monthNames[m],
                    options.hiddenWeekdays ?? [0, 6]
                )
            );
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

    private addDays(d: Date, n: number): Date {
        return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
    }

    private isHiddenDay(dayOfWeek: number, hiddenWeekdays: number[]): boolean {
        return hiddenWeekdays.includes(dayOfWeek);
    }

    public generateMonthCalendar(
        year: number,
        monthIndex: number,
        startOfWeek: number,
        monthName?: string,
        hiddenWeekdays: number[] = [0, 6]
    ): MonthCalendar {
        const firstOfMonth = new Date(year, monthIndex, 1);
        const lastOfMonth = new Date(year, monthIndex + 1, 0);
        const endOfWeek = (startOfWeek + 6) % 7;

        const weeks: DayCell[][] = [];

        let start = new Date(firstOfMonth.getFullYear(), firstOfMonth.getMonth(), firstOfMonth.getDate());

        while (start <= lastOfMonth) {
            const week: DayCell[] = [];
            let d = new Date(start.getFullYear(), start.getMonth(), start.getDate());

            while (true) {
                const inMonth = (d.getFullYear() === year && d.getMonth() === monthIndex);
                const dayOfWeek = d.getDay();
                const visible = !this.isHiddenDay(dayOfWeek, hiddenWeekdays);

                if (visible) {
                    week.push({
                        date: new Date(d.getFullYear(), d.getMonth(), d.getDate()),
                        year: d.getFullYear(),
                        month: d.getMonth(),
                        day: d.getDate(),
                        inMonth,
                        iso: this.toIso(d),
                    });
                }

                if (dayOfWeek === endOfWeek) {
                    d = this.addDays(d, 1);
                    break;
                }

                d = this.addDays(d, 1);
            }

            if (week.length > 0) {
                weeks.push(week);
            }

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

    public idDateWeekToDate(id: IdDateWeek): Date {
        const [year, month, week] = id.split("-").map(Number);
        const firstDay = new Date(year, month - 1, 1);
        const dayOfWeek = firstDay.getDay();
        const offset = (dayOfWeek === 0 ? -6 : 1 - dayOfWeek);
        const firstMonday = new Date(firstDay);
        firstMonday.setDate(firstDay.getDate() + offset);

        const result = new Date(firstMonday);
        result.setDate(firstMonday.getDate() + (week - 1) * 7);

        return result;
    }
}