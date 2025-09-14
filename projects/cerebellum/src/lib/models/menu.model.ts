export interface Menu {
    day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri';
    id: string;
    snacks: MealViewModel[];
    lunches: MealViewModel[];
}

export interface MenuRequest {
    day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri';
    snacks: MealRequestMenu[];
    lunches: MealRequestMenu[];
}

export interface MenuResponse {
    day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri';
    id: string;
    snacks: MealResponse[];
    lunches: MealResponse[];
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
    public id: number = 0;
    public type: 'snack' | 'lunch' = 'snack';

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
    id: number;
    type: 'snack' | 'lunch';
}

export interface MealResponse {
    name: string;
    calories: number;
    lactose: boolean;
    glucose: boolean;
    gluten: boolean;
    likes: number;
    id: number;
    // objectId: string;
    type: 'snack' | 'lunch';
}