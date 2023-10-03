const cells = document.querySelectorAll('.cell');

const opts = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
  ];

const xMoves = [];
const oMoves = [];


cells.forEach(cell => {
    cell.addEventListener('click', placeFigure);
});

function placeFigure(){
    const index = parseInt(this.getAttribute('data-index'));
    xMoves.push(index);
    console.log('xs: ' + xMoves);
    this.classList.add('cell_x')
    this.removeEventListener('click', placeFigure);
    setTimeout(()=>{
        computerMove();
        console.log('os: ' + oMoves);
    }, 500)
}

function computerMove(){
    let index = Math.floor(Math.random() * 6) + 1;
    if(xMoves.indexOf(index)!== -1 || oMoves.indexOf(index)!== -1) {
        computerMove()
    } else {
        const element = document.querySelector(`[data-index='${index}']`);
        oMoves.push(index);
        element.classList.add('cell_o');
        element.removeEventListener('click', placeFigure);
    }
}

function checkWin(board) {
    const res = opts.map((option) => {
      const xWins = option.every((item) => board[item[0]][item[1]] === 'X');
      const oWins = option.every((item) => board[item[0]][item[1]] === '0');
      if (xWins) return 'X';
      if (oWins) return '0';
      return undefined;
    });
    if (res.some((i) => i === 'X')) return 'X';
    if (res.some((i) => i === '0')) return '0';
    return undefined;
  }