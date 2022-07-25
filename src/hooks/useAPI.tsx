import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DIFFICULTY } from "../components/difficulty-picker/difficulty-picker";
import { BoardState } from "../components/types";
import { ROUTES } from "../routes/constants";

interface BoardData {
    board: number[][]
}

interface SolveData {
    difficulty: string;
    solution: number[][];
    status: string;
}

interface APIState {
    board: BoardState;
    solution: BoardState;
}

const URL = "https://sugoku.herokuapp.com";
const BOARD_URL = (diff: string) => `${URL}/board?difficulty=${diff}`;
const SOLVE_URL = `${URL}/solve`;

export function useAPI(diff: string | undefined): { board?: BoardState, solution?: BoardState, isLoading: boolean } {
    const navigate = useNavigate();


    const [data, setData] = useState<APIState | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!diff || !Object.values(DIFFICULTY).some(el => el === diff)) {
            navigate(ROUTES.HOME);
            return;
        }

        const fetchData = async () => {
            try {
                const boardResponse = await axios.get(BOARD_URL(diff));

                if (boardResponse.status !== 200) {
                    setIsLoading(false);
                    return;
                }

                const boardData: BoardData = boardResponse.data;

                const solveResponse = await axios.post(SOLVE_URL, encodeBoard(boardData.board), {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                });

                if (solveResponse.status !== 200) {
                    setIsLoading(false);
                    return;
                }

                const solveData: SolveData = solveResponse.data;

                if (solveData.status !== "solved") {
                    setIsLoading(false);
                    return;
                }

                const board = toBoardState(boardData.board);
                const solution = toBoardState(solveData.solution);
                setData({ board, solution });
            } catch (error) { }
            setIsLoading(false);
        }

        fetchData();
    }, [diff])

    return { ...data, isLoading };
}

function toBoardState(board: number[][]): BoardState {
    return board.map(row => row.map(el => el === 0 ? undefined : el));
}

// The API does not support content-type of application/json.
// The data must be in the application/x-www-form-urlencoded format.
function encodeBoard(board: number[][]): string {
    const leftBracketCode = "%5B";
    const rightBracketCode = "%5D";
    const commaCode = "%2C";

    const boardString = board.map(row => {
        return leftBracketCode + row.join(commaCode) + rightBracketCode;
    }).join(commaCode);

    return "board=" + leftBracketCode + boardString + rightBracketCode;
}
