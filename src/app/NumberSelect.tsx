import React from "react"

interface IProps{
    prevSelected: number;
    onClick: (num: number) => void;
}

let activeStyle = {
    backgroundColor: "lightGray",
    color: "white"

} as React.CSSProperties

export function NumberSelect(props: IProps){
    return  (
        <div>
            <br/>
            {[1,2,3,4,5,6,7,8,9].map((num) => {
                if(num === props.prevSelected){
                    return(
                        <button style={activeStyle} onClick={() => props.onClick(num)} > {num} </button>
                    )
                }
                return(
                    <button onClick={() => props.onClick(num)} > {num} </button>
                )
            })}
        </div>
    )
}