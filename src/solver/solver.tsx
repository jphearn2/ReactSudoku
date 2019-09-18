

export function solve(boardIn: number[][]): number[][] {
    if (isSolved(boardIn)) {
        return boardIn;
    }
    let row = 0;
    let col = 0;

    while (row < 9 && col < 9 && boardIn[row][col] != 0) {
        col++;
        if (col >= 9) {
            row++;
            col = col % 9;
        }
    }

    for (let piece = 1; piece < 10; piece++) {
        if (canPlacePiece(row, col, piece, boardIn)) {
            boardIn[row][col] = piece;
            boardIn = solve(boardIn);
            if (isSolved(boardIn)) {
                return boardIn;
            }
        }
    }

    boardIn[row][col] = 0;


    return boardIn
}

function canPlacePiece(row: number, col: number, piece: number, board: number[][]): boolean {
    if (rowContains(row, piece, board)) {
        return false;
    }
    else if(colContains(col, piece, board)){
        return false;
    }
    else if(squContains(row, col, piece, board)){
        return false;
    }

    return true;
}

function squContains(row: number, col: number, piece: number, board: number[][]): boolean{
    //  [(s / 3) * 3 + (inSquare / 3)][(s % 3) * 3 + (inSquare % 3)];

    let square = Math.floor(row / 3) * 3 + Math.floor(col / 3);
    for(let i = 0; i < 9; i++){
        if(board[Math.floor(square / 3) * 3 + Math.floor(i / 3)][(square % 3) * 3 + (i % 3)] === piece){
            return true;
        }
    }

    return false;
}

function colContains(col: number, piece: number, board: number[][]):boolean{
    for(let i = 0; i < 9; i++){
        if(board[i][col] === piece){
            return true;
        }
    }

    return false;
}

function rowContains(row: number, piece: number, board: number[][]): boolean {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === piece) {
            return true;
        }
    }

    return false;
}

function isSolved(boardIn: number[][]): boolean {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (boardIn[row][col] === 0) {
                return false;
            }
        }
    }

    for (let y = 0; y < 9; y++) {
        for (let x1 = 0; x1 < 8; x1++) {
            for (let x2 = x1 + 1; x2 < 9; x2++) {
                if (boardIn[y][x1] === boardIn[y][x2]) {
                    // cout << in.board[y][x1] << " = " << in.board[y][x2] << endl;
                    return false;
                }
            }
        }
    }

    for (let x = 0; x < 9; x++) {
        for (let y1 = 0; y1 < 8; y1++) {
            for (let y2 = y1 + 1; y2 < 9; y2++) {
                if (boardIn[y1][x] === boardIn[y2][x]) {
                    // cout << in.board[y1][x] << " = " << in.board[y2][x] << endl;
                    return false;
                }
            }
        }
    }

    return true;
}
