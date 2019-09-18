import React from "react"
import ReactDOM from "react-dom"
import { Sudoku } from "app/Sudoku";

class App extends React.Component{
    render() {
        return (<Sudoku />);
    }
}

ReactDOM.render(<App />, document.getElementById("root"));