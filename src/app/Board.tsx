import React from "react"
import { Cell } from "./Cell";

interface IProps{
    board : number[][];
    onClick: (row: number, col: number) => void;
}

let cellOdds = {
    width: "25px",
    height: "25px",
    textAlign: "center",
    border: "1px",
    borderStyle: "solid",
    backgroundColor: "white"
} as React.CSSProperties

let cellEven = {
    width: "25px",
    height: "25px",
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
                                return( <td onClick={() => props.onClick(rowNum, cellIndex)} style={cellOdds}><Cell cell={cell} /></td>)
                            }
                            else{
                                return( <td onClick={() => props.onClick(rowNum, cellIndex)} style={cellEven}><Cell cell={cell} /></td>)
                            }
                        })}
                    </tr>)
                }
                else{
                    return (<tr>
                        {row.map((cell, cellIndex) => {
                            if(cellIndex / 3 >= 1 && cellIndex / 3 < 2){
                                return( <td onClick={() => props.onClick(rowNum, cellIndex)} style={cellEven}><Cell cell={cell} /></td>)
                            }
                            else{
                                return( <td onClick={() => props.onClick(rowNum, cellIndex)} style={cellOdds}><Cell cell={cell} /></td>)
                            }
                        })}
                    </tr>)
                }
                
            })}

        </table>


    );
}