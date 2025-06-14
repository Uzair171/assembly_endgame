import { languages} from "../language"
import { useState } from "react"
import { nanoid } from 'nanoid';
import clsx from "clsx";
import { useEffect } from "react";




export default function App(){
  
  //state values
  const [guessed, setGuessed] = useState([])
  const [currentWord, setCurrentWord] = useState("i")

  //static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const isGameWon = currentWord.split("").every(element=> guessed.includes(element))
  


  //derived Values
  let wrongGuessCount = guessed.filter(element=> !currentWord.includes(element)).length 
  const isGameOver = wrongGuessCount >= languages.length-1
  console.log("isGame",isGameWon)

  //coding laguages redering
  const languagesElement = languages.map((element,index)=>{

    const lostLang = wrongGuessCount > index
    return <span 
      className={`code-lang ${lostLang? " lost" : ""}`}
      key= {nanoid()}
      style={{
      backgroundColor : element.backgroundColor,
      color: element.color}}
      >{element.name}</span>
    })

  //current word rendering
  
  const guessWord = currentWord.split("").map(element=>{
    return (<span
    className="guess-element"
    key = {nanoid()}>
      {guessed.includes(element) ? element.toUpperCase() : ""}
    </span>)
  })

  //keyboard
  
  const keyboard = alphabet.split("").map(element=>{
    //funciton so if a user click on the right element the button turns green or red if false
    const isGuessed = guessed.includes(element)
    const isCorrect = isGuessed && currentWord.includes(element)
    const isWrong = isGuessed && !currentWord.includes(element)
    const className = clsx("alphabet",{
      correct : isCorrect,
      wrong: isWrong
    })
    

    return (<button 
    key = {nanoid()}
    className={className}
    value={element}
    onClick={()=>onKeyDown(element)}
    >{element.toUpperCase()}</button>)
    
  })

  //storing guessed letter
  
  function onKeyDown(value){
    setGuessed(prevValue=>{
      if(!prevValue.includes(value)){
      return [...prevValue,
      value] 
      }else{
        return prevValue
      }
    })
    return guessed
    
  }
 console.log(guessed)

  //isGameover conditionally guessing if the count is up by 8 or not

  // useEffect(() => {
  //   if (wrongGuessCount >= languages.length) {
  //     isGameOver = !isGameOver
  //   }
  //   }, [wrongGuessCount]);

  // console.log(isGameOver)
  //main dom element

  const gameStatusClass = clsx("game-status", {
        won: isGameWon,
        lost: isGameOver
    })



  //conditiong to show the game status
  function renderGameStatus() {   
      if (!isGameWon && !isGameOver) {
        return null;
      }

      if (isGameWon) {
        return (
          <>
            <h2>You win!</h2>
            <p>Well done! 🎉</p>
          </>
        );
      } else {
        return (
          <>
            <h2>Game over!</h2>
            <p>You lose! Better start learning Assembly 😭</p>
          </>
        );
      }
    }

  return(
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the 
        programming world safe from Assembly!</p>
      </header>

      <section className={gameStatusClass}>
        {renderGameStatus()}
      </section>
      <section className="code-langs">
        {languagesElement}
      </section>
      <section className="guess-word">
        {guessWord}
      </section>
      <section 
        className="keyboard"

      >
        {keyboard}
      </section>
      {(isGameWon || isGameOver) ?  <button className="new-game">New Game</button>: null}
    </main>
  )
}