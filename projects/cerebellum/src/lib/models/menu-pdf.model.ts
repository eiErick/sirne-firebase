import { MenuWeekViewModel } from "./menu.model";

export interface MenuMonthViewModel {
  title: string;
  period: string; // ex: "28/7 à 29/8/2025"
  sections: MenuSectionViewModel[];
}

export interface MenuSectionViewModel {
  type: 'snack' | 'lunch';
  weeks: MenuWeekViewModel[];
}