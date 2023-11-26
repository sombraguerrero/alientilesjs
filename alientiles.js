let tiles = new Array();
var dimension;
const COLORS = 4;
var actionStack = new Array();
const START_COLOR = 0;

var tile_color = [
	'red',
	'green',
	'blue',
	'purple'
]

function createTable() {
  var colorComboBoxSelection = document.getElementById("colorComboBox").value; 
  document.getElementById("actionCnt").value = actionStack.length = 0;
  document.getElementById("table").innerHTML = "";
  dimension = document.getElementById("dimension").value;
  document.documentElement.style.setProperty("--dimension", dimension);
  document.getElementById("table").style["grid-template-columns"] =  'repeat(var(--dimension), auto)';
  var k = 0;
  for (var i = 0; i < dimension; i++) {
	  tiles[i] = new Array(dimension);
	  for (j = 0; j < dimension; j++)
	  {
		  var button = document.createElement("button");
		  button.className = "grid-item";
		  button.id = "button" + k;
		  k++;
		  var colorSelection = colorComboBoxSelection < 4 ? colorComboBoxSelection : Math.floor(Math.random() * COLORS);
		  var stageTile = new Object();
		  stageTile.tile = document.getElementById("table").appendChild(button);
		  stageTile.colorIndex = colorSelection;
		  stageTile.id = parseInt(stageTile.tile.id.substring(6));
		  stageTile.row = i;
		  stageTile.col = j;
		  tiles[i][j] = stageTile;
		  tiles[i][j].tile.style["background-color"] = tile_color[tiles[i][j].colorIndex];
	  }
    
    //button.onclick = function() {updateColors(this.id, 1)};
  }
}

function toggle(backward, tileObj)
{
	if (tileObj.colorIndex == tile_color.length - 1)
		tileObj.colorIndex = 0;
	else if (backward && tileObj.colorIndex > 0)
		tileObj.colorIndex--;
	else if (backward && tileObj.colorIndex == 0) 
		tileObj.colorIndex = tile_color.length - 1;
	else
		tileObj.colorIndex++;
	tileObj.tile.style["background-color"] = tile_color[tileObj.colorIndex];
}

function undoAction()
{
	if (actionStack.length > 0)
	{
		updateColors(actionStack.pop(), true);
	}
	document.getElementById("actionCnt").value = actionStack.length;
}

function updateColors(targetTile, undo)
{
	for (i=0; i<=targetTile.row; i++)
	 {
		 toggle(undo, tiles[i][targetTile.col]);
	}
	for (i=targetTile.row+1; i<dimension; i++)
	{
		toggle(undo, tiles[i][targetTile.col]);
	}
	for (i=0; i<targetTile.col; i++)
	{
		toggle(undo, tiles[targetTile.row][i]);
	}
	for (i=targetTile.col+1; i<dimension; i++)
	{
		toggle(undo, tiles[targetTile.row][i]);
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
	
	document.getElementById("table").addEventListener("click", function(evt) {
		var elem = evt.target;
		//alert(`Clicked ID: ${elem.id}`)
		var clickedBtn;
		if (elem.tagName == 'BUTTON')
		{
			for (i = 0; i < dimension; i++)
			{
				clickedBtn = tiles[i].findLast(x => x.tile.id == elem.id)
				if (typeof clickedBtn !== 'undefined')
					break;
			}
			actionStack.push(clickedBtn);
			document.getElementById("actionCnt").value = actionStack.length;
			updateColors(clickedBtn, false);
		}
	});
