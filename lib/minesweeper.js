'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game(numberOfRows, numberOfColumns, numberOfBombs) {
        _classCallCheck(this, Game);

        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }

    _createClass(Game, [{
        key: 'playMove',
        value: function playMove(rowIndex, columnIndex) {
            this._board.flipTile(rowIndex, columnIndex);
            if (this._board.playerBoard[rowIndex][columnIndex] == 'B') {
                console.log('Game over!');
                this._board.print();
            } else if (!this._board.hasSafeTiles) {
                console.log("Congratulations You've won");
            } else {
                console.log("Current Board:");
                this._board.print();
            }
        }
    }]);

    return Game;
}();

var Board = function () {
    function Board(numberOfRows, numberOfColumns, numberOfBombs) {
        _classCallCheck(this, Board);

        this._numberOfBombs = numberOfBombs;
        /*this._numberOfRows = numberOfRows;
        this._numberOfColumns = numberOfColumns;*/
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }

    _createClass(Board, [{
        key: 'flipTile',
        value: function flipTile(rowIndex, columnIndex) {
            var content = this._playerBoard[rowIndex][columnIndex];
            if (content != ' ') {
                console.log('This tile has already been flipped');
                return;
            } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
                this._playerBoard[rowIndex][columnIndex] = 'B';
            } else {
                console.log("Bombas" + this.getNumberofNeighborBombs(rowIndex, columnIndex));
                this._playerBoard[rowIndex][columnIndex] = this.getNumberofNeighborBombs(rowIndex, columnIndex);
            }
            this._numberOfTiles -= 1;
        }
    }, {
        key: 'getNumberofNeighborBombs',
        value: function getNumberofNeighborBombs(rowIndex, columnIndex) {
            var _this = this;

            var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
            var numberOfRows = this._bombBoard.length;

            var numberOfColumns = this._bombBoard[0].length;
            var numberOfBombs = 0;
            neighborOffsets.forEach(function (offset) {
                var neighborRowIndex = rowIndex + offset[0];
                var neighborColIndex = columnIndex + offset[1];
                if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColIndex >= 0 && neighborColIndex <= numberOfColumns) {
                    if (_this._bombBoard[neighborRowIndex][neighborColIndex] === 'B') {
                        numberOfBombs++;
                    }
                }
            });

            return numberOfBombs;
        }
    }, {
        key: 'hasSafeTiles',
        value: function hasSafeTiles() {
            return this._numberOfTiles != this._numberOfBombs;
        }
    }, {
        key: 'print',
        value: function print() {
            console.log(this._playerBoard.map(function (row) {
                return row.join('|');
            }).join('\n'));
        }
    }, {
        key: 'playerBoard',
        get: function get() {
            return this._playerBoard;
        }
    }], [{
        key: 'generatePlayerBoard',
        value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
            var board = [];
            for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
                var row = [];
                for (var colIndex = 0; colIndex < numberOfColumns; colIndex++) {
                    row.push(' ');
                }
                board.push(row);
            }
            return board;
        }
    }, {
        key: 'generateBombBoard',
        value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
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
        }
    }]);

    return Board;
}();

var g = new Game(3, 3, 3);

g.playMove(0, 0);