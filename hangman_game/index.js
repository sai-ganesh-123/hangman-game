const keyboarddiv = document.querySelector(".keyboard");
const hinttext = document.querySelector(".hint-text b");
const worddisplay = document.querySelector(".word-display");
const guessestext = document.querySelector(".guesses-text b");
const hangmanimage = document.querySelector(".hangman-box img");
const gamemodal = document.querySelector(".game-modal");
const playagainbtn = document.querySelector(".play-again");

let currentword, correctletters, wrongGuesscount ;
const maxguess = 6;

const resetgame = ()=>{
    correctletters = [];
    wrongGuesscount = 0;
    hangmanimage.src = `images/hangman-${wrongGuesscount}.svg`;
    guessestext.innerText = `${wrongGuesscount} / ${maxguess}`;
    keyboarddiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    worddisplay.innerHTML = currentword.split("").map(()=> `<li class="letter"></li>`).join("");
    gamemodal.classList.remove("show");
}

const getrandomword = () =>{
    const {word,hint} = wordList[Math.floor(Math.random()*wordList.length)];
    currentword = word;
    hinttext.innerText = hint;
    resetgame();
   
}

const gameover = (isvictory) =>{
    setTimeout(()=>{
        const modaltext = isvictory ? `You found the word:` : `The correct word was:`;
        gamemodal.querySelector("img").src = `images/${isvictory ? 'victory' : 'lost'}.gif`;
        gamemodal.querySelector("h4").innerText = `${ isvictory ? 'Congrates!' : 'Game-over!'}`;
        gamemodal.querySelector("p").innerHTML = `${modaltext} <b>${currentword}</b>`;
        gamemodal.classList.add("show");
    },300);
}

const initgame = (button,clickedletter) => {
    if(currentword.includes(clickedletter)){
        [...currentword].forEach((letter,index) => {
            if(letter === clickedletter){
                correctletters.push(letter);
            worddisplay.querySelectorAll("li")[index].innerText = letter;
            worddisplay.querySelectorAll("li")[index].classList.add("guessed");
            
        }
    });
  }
  else{
        wrongGuesscount++;
        hangmanimage.src = `images/hangman-${wrongGuesscount}.svg`;
  }
  button.disabled = true;
  guessestext.innerText = `${wrongGuesscount} / ${maxguess}`;
  if(wrongGuesscount === maxguess) return gameover(false);
  if(correctletters.length === currentword.length) return gameover(true);
}

for(let i=97;i<=122;i++){
    let button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboarddiv.appendChild(button);
    button.addEventListener("click", e => initgame(e.target,String.fromCharCode(i)));
}

getrandomword();
playagainbtn.addEventListener("click",getrandomword);