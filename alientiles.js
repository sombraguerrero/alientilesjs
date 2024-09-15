const COLORS = 4;
let dimension;
let tiles = [];
let actionStack = [];
const tile_color = ['red', 'green', 'blue', 'purple'];

function createTable() {
  const colorComboBoxSelection = parseInt(document.getElementById("colorComboBox").value);
  document.getElementById("actionCnt").value = actionStack.length = 0;
  document.getElementById("movesOutput").value = "";
  const table = document.getElementById("table");
  table.innerHTML = "";
  dimension = parseInt(document.getElementById("dimension").value);
  document.documentElement.style.setProperty("--dimension", dimension);
  table.style["grid-template-columns"] = 'repeat(var(--dimension), auto)';
  
  let k = 0;
  for (let i = 0; i < dimension; i++) {
    tiles[i] = [];
    for (let j = 0; j < dimension; j++) {
      const button = document.createElement("button");
      button.className = "grid-item";
      button.id = "button" + k++;
      const colorSelection = colorComboBoxSelection < 4 ? colorComboBoxSelection : Math.floor(Math.random() * COLORS);
      const stageTile = {
        tile: table.appendChild(button),
        colorIndex: colorSelection,
        row: i,
        col: j
      };
      tiles[i][j] = stageTile;
      stageTile.tile.style["background-color"] = tile_color[stageTile.colorIndex];
    }
  }
}

function toggle(backward, tileObj) {
  tileObj.colorIndex = (tileObj.colorIndex + (backward ? -1 : 1) + COLORS) % COLORS;
  tileObj.tile.style["background-color"] = tile_color[tileObj.colorIndex];
}

function undoAction() {
  if (actionStack.length > 0) {
    updateColors(actionStack.pop(), true);
  }
  document.getElementById("actionCnt").value = actionStack.length;
}

function updateColors(targetTile, undo) {
  for (let i = 0; i <= targetTile.row; i++) {
    toggle(undo, tiles[i][targetTile.col]);
  }
  for (let i = targetTile.row + 1; i < dimension; i++) {
    toggle(undo, tiles[i][targetTile.col]);
  }
  for (let i = 0; i < targetTile.col; i++) {
    toggle(undo, tiles[targetTile.row][i]);
  }
  for (let i = targetTile.col + 1; i < dimension; i++) {
    toggle(undo, tiles[targetTile.row][i]);
  }
}

function movesToJson() {
  const result = {
    initial_color: document.getElementById("colorComboBox").value < 4 ? tile_color[document.getElementById("colorComboBox").value] : "random",
    board_size: dimension,
    move_count: actionStack.length,
    moves: actionStack.map(action => ({
      row: action.row,
      column: action.col,
      color: tile_color[action.colorIndex]
    }))
  };
  document.getElementById("movesOutput").value = JSON.stringify(result, null, 3);
}

window.onload = function() {
  const dim = document.getElementById("dimension");
  dim.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      document.getElementById("submit").click();
    }
  });
};

document.getElementById("table").addEventListener("click", function(evt) {
  const elem = evt.target;
  if (elem.tagName === 'BUTTON') {
    const clickedBtn = tiles.flat().find(tile => tile.tile.id === elem.id);
    if (clickedBtn) {
      actionStack.push(clickedBtn);
      document.getElementById("actionCnt").value = actionStack.length;
      updateColors(clickedBtn, false);
    }
  }
});
