import { DIFFICULTY } from "../components/difficulty-picker/difficulty-picker";

export const enum ROUTES {
    HOME = "/",
    PLAY = "/play/:difficulty",
    OTHER = "*"
}

export function PLAY_LINK(diff: DIFFICULTY) {
    return `/play/${diff}`;
}