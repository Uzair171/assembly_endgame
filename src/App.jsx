import { languages} from "../language"
import { useState } from "react"
import { nanoid } from 'nanoid';
import clsx from "clsx";




export default function App(){
  
  //state values
  const [guessed, setGuessed] = useState([])
  const [currentWord, setCurrentWord] = useState("worldend")

  //static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const isGameOver = false

  //derived Values
  let wrongGuessCount = guessed.filter(element=> !currentWord.includes(element)).length 

  console.log("wrongword",wrongGuessCount)

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

  

  //main dom element
  return(
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the 
        programming world safe from Assembly!</p>
      </header>
      <section className="game-status">
        <h2>You win!</h2>
        <p>Well done!🎉</p>
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
      <button className="new-game">New Game</button>
    </main>
  )
}