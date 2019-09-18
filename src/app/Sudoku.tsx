import React from "react"
import { Board } from "./Board";
import { NumberSelect } from "./NumberSelect";
import { solve } from "solver/solver";


interface IState {
    board: number[][];
    buttonSelected: number;
}

export class Sudoku extends React.Component<{}, IState>{
    constructor(props: {}) {
        super(props);
        this.state = { board: [], buttonSelected: 0 };
        for (let row = 0; row < 9; row++) {
            this.state.board.push([]);
            for (let cell = 0; cell < 9; cell++) {
                this.state.board[row].push(0);
            }
        }

    }

    
    render() {
        return (
            <div>
                <button onClick={() => {
                    this.setState((prev) => ({ ...prev, board: solve(this.state.board) }))

                }}>solve</button>
                <Board board={this.state.board} onClick={(row: number, col: number) => {
                    let newBoard = [...this.state.board];
                    newBoard[row][col] = this.state.buttonSelected;

                    this.setState((prev) => ({ ...prev, board: newBoard }))
                }} />
                <NumberSelect prevSelected={this.state.buttonSelected} onClick={(num: number) => {
                    if (this.state.buttonSelected != num) {
                        this.setState((prev) => ({ ...prev, buttonSelected: num }));
                    }
                    else {
                        this.setState((prev) => ({ ...prev, buttonSelected: 0 }));
                    }
                }} />
            </div>
        )
    }
}