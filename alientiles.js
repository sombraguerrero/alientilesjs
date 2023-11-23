var tiles;
var dimension;
const COLORS = 4;
var actionStack = new Array();
const START_COLOR = 0;

var tile_color = {
	'0': 'red',
	'1':'green',
	'2':'blue',
	'3':'purple'
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
    button.onclick = function() {updateColors(this.id, 1)};
  }
}

function undoAction() {
	updateColors(actionStack.pop(), -1);
	document.getElementById("actionCnt").value = actionStack.length;
}

  function updateColors(buttonID, dir) {
	  if (dir == 1) {
		  actionStack.push(buttonID);
		  document.getElementById("actionCnt").value = actionStack.length;
	  }
    var id = parseInt(buttonID.substring(6));
    var row = parseInt(Math.floor(id/dimension));
    var col = parseInt(id % dimension);
    for (var i = dimension*row; i < (dimension*row)+ parseInt(dimension); i++) {
      tiles[i] = (tiles[i] + dir) % COLORS;
      document.getElementById("button"+i).style["background-color"] = tile_color[tiles[i]];
    }
    for (var i = col; i < dimension*dimension; i=i+parseInt(dimension)) {
      if (i != id) {
        tiles[i] = (tiles[i] + dir) % COLORS;
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
