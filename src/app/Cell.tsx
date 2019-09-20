import React from "react"
import { ICell } from "./ICell";

interface IProps {
    cell: ICell;
    onClick: (row: number, col: number) => void;
    styles: React.CSSProperties;
    row: number;
    col: number;
}

function cellDisplay(props: IProps): string{
    if(props.cell.notes != ""){
        return  props.cell.notes
    }
    if (props.cell.stored != 0) {
        return props.cell.stored + "";
    }
    else
        return ""
}

export function Cell(props: IProps) {

    if (props.cell.mutable) {
        return (
            <td style={props.styles}
                onClick={() => { props.onClick(props.row, props.col) }}>
                {cellDisplay(props)}
            </td>
        )
    }
    else {
        return (
            <td style={props.styles}>
                {cellDisplay(props)}
            </td>
        )
    }

}