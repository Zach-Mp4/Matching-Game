const gameContainer = document.getElementById("game");
const button = document.querySelector("BUTTON");
const splash = document.getElementById("intro-card");
const body = document.querySelector("BODY");
const welcome = document.getElementById("welcome");
let scoreCount = 0;
const score = document.getElementById("score");
let bestScore = 0;
const best = document.getElementById("best-score");
bestScore = parseInt(localStorage.bestScore);
best.innerText = "Best Score: " + bestScore;
function rand(){
  let r = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
  return r;
} 
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
let cards = [];
// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
let num = Math.floor(Math.random() * 10);
while (num % 2 != 0 || num === 0){
  num = Math.floor(Math.random() * 10);
}
function createDivsForColors(colorArray) {
  if (num % 2 === 0){
    for (let color = 0; color < num; color++) {
      // create a new div
      const newDiv = document.createElement("div");
  
      // give it a class attribute for the value we are looping over
      newDiv.classList.add(COLORS[color]);
      newDiv.style.backgroundColor = "white";
  
      // call a function handleCardClick when a div is clicked on
      newDiv.addEventListener("click", handleCardClick);
  
      // append the div to the element with an id of game
      cards.push(newDiv);
      gameContainer.append(newDiv);
    }
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
    scoreCount += 1;
    score.innerText = scoreCount;



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
    scoreCount += 1;
    score.innerText = scoreCount;
  }

  //implement this for the end game
  if (matched.length === 8 && selected.length === 2){
    console.log("you win");
    welcome.innerText = "YOU WIN!";
    button.innerText = "play again?"
    body.prepend(splash);
    for (let i = 0; i < cards.length; i++){
      cards[i].style.backgroundColor = "white";
    }
    let j = selected.length;
    for (let i = 0; i < j; i++){
       selected.pop();
    }
    j = matched.length;
    for (let i = 0; i < j; i++){
       matched.pop();
    }
    if (scoreCount < bestScore || bestScore === 0){
      bestScore = scoreCount;
      best.innerText = "Best Score: " + bestScore;
      localStorage.setItem('bestScore', bestScore);
    }
    scoreCount = 0;
    score.innerText = scoreCount;
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

