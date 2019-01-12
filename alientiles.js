var tiles;
var dimension;
const COLORS = 4;
const START_COLOR = 0;

var tile_color = {
    '0': '#f44336',
    '1': '#4caf50',
    '2': '#2196f3',
    '3': '#9c27b0'
    }

function createTable() {
  document.getElementById("table").innerHTML = "";
  dimension = document.getElementById("dimension").value;
  tiles = new Array(dimension*dimension).fill(START_COLOR);
  document.documentElement.style.setProperty("--dimension", dimension);
  document.getElementById("table").style["grid-template-columns"] =  'repeat(var(--dimension), auto)';
  for (var i = 0; i < dimension*dimension; i++) {
    var button = document.createElement("button");
    button.className = "grid-item";
    button.id = "button" + i;
    button.style["background-color"] = tile_color[tiles[i]];
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
      document.getElementById("button"+i).style["background-color"] = tile_color[tiles[i]];
    }
    for (var i = col; i < dimension*dimension; i=i+parseInt(dimension)) {
      if (i != id) {
        tiles[i] = (tiles[i] + 1) % COLORS;
        document.getElementById("button"+i).style["background-color"] = tile_color[tiles[i]];
      }
    }
  }

  window.onload = function(){
    var dim = document.getElementById("dimension");
    dim.addEventListener("keyup", function(event) {
      event.preventDefault();
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Trigger the button element with a click
        document.getElementById("submit").click();
      }
      });
    };
