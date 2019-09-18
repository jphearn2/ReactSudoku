import React from "react"
import { Board } from "./Board";
import { NumberSelect } from "./NumberSelect";
import { solve } from "solver/solver";
import { ICell } from "./ICell";


enum stage {
    input,
    solveForMe,
    letMeSolve
}

interface IState {
    reBoard: ICell[][];
    board: number[][];
    buttonSelected: number;
    type: stage;
}

export class Sudoku extends React.Component<{}, IState>{
    constructor(props: {}) {
        super(props);
        this.state = { reBoard: [], board: [], buttonSelected: 0, type: stage.input };
        for (let row = 0; row < 9; row++) {
            this.state.board.push([]);
            this.state.reBoard.push([]);
            for (let cell = 0; cell < 9; cell++) {
                this.state.board[row].push(0);
                this.state.reBoard[row].push({ stored: 0, mutable: true });
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
                        let newBoard = solve(this.state.reBoard.map((row) => {
                            return row.map((cell) => {
                                return cell.stored;
                            })
                        }));
                        let newICellBoard: ICell[][] = [];
                        for(let row = 0; row < 9; row++){
                            newICellBoard.push([]);
                            for(let col = 0; col < 9; col++){
                                newICellBoard[row].push( { mutable: false, stored: newBoard[row][col] } )
                            }
                        }

                        this.setState((prev) => ({ ...prev, reBoard: newICellBoard }) )
                    }}>solve for me</button>
                    <Board board={this.state.reBoard} onClick={(row: number, col: number) => {
                        let newBoard = [...this.state.reBoard];
                        newBoard[row][col] = { mutable: true, stored: this.state.buttonSelected }

                        this.setState((prev) => ({ ...prev, reBoard: newBoard }))
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
                    <Board board={this.state.reBoard} onClick={(row: number, col: number) =>{}} />
                    <br/>
                    <button onClick={() => {
                        this.setState((prev) => ({ ...prev, board: this.newBoard(), type: stage.input }));
                    }} >start new board</button>
                </div>
            )
        }

    }
}