export interface DayCell {
    date: Date;
    year: number;
    month: number;
    day: number;
    inMonth: boolean;
    iso: string;
}

export interface MonthCalendar {
    year: number;
    month: number;
    monthName: string;
    weeks: DayCell[][];
    selected: boolean;
}
