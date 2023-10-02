const cells = document.querySelectorAll('.cell')

const opts = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
  ];

cells.forEach(cell => {
    cell.addEventListener('click', placeFigure);
});

function placeFigure(){
    console.log(this)
    this.style.backgroundColor = "green";
    this.removeEventListener('click', placeFigure);
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