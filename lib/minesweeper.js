'use strict';

var printBoard = function printBoard(board) {
    console.log(board.map(function (row) {
        return row.join('|');
    }).join('\n'));
};

var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
    var board = [];
    console.log(numberOfRows);
    for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        var row = [];
        for (var colIndex = 0; colIndex < numberOfColumns; colIndex++) {
            row.push(' ');
        }
        board.push(row);
    }
    return board;
};

var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    var board = [];
    for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        var row = [];
        for (var colIndex = 0; colIndex < numberOfColumns; colIndex++) {
            row.push(null);
        }
        board.push(row);
    }
    var numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColIndex = Math.floor(Math.random() * numberOfColumns);
        // Fixme: Now it can placed bombs on the same place as before
        //"Antes de las bombas" +  console.log(`Putting bomb on row: ${randomRowIndex} column: ${randomColIndex}`)
        if (board[randomRowIndex][randomColIndex] != 'B') {
            board[randomRowIndex][randomColIndex] = 'B';
            numberOfBombsPlaced++;
        }
    }
    return board;
};

var getNumberofNeighborBombs = function getNumberofNeighborBombs(bombBoard, rowIndex, columnIndex) {
    var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    var numberOfRows = bombBoard.length;

    var numberOfColumns = bombBoard[0].length;
    var numberOfBombs = 0;
    neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColIndex = columnIndex + offset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColIndex >= 0 && neighborColIndex <= numberOfColumns) {
            if (bombBoard[neighborRowIndex][neighborColIndex] === 'B') {
                numberOfBombs++;
            }
        }
    });

    return numberOfBombs;
};

var flipTile = function flipTile(playerBoard, bombBoard, rowIndex, columnIndex) {
    var content = playerBoard[rowIndex][columnIndex];
    if (content != ' ') {
        console.log('This tile has already been flipped');
        return;
    } else if (bombBoard[rowIndex][columnIndex] === 'B') {
        playerBoard[rowIndex][columnIndex] = 'B';
    } else {
        console.log("Bombas" + getNumberofNeighborBombs(bombBoard, rowIndex, columnIndex));
        playerBoard[rowIndex][columnIndex] = getNumberofNeighborBombs(bombBoard, rowIndex, columnIndex);
    }
};

var playerBoard = generatePlayerBoard(3, 4);
var bombBoard = generateBombBoard(3, 4, 5);
console.log('Player Board:');
printBoard(playerBoard);
console.log('Bomb Board:');
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board:');
printBoard(playerBoard);