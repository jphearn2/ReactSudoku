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
    answer: ICell[][];
    buttonSelected: number;
    type: stage;
}

export class Sudoku extends React.Component<{}, IState>{
    constructor(props: {}) {
        super(props);
        this.state = { reBoard: [], board: [], buttonSelected: 0, type: stage.input, answer: [] };
        for (let row = 0; row < 9; row++) {
            this.state.board.push([]);
            this.state.reBoard.push([]);
            for (let cell = 0; cell < 9; cell++) {
                this.state.board[row].push(0);
                this.state.reBoard[row].push({ stored: 0, mutable: true, notes: "" });
            }
        }

    }

    newBoard(): ICell[][] {
        let board: ICell[][] = [];

        for (let row = 0; row < 9; row++) {
            board.push([]);
            for (let cell = 0; cell < 9; cell++) {
                board[row].push({ mutable: true, stored: 0, notes: "" });
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
                        for (let row = 0; row < 9; row++) {
                            newICellBoard.push([]);
                            for (let col = 0; col < 9; col++) {
                                newICellBoard[row].push({ mutable: false, stored: newBoard[row][col], notes: "" })
                            }
                        }

                        this.setState((prev) => ({ ...prev, reBoard: newICellBoard, type: stage.solveForMe }))
                    }}>solve for me</button>

                    <button onClick={() => {
                        let newBoard = solve(this.state.reBoard.map((row) => {
                            return row.map((cell) => {
                                return cell.stored;
                            })
                        }));

                        let displayedCells = this.state.reBoard.map((row) => {
                            return row.map((cell) => {
                                if(cell.stored != 0){
                                    return { mutable: false, stored: cell.stored, notes: "" }
                                }
                                else{
                                    return cell;
                                }
                            })
                        })


                        let newICellBoard: ICell[][] = [];
                        for (let row = 0; row < 9; row++) {
                            newICellBoard.push([]);
                            for (let col = 0; col < 9; col++) {
                                
                                newICellBoard[row].push({ mutable: false, stored: newBoard[row][col], notes: "" })
                            }
                        }

                        this.setState((prev) => ({ ...prev, reBoard: displayedCells, answer: newICellBoard, type: stage.letMeSolve }))
                    }}>let me solve</button>
                    <Board board={this.state.reBoard} onClick={(row: number, col: number) => {
                        let newBoard = [...this.state.reBoard];
                        newBoard[row][col] = { mutable: true, stored: this.state.buttonSelected, notes: "" }

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

        else if (this.state.type === stage.solveForMe) {
            return (
                <div>
                    <br />
                    <Board board={this.state.reBoard} onClick={(row: number, col: number) => { }} />
                    <br />
                    <button onClick={() => {
                        this.setState((prev) => ({ ...prev, reBoard: this.newBoard(), type: stage.input }));
                    }} >start new board</button>
                </div>
            )
        }

        else if (this.state.type === stage.letMeSolve) {
            return (
                <div>
                    <button onClick={() => {
                        
                    }} >How am I doing?</button>
                    <button onClick={() => {
                        this.setState((prev) => ({ ...prev, reBoard: this.newBoard(), type: stage.input }));
                    }} >start new board</button>
                    <Board board={this.state.reBoard} onClick={(row: number, col: number) => {
                        let newBoard = [...this.state.reBoard];
                        if (newBoard[row][col].mutable) {
                            if(this.state.buttonSelected === 0){
                                newBoard[row][col] = { mutable: true, stored: this.state.buttonSelected, notes: newBoard[row][col].notes.slice(0, newBoard[row][col].notes.length-1 ) }
                            }
                            else
                                newBoard[row][col] = { mutable: true, stored: this.state.buttonSelected, notes: newBoard[row][col].notes + this.state.buttonSelected }
                        }
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

        else {
            return ( 
                <div>
                    where do we go from here?! how do we disappear?
                </div>
            )
        }

    }
}