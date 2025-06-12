import { languages} from "../language"
import { useState } from "react"
import { nanoid } from 'nanoid';




export default function App(){

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
  const [currentWord, setCurrentWord] = useState("react")
  const guessWord = currentWord.split("").map(element=>{
    return <span
    className="guess-element"
    key = {nanoid()}>
      {element.toUpperCase()}
    </span>
  })

  //keyboard
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const keyboard = alphabet.split("").map(element=>{
    return <button 
    key = {nanoid()}
    className="alphabet"
    >{element.toUpperCase()}</button>
  })

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
      <section className="keyboard">
        {keyboard}
      </section>

    </main>
  )
}