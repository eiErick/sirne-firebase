export interface Task {
    name: string,
    description: string,
    id: string,
    check: boolean,
    inital: Date,
    end: Date | null,
}