import { languages} from "../language"


const languagesElement = languages.map(element=>{
  return <span 
    className="code-lang"
    style={{
    backgroundColor : element.backgroundColor,
    color: element.color}}
    >{element.name}</span>
})

export default function App(){
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

    </main>
  )
}