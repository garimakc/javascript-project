let numSquares = 6;
let colors = [];
let pickedColor;
let squares = document.querySelectorAll(".square");
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.getElementById("message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  //mode button event listeners
  setupModeButtons();
  setupSquares();
  reset();
}

function setupModeButtons() {
  for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function () {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
      reset();
    });
  }
}


function reset() {

  //generate all new random colors
  colors = generateRandomColors(numSquares);
  //pick random winning color
  pickedColor = pickColor();
  //display winning color's rgb value at the top
  colorDisplay.textContent = pickedColor;
  messageDisplay.textContent = "";
  resetButton.textContent = "New Colors";
  //change colors of squares
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.background = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = "#00A09D";
}

function setupSquares() {
    for (let i = 0; i < squares.length; i++) {
      //event listeners when squares are clicked
      squares[i].addEventListener("click", function () {
        //getting color of clicked square
        let clickedColor = this.style.backgroundColor;
        //comparing picked color and color of clicked square
        if (clickedColor === pickedColor) {
          messageDisplay.textContent = "Correct";

          resetButton.textContent = "Play Again?";
          changeColors(clickedColor);
          h1.style.backgroundColor = clickedColor;
          
        } 
        else {
          this.style.backgroundColor = "#153E4C";
          messageDisplay.textContent = "Try Again";
        }
      });
    }
}



resetButton.addEventListener("click", function () {
    //timing event
    var timeleft = 5;
    var downloadTimer = setInterval(function(){
    if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById("intro").innerHTML = "GO!";
        reset();      

    } 
    else {
        document.getElementById("intro").innerHTML = "The game starts in  " +timeleft ;
    }
    timeleft -= 1;
    }, 500);

});

function changeColors(color) {
  //looping througn all squares
  for (let i = 0; i < squares.length; i++) {
    //change color of each square to match the winning color
    squares[i].style.background = color;
  }
}

function pickColor() {
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    //get random color and put it into array
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  //red from 0-255
  let r = Math.floor(Math.random() * 256);
  //green from 0-255
  let g = Math.floor(Math.random() * 256);
  //blue from 0-255
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
