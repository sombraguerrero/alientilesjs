var tiles;
var dimension;
const COLORS = 4;

function createTable() {
  document.getElementById("table").innerHTML = "";
  dimension = document.getElementById("dimension").value;
  tiles = new Array(dimension*dimension).fill(0);
  document.documentElement.style.setProperty("--dimension", dimension);
  for (var i = 0; i < dimension*dimension; i++) {
    var button = document.createElement("button");
    button.className = "grid-item";
    button.id = "button" + i;
    button.innerHTML = "0";
    document.getElementById("table").appendChild(button);
    button.onclick = function() {updateColors(this.id)};
  }
}

  function updateColors(buttonID) {
    var id = parseInt(buttonID.substring(6));
    var row = parseInt(Math.floor(id/dimension));
    var col = parseInt(id % dimension);
    for (var i = dimension*row; i < (dimension*row)+ parseInt(dimension); i++) {
      tiles[i] = (tiles[i] + 1) % COLORS;
      document.getElementById("button"+i).innerHTML = tiles[i];
    }
    for (var i = col; i < dimension*dimension; i=i+parseInt(dimension)) {
      if (i != id) {
        tiles[i] = (tiles[i] + 1) % COLORS;
        document.getElementById("button"+i).innerHTML = tiles[i];
      }
    }
  }
