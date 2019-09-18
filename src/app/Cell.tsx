import React from "react"
import { ICell } from "./ICell";

interface IProps {
    cell: ICell;
    onClick: (row: number, col: number) => void;
    styles: React.CSSProperties;
    row: number;
    col: number;
}

export function Cell(props: IProps) {
    if (props.cell.stored != 0) {
        if (props.cell.mutable) {
            return (
                <td style={props.styles}
                onClick={() => {props.onClick(props.row, props.col)}}>
                    {props.cell.stored}
                </td>
            )
        }
        else{
            return (
                <td style={props.styles}>
                    {props.cell.stored}
                </td>
            )
        }
    }
    else {
        return <td style={props.styles} onClick={() => {props.onClick(props.row, props.col)}}></td>;
    }
}