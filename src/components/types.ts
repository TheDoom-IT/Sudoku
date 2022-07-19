export interface Coordinates {
    x: number;
    y: number
}

export enum KeyboardState {
    HIDDEN,
    HIDE,
    SHOW,
    SHIFT
}

export interface ActiveCellState {
    cords?: Coordinates
    keyboardPosition: Coordinates
    keyboardState: KeyboardState
}

export type BoardState = (number | undefined)[][];