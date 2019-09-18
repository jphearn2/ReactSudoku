import React from "react"
import { Board } from "./Board";
import { NumberSelect } from "./NumberSelect";
import { solve } from "solver/solver";


enum stage {
    input,
    solveForMe,
    letMeSolve
}

interface IState {
    board: number[][];
    buttonSelected: number;
    type: stage;
}

export class Sudoku extends React.Component<{}, IState>{
    constructor(props: {}) {
        super(props);
        this.state = { board: [], buttonSelected: 0, type: stage.input };
        for (let row = 0; row < 9; row++) {
            this.state.board.push([]);
            for (let cell = 0; cell < 9; cell++) {
                this.state.board[row].push(0);
            }
        }

    }

    newBoard(): number[][]{
        let board: number[][] = [];

        for (let row = 0; row < 9; row++) {
            board.push([]);
            for (let cell = 0; cell < 9; cell++) {
                board[row].push(0);
            }
        }
        return board;
    }

    render() {
        if (this.state.type === stage.input) {
            return (
                <div>
                    <button onClick={() => {
                        this.setState((prev) => ({ ...prev, board: solve(this.state.board), type: stage.solveForMe }))

                    }}>solve for me</button>
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

        else if(this.state.type === stage.solveForMe){
            return (
                <div>
                    <br/>
                    <Board board={this.state.board} onClick={(row: number, col: number) =>{}} />
                    <br/>
                    <button onClick={() => {
                        this.setState((prev) => ({ ...prev, board: this.newBoard(), type: stage.input }));
                    }} >start new board</button>
                </div>
            )
        }

    }
}