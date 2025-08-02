// public/index.js

document.addEventListener('DOMContentLoaded', () => {
  const cells = Array.from(document.querySelectorAll('.cell'));
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  let board = [];
  let currentPlayer;

  function startGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    cells.forEach((cell, i) => {
      cell.innerHTML = '';
      cell.removeEventListener('click', cell._listener);
      const listener = () => onCellClick(cell, i);
      cell.addEventListener('click', listener, { once: true });
      cell._listener = listener;
    });
  }

  function onCellClick(cell, idx) {
    board[idx] = currentPlayer;
    // inject SVG for X or O
    const svgNS = 'http://www.w3.org/2000/svg';
    let svg;
    if (currentPlayer === 'X') {
      svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('viewBox', '0 0 100 100');
      svg.classList.add('mark', 'x-mark');
      [ [20,20,80,80], [80,20,20,80] ].forEach(coords => {
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', coords[0]);
        line.setAttribute('y1', coords[1]);
        line.setAttribute('x2', coords[2]);
        line.setAttribute('y2', coords[3]);
        svg.appendChild(line);
      });
    } else {
      svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('viewBox', '0 0 100 100');
      svg.classList.add('mark', 'o-mark');
      const circle = document.createElementNS(svgNS, 'circle');
      circle.setAttribute('cx', 50);
      circle.setAttribute('cy', 50);
      circle.setAttribute('r', 30);
      circle.setAttribute('fill', 'none');
      svg.appendChild(circle);
    }
    cell.appendChild(svg);

    if (checkWin(currentPlayer)) {
      setTimeout(() => alert(`${currentPlayer} wins!`), 400);
      scheduleReset();
    } else if (board.every(v => v)) {
      setTimeout(() => alert(`Draw!`), 400);
      scheduleReset();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  function checkWin(player) {
    return winPatterns.some(pattern =>
      pattern.every(i => board[i] === player)
    );
  }

  function scheduleReset() {
    setTimeout(startGame, 1200);
  }

  startGame();
});
