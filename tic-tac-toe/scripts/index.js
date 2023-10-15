const cells = document.querySelectorAll('.cell');
const lock = document.querySelector('.lock');

let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
const leaderboardBtn = document.getElementById('leaderboardBtn');
const resetGameBtn = document.getElementById('resetGameBtn');
const showStartScreenBtn = document.getElementById('showStartScreenBtn');
const popup = document.querySelector('.popup_stats');
const popupDesc = document.querySelector('.popup_desc');
const popupResult = document.querySelector('.popup_gameover');
const popupList = document.querySelector('.popup__list');
const popupCloseBtns = document.querySelectorAll('.popup__button');
const popupStart = document.querySelector('.popup__ok');
const gameResultText = document.querySelector('.popup__winner');
const btn = popupResult.querySelector('.popup__button');
const okBtns = document.querySelectorAll('.popup__submit');
const popupDescCloseBtn = popupDesc.querySelector('.popup__button');

btn.addEventListener('click', resetBoard);

showStartScreenBtn.addEventListener('click', ()=>{
    showPopup(popupDesc);
})

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

function showStartUp(){
    const firstTime = localStorage.getItem('startPopupSeen') || false;
    firstTime? popupDesc.classList.remove('popup_open') : showPopup(popupDesc);
}

showStartUp();

function placeFigure(){
    const index = parseInt(this.getAttribute('data-index'));
    xMoves.push(index);
    this.classList.add('cell_x')
    this.removeEventListener('click', placeFigure);
    toggleLockBoard();
    const winner = checkWin();
    setTimeout(()=>{
        if(winner==undefined){
                computerMove();
        }else{
                const date = getFormattedDate();
                localStorage.setItem('leaderboard', JSON.stringify([{winner, date}, ...leaderboard]));
                leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
                showPopup(popupResult);
                gameResultText.textContent = 'Вы победили в неравной битве! Фирма проживёт ещё немного!'
        }
    }, 500)

}

function generateIndex(){
    const index = Math.floor(Math.random() * 9) + 1;
    return index;
}

function resetBoard(){
    xMoves.length = 0;
    oMoves.length = 0;
    cells.forEach(cell => {
        cell.classList.remove('cell_o');
        cell.classList.remove('cell_x');
        lock.classList.add('lock__hidden');
        cell.addEventListener('click', placeFigure);
    });
    cropLeaderboard();
}

function computerMove(){
    if((xMoves.length + oMoves.length) === 9) {
        winner = 'Коньяк';
        const date = getFormattedDate();
        localStorage.setItem('leaderboard', JSON.stringify([{winner, date}, ...leaderboard]));
        leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
        cropLeaderboard();
        showPopup(popupResult);
        gameResultText.textContent = 'Вы не смогли договориться с Сергеем Петровичем. Победила дружба и коньяк.'
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
            if(winner!=undefined){
                const date = getFormattedDate();
                localStorage.setItem('leaderboard', JSON.stringify([{winner, date}, ...leaderboard]));
                leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
                cropLeaderboard();
                showPopup(popupResult)
                gameResultText.textContent = 'Сергей Петрович Скоробогатько обыграл Вас. Фирма близится к краху!'
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
    if (res.some((i) => i === 'X')) return 'X';
    if (res.some((i) => i === '0')) return '0';
    return undefined;
  }

  leaderboardBtn.addEventListener('click', showLeaderboard);

function closeAllPopups(){
    popup.classList.remove('popup_open');
        popupDesc.classList.remove('popup_open');
        popupResult.classList.remove('popup_open');
        setTimeout(()=>{
            popup.classList.add('popup_hidden');
            popupDesc.classList.add('popup_hidden');
            popupResult.classList.add('popup_hidden');
        }, 500)
}

popupCloseBtns.forEach((b) =>{
    b.addEventListener('click', closeAllPopups)
})

popupStart.addEventListener('click', ()=>{
    closeAllPopups();
    localStorage.setItem('startPopupSeen', true);
})

popupDescCloseBtn.addEventListener('click', ()=>{
    localStorage.setItem('startPopupSeen', true);
})

okBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        closeAllPopups();
        resetBoard();
    })
})

function cropLeaderboard(){
    if(leaderboard.length>10) {
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard.slice(0,10)));
        leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    }
}

function showPopup(popup){
    popup.classList.remove('popup_hidden');
    setTimeout(()=>{
        popup.classList.add('popup_open');
    }, 50)
}

function showLeaderboard(){
    showPopup(popup)
    popupList.innerHTML = '';
    cropLeaderboard();
    if(leaderboard.length!==0){
        popupList.innerHTML = `<thead>
        <tr>
            <th>№</th>
            <th>Победитель</th>
            <th>Дата и время</th>
        </tr>
        </thead>`
        leaderboard.sort((a,b)=>{
            const c = a.date.split(' ');
            const d = b.date.split(' ');
            d[0].localeCompare(c[0]);
        }).forEach((item, index)=>{
            popupList.innerHTML += `<tr class="popup__list_item">
            <td>${index + 1}</td>
            <td>${(item.winner==='X')? 'Вы' : ((item.winner==='0')? 'Скоробогатько С.П.' : "Коньяк")}</td>
            <td>${item.date}</td>
            </tr>`;
        })
    }else{
        popupList.innerHTML = "Данные отсутствуют";
    }
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

resetGameBtn.addEventListener('click', resetBoard);

console.log(`Self-check:
1) Markup +10
2) Logic +10
3) Game finish +10
4) Game result +10
5) Leaderboard / Stats +10
6) Animations (popups, hovers, moves)

Overall: 60/60
`)