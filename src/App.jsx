import { languages} from "../language"
import { useState } from "react"
import { nanoid } from 'nanoid';
import clsx from "clsx";




export default function App(){
  
  const [guessed, setGuessed] = useState([])
  const [currentWord, setCurrentWord] = useState("react")
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  //coding laguages redering
  const languagesElement = languages.map((element,index)=>{
  return <span 
    className="code-lang"
    key= {nanoid()}
    style={{
    backgroundColor : element.backgroundColor,
    color: element.color}}
    >{element.name}</span>
  })

  //guess word rendering
  
  const guessWord = currentWord.split("").map(element=>{
    return <span
    className="guess-element"
    key = {nanoid()}>
      {element.toUpperCase()}
    </span>
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