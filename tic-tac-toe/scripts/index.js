const cells = document.querySelectorAll('.cell');
const lock = document.querySelector('.lock');
const handX = document.querySelector('.handX');

let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
const leaderboardBtn = document.getElementById('leaderboardBtn');
const resetGameBtn = document.getElementById('resetGameBtn');
const popup = document.querySelector('.popup');

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
    // var topPos = (this.getBoundingClientRect().top - 80);
    // var leftPos = this.getBoundingClientRect().left + 10;
    // animateHand(handX, topPos, leftPos);
    this.classList.add('cell_x')
    this.removeEventListener('click', placeFigure);
    toggleLockBoard();
    
        const winner = checkWin();
    setTimeout(()=>{
        if(winner==undefined){
                computerMove();
                console.log('os: ' + oMoves);
        }else{
                // alert(winner + ' wins!');
                console.log('Inside placeFigure the winner is ' + winner);
                const date = getFormattedDate();
                localStorage.setItem('leaderboard', JSON.stringify([...leaderboard, {winner, date}]));
                leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
                //resetBoard();
        }
    }, 500)
    
}

function generateIndex(){
    const index = Math.floor(Math.random() * 9) + 1;
    // console.log(index);
    return index;
}

function resetBoard(){
    xMoves.length = 0;
    oMoves.length = 0;
    handX.style.top = 'unset';
    handX.style.left = 'unset';
    cells.forEach(cell => {
        cell.classList.remove('cell_o');
        cell.classList.remove('cell_x');
        lock.classList.add('lock__hidden');
        cell.addEventListener('click', placeFigure);
    });
}

function animateHand(hand, t, l){
    hand.style.top = `${Math.floor(t)}px`;
    hand.style.left = `${Math.floor(l)}px`;
    // for (let i=)
}

function computerMove(){
    if((xMoves.length + oMoves.length) === 9) {
        alert('game over');
        resetBoard();
        return;
    } 
    let index = generateIndex();
    if(xMoves.indexOf(index)!== -1 || oMoves.indexOf(index)!== -1) {
        computerMove()
    } else {
        const element = document.querySelector(`[data-index='${index}']`);
        
        element.classList.add('cell_o');        
        element.removeEventListener('click', placeFigure);
        oMoves.push(index);
        toggleLockBoard();
        
        const winner = checkWin();
        setTimeout(()=>{
            console.log('Inside computerMove the winner is ' + winner);
            if(winner!=undefined){
                //alert(winner + ' wins!');
                const date = getFormattedDate();
                localStorage.setItem('leaderboard', JSON.stringify([...leaderboard, {winner, date}]));
                leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
                setTimeout(()=>{
                    resetBoard();  
                }, 500)
            }
        }, 500)
        
        
    }
}

function toggleLockBoard(){
    lock.classList.toggle('lock__hidden');
}

function checkWin() {
    const res = opts.map((option) => {
      const xWins = option.every((item) => xMoves.indexOf(item)!== -1);
      const oWins = option.every((item) => oMoves.indexOf(item)!== -1);
      if (xWins) return 'X';
      if (oWins) return '0';
      return undefined;
    });
    //console.log(res);
    if (res.some((i) => i === 'X')) return 'X';
    if (res.some((i) => i === '0')) return '0';
    return undefined;
  }

  leaderboardBtn.addEventListener('click', showLeaderboard);
  const popupList = document.querySelector('.popup__list');
  const popupCloseBtn = document.querySelector('.popup__button');
  popupCloseBtn.addEventListener('click', ()=>{
    popup.classList.remove('popup_open');
  })
  function showLeaderboard(){
    popup.classList.add('popup_open');
    leaderboard.forEach(item=>{
        popupList.innerHTML += `<li class="popup__list_item">${item.winner} at ${item.date}</li>`;
    })

  }

  function getFormattedDate(){
    const date = new Date;
    const days = String(date.getDate()).padStart(2, 0);
    const month = String(date.getMonth()).padStart(2, 0);
    const hrs = String(date.getHours()).padStart(2, 0);
    const mins = String(date.getMinutes()).padStart(2, 0);
    const secs = String(date.getSeconds()).padStart(2, 0);
    return `${days}/${month}/${date.getFullYear()} ${hrs}:${mins}:${secs}`
  }

  resetGameBtn.addEventListener('click', resetBoard)