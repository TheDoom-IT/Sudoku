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

export interface SudokuBoardState {
    cords?: Coordinates
    keyboardPosition: Coordinates
    keyboardState: KeyboardState
}