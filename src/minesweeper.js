const printBoard = board => {
    console.log(board.map(row => row.join('|')).join('\n'));
};

const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
    let board = [];
    console.log(numberOfRows);
    for (let rowIndex=0; rowIndex < numberOfRows; rowIndex++){
        let row = [];
        for (let colIndex=0; colIndex < numberOfColumns; colIndex++){
            row.push(' ');
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
        if (board[randomRowIndex][randomColIndex] != 'B'){
            board[randomRowIndex][randomColIndex] = 'B';
            numberOfBombsPlaced++;
        }
    }
    return board;
}

const getNumberofNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
    const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    const numberOfRows = bombBoard.length;
    
    const numberOfColumns = bombBoard[0].length;
    let numberOfBombs = 0;
    neighborOffsets.forEach(offset => {
        const neighborRowIndex = rowIndex + offset[0];
        const neighborColIndex = columnIndex + offset[1];
        if (neighborRowIndex >=0 && neighborRowIndex <= numberOfRows && neighborColIndex >=0 && neighborColIndex <= numberOfColumns){
            if (bombBoard[neighborRowIndex][neighborColIndex] === 'B'){
                numberOfBombs++;
            }
        }
    });
    
    return numberOfBombs;
};

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
    const content = playerBoard[rowIndex][columnIndex];
    if (content != ' '){
        console.log('This tile has already been flipped');
        return
    } else if (bombBoard[rowIndex][columnIndex] === 'B'){
        playerBoard[rowIndex][columnIndex] = 'B';
    } else {
        console.log("Bombas" + getNumberofNeighborBombs(bombBoard, rowIndex, columnIndex));
        playerBoard[rowIndex][columnIndex] = getNumberofNeighborBombs(bombBoard, rowIndex, columnIndex);
    }
};

let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);
console.log('Player Board:');
printBoard(playerBoard);
console.log('Bomb Board:');
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 0, 0)
console.log('Updated Player Board:');
printBoard(playerBoard);