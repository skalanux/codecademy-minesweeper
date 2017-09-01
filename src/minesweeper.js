const printBoard = board => {
    console.log('Current Board:');
    console.log(board.map(row => row.join('|')).join('\n'));
    
    
};
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
    let board = [];
    for (let rowIndex=0; rowIndex < numberOfRows.length; rowIndex++){
        let row = [];
        for (let colIndex=0; colIndex < numberOfColumns.length; colIndex++){
            row.push(' ');
        }
        board.push(row);
    }
    return board;
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
    let board = [];
    for (let rowIndex=0; rowIndex < numberOfRows.length; rowIndex++){
        let row = [];
        for (let colIndex=0; colIndex < numberOfColumns.length; colIndex++){
            row.push(null);
        }
        board.push(row);
    }
    let numberOfBombsPlaced = 0;

    while (numberOfBombsPlaced<numberOfBombs){
        let randomRowIndex;
        randomRowIndex = Math.floor(Math.random()*numberOfRows);
        randomColIndex = Math.floor(Math.random()*numberOfColumns);
        // Fixme: Now it can placed bombs on the same place as before
        board[randomRowIndex, randomColIndex] = 'B';
        numberOfBombsPlaced++;
    }
    return board;
}
