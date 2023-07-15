const gameContainer = document.getElementById("game");
const button = document.querySelector("BUTTON");
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.style.backgroundColor = "white";

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let selected = [];
let matched = []
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  //checks if you have 2 cards selected
  if(selected.length < 2 && event.target.style.backgroundColor === "white"){
    console.log("you just clicked", event.target);
    event.target.style.backgroundColor = event.target.className;
    selected.push(event.target);


  }
  else if (selected.length === 2){
    //if there are 2 selected then check if they are a match or not
    check();
    //flip the card clicked
    if (event.target.style.backgroundColor === "white"){
      console.log("you just clicked", event.target);
      event.target.style.backgroundColor = event.target.className;
      selected.push(event.target);
    }

  }

  //implement this for the end game
  if (matched.length === 8 && selected.length === 2){
    console.log("you win");
  }
}

function check(){
  //if the two selected cards a match then clear them
  if(selected[0].className === selected[1].className){
    matched.push(selected[0]);
    matched.push(selected[1]);
    selected.pop();
    selected.pop();
  }
  else{
    //make the cards white and clear the array if they arent a match
    clear();
  }
}

function clear(){
  for (let i = 0; i < selected.length; i++){
    selected[i].style.backgroundColor = "white";
  }
  selected.pop();
  selected.pop();
  
}

button.addEventListener('click', function(e){
  button.parentElement.remove();
})

// when the DOM loads
createDivsForColors(shuffledColors);

