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

        let start = new Date(firstOfMonth);

        // Descobre até qual dia o mês ANTERIOR já "emprestou"
        // para não repetir esses dias no mês atual
        const prevMonthLastDay = this.getLastBorrowedDayFromPrevMonth(
            year, monthIndex, startOfWeek, endOfWeek, hiddenWeekdays
        );

        // Pula os dias que já foram emprestados pelo mês anterior
        if (prevMonthLastDay && start <= prevMonthLastDay) {
            start = this.addDays(prevMonthLastDay, 1);
        }

        while (start <= lastOfMonth) {
            const week: DayCell[] = [];
            let d = new Date(start);

            while (true) {
                const inMonth = (d.getFullYear() === year && d.getMonth() === monthIndex);
                const dayOfWeek = d.getDay();
                const visible = !this.isHiddenDay(dayOfWeek, hiddenWeekdays);

                if (visible) {
                    week.push({
                        date: new Date(d),
                        year: d.getFullYear(),
                        month: d.getMonth(),
                        day: d.getDate(),
                        inMonth,
                        iso: this.toIso(d),
                    });
                }

                const reachedEndOfWeek = dayOfWeek === endOfWeek;
                d = this.addDays(d, 1);

                if (reachedEndOfWeek) break;
            }

            if (week.length > 0) {
                weeks.push(week);
            }

            start = new Date(d);
        }

        return {
            year,
            month: monthIndex,
            monthName: monthName ?? `${monthIndex + 1}`,
            weeks,
            selected: false,
        };
    }

    /**
     * Retorna o último dia que o mês ANTERIOR "emprestou" para completar
     * sua última semana, ou null se não houve empréstimo.
     */
    private getLastBorrowedDayFromPrevMonth(
        year: number,
        monthIndex: number,
        startOfWeek: number,
        endOfWeek: number,
        hiddenWeekdays: number[]
    ): Date | null {
        // Mês anterior
        const prevMonthIndex = monthIndex === 0 ? 11 : monthIndex - 1;
        const prevYear = monthIndex === 0 ? year - 1 : year;

        const lastOfPrevMonth = new Date(prevYear, prevMonthIndex + 1, 0);
        const lastDayOfWeek = lastOfPrevMonth.getDay();

        // Se o último dia do mês anterior já é o fim de semana, não há empréstimo
        if (lastDayOfWeek === endOfWeek) return null;

        // Avança do último dia do mês anterior até o fim da semana
        let d = new Date(lastOfPrevMonth);
        while (d.getDay() !== endOfWeek) {
            d = this.addDays(d, 1);
            // Se ainda estamos no mês anterior, não há empréstimo
            if (d.getMonth() === prevMonthIndex && d.getFullYear() === prevYear) continue;
        }

        // Se d ainda é do mês anterior, sem empréstimo
        if (d.getFullYear() === prevYear && d.getMonth() === prevMonthIndex) return null;

        // Retorna o último dia emprestado (que pertence ao mês atual)
        return d;
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