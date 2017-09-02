const printBoard = board => {
    console.log(board.map(row => row.join(' | ')).join('\n'));
};

const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
    let board = [];
    console.log(numberOfRows);
    for (let rowIndex=0; rowIndex < numberOfRows; rowIndex++){
        let row = [];
        for (let colIndex=0; colIndex < numberOfColumns; colIndex++){
            row.push('');
        }
        board.push(row);
    }
    return board;
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
    let board = [];
    for (let rowIndex=0; rowIndex < numberOfRows; rowIndex++){
        let row = [];
        for (let colIndex=0; colIndex < numberOfColumns; colIndex++){
            row.push(null);
        }
        board.push(row);
    }
    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced<numberOfBombs){
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        let randomColIndex = Math.floor(Math.random() * numberOfColumns);
        // Fixme: Now it can placed bombs on the same place as before
        //"Antes de las bombas" +  console.log(`Putting bomb on row: ${randomRowIndex} column: ${randomColIndex}`)
        board[randomRowIndex][randomColIndex] = 'B';
        numberOfBombsPlaced++;
    }
    return board;
}
let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);
console.log('Player Board:');
printBoard(playerBoard);
console.log('Bomb Board:');
printBoard(bombBoard);