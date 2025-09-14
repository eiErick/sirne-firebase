import { Menu } from "./menu.model";

export interface Assessment {
    menu: Menu;
    type: 'snack' | 'lunch';
    like: boolean;
}