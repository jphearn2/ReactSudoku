import React from "react"
import { Cell } from "./Cell";
import { ICell } from "./ICell";

interface IProps{
    board : ICell[][];
    onClick: (row: number, col: number) => void;
}

let cellOdds = {
    width: "50px",
    height: "50px",
    textAlign: "center",
    border: "1px",
    borderStyle: "solid",
    backgroundColor: "white"
} as React.CSSProperties

let cellEven = {
    width: "50px",
    height: "50px",
    textAlign: "center",
    border: "1px",
    borderStyle: "solid",
    backgroundColor: "LightGray"
} as React.CSSProperties

export function Board(props: IProps){
    return (
        <table>
            {props.board.map((row, rowNum) => {
                if(rowNum / 3 >= 1 && rowNum / 3 < 2){
                    return (<tr>
                        {row.map((cell, cellIndex) => {
                            if(cellIndex / 3 >= 1 && cellIndex / 3 < 2){
                                return <Cell cell={cell} onClick={props.onClick} styles={cellOdds} row={rowNum} col={cellIndex} />
                            }
                            else{
                                return( <Cell cell={cell} onClick={props.onClick} styles={cellEven} row={rowNum} col={cellIndex} />)
                            }
                        })}
                    </tr>)
                }
                else{
                    return (<tr>
                        {row.map((cell, cellIndex) => {
                            if(cellIndex / 3 >= 1 && cellIndex / 3 < 2){
                                return( <Cell cell={cell} onClick={props.onClick} styles={cellEven} row={rowNum} col={cellIndex} />)
                            }
                            else{
                                return( <Cell cell={cell} onClick={props.onClick} styles={cellOdds} row={rowNum} col={cellIndex} />)
                            }
                        })}
                    </tr>)
                }
                
            })}

        </table>


    );
}