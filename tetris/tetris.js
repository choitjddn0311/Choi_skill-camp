document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#game');
    const width = 10;
    const height = 20;
    let currentPosition = 4;
    let currentRotation = 0;
    let timerId;

    // Create the grid cells
    for (let i = 0; i < width * height; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        grid.appendChild(cell);
    }

    // Define Tetromino shapes
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ];
    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ];
    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ];
    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ];
    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ];

    const tetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];
    let random = Math.floor(Math.random() * tetrominoes.length);
    let currentTetromino = tetrominoes[random][currentRotation];

    function draw() {
        currentTetromino.forEach(index => {
            grid.children[currentPosition + index].classList.add('tetromino');
        });
    }

    function undraw() {
        currentTetromino.forEach(index => {
            grid.children[currentPosition + index].classList.remove('tetromino');
        });
    }

    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    function moveLeft() {
        undraw();
        const isAtLeftEdge = currentTetromino.some(index => (currentPosition + index) % width === 0);
        if (!isAtLeftEdge) currentPosition -= 1;
        if (currentTetromino.some(index => grid.children[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1;
        }
        draw();
    }

    function moveRight() {
        undraw();
        const isAtRightEdge = currentTetromino.some(index => (currentPosition + index) % width === width - 1);
        if (!isAtRightEdge) currentPosition += 1;
        if (currentTetromino.some(index => grid.children[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        }
        draw();
    }

    function rotate() {
        undraw();
        currentRotation++;
        if (currentRotation === currentTetromino.length) {
            currentRotation = 0;
        }
        currentTetromino = tetrominoes[random][currentRotation];
        if (currentTetromino.some(index => grid.children[currentPosition + index].classList.contains('taken'))) {
            currentRotation--;
            if (currentRotation < 0) {
                currentRotation = currentTetromino.length - 1;
            }
            currentTetromino = tetrominoes[random][currentRotation];
        }
        draw();
    }

    function freeze() {
        if (currentTetromino.some(index => grid.children[currentPosition + index + width].classList.contains('taken') || currentPosition + index + width >= width * height)) {
            currentTetromino.forEach(index => grid.children[currentPosition + index].classList.add('taken'));
            random = Math.floor(Math.random() * tetrominoes.length);
            currentRotation = 0;
            currentTetromino = tetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();
            gameOver();
        }
    }

    function gameOver() {
        if (currentTetromino.some(index => grid.children[currentPosition + index].classList.contains('taken'))) {
            clearInterval(timerId);
            alert('Game Over');
        }
    }

    timerId = setInterval(moveDown, 1000);

    document.addEventListener('keydown', control);

    function control(e) {
        if (e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 39) {
            moveRight();
        } else if (e.keyCode === 40) {
            moveDown();
        } else if (e.keyCode === 17) {  // Ctrl key
            rotate();
        }
    }
});