import { DayCell } from "./calendar.model";
import { IdDateWeek, Day } from "./calendar.type";

export interface Menu {
    day: Day;
    id: string;
    idDate: IdDateWeek;
    today: boolean;
    snacks: MealViewModel[];
    lunches: MealViewModel[];
}

export interface MenuRequest {
    day: Day;
    snacks: MealRequestMenu[];
    lunches: MealRequestMenu[];
}

export interface MenuWeekResponse {
    id: string;
    idDate: IdDateWeek;
    days: SimpleDayCell[];
}

export interface MenuDatabase {
    name: string;
    calories: number;
    lactose: boolean;
    gluten: boolean;
    glucose: boolean;
    id: number;
    objectId: string;
    likes: number;
    type: 'snack' | 'lunch';
}

export class MealViewModel {
    public name: string = "";
    public calories: number = 0;
    public lactose: boolean = true;
    public glucose: boolean = true;
    public gluten: boolean = true;
    public likes: number = 0;
    public id: string = '';
    public type: 'snack' | 'lunch' = 'snack';
    public today: boolean = false;

    public validar(): boolean {
        return (
            this.name.length > 0 &&
            this.calories >= 0 &&
            this.likes >= 0
        );
    }
}

export interface MealRequest {
    name: string;
    calories: number;
    lactose: boolean;
    glucose: boolean;
    gluten: boolean;
    type: 'snack' | 'lunch';
}

export interface MealRequestMenu {
    name: string;
    calories: number;
    lactose: boolean;
    glucose: boolean;
    gluten: boolean;
    likes: number;
    id: string;
    type: 'snack' | 'lunch';
}

export interface MealResponse {
    name: string;
    calories: number;
    lactose: boolean;
    glucose: boolean;
    gluten: boolean;
    likes: number;
    id: string;
    // objectId: string;
    type: 'snack' | 'lunch';
}

export interface SimpleMeal {
    id: string;
}

export interface SimpleMenuRequest {
    lunches: SimpleMeal[];
    snacks: SimpleMeal[];
    day: Day;
}

export interface SimpleDayCell {
    lunches: SimpleMeal[];
    snacks: SimpleMeal[];
    day: Day;
}

export interface MenuDayViewModel {
    lunches: MealViewModel[];
    snacks: MealViewModel[];
    day: Day;
}

export interface MenuWeekRequest {
    idDate: IdDateWeek;
    days: SimpleDayCell[];
}

// export interface MenuWeek {
//     id: IdDateWeek;
//     days: SimpleDayCell[];
// }

export interface MenuWeekViewModel {
    id: string;
    idDate: IdDateWeek;
    days: MenuDayViewModel[];
}