import React from "react"

interface IProps{
    cell: number;
}

export function Cell(props: IProps){
    if(props.cell != 0){
        return(
            <React.Fragment>
                {props.cell}
            </React.Fragment>
        )
    }
    else{
        return null;
    }
}