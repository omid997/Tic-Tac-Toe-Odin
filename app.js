const Player = (name, marker) => {
  return {name, marker}
}
const gameLogic = (() => {
  const currentPlayer = undefined;


})

const viewController = (() => {
  let gameboard = ['', '', '', '', '', '', '', '', ''];

  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.addEventListener('click', e => {
      gameboard[e.target.id] = 'x';
      updateCells();
    })  
  });

  const updateCells = () => {
    gameboard.forEach((con, index) => {
      if (con !== '') {
        cells[index].classList.add(con,'selected');
        cells[index].textContent = con;
      }
    });
  }

  return {}
})();

