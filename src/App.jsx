import { languages } from "../language";
import { useState } from "react";
import { nanoid } from "nanoid";
import clsx from "clsx";
import { getFarewellText, getRandomWord } from "../util";
import Confetti from "react-confetti"


export default function App() {
  // State
  const [guessed, setGuessed] = useState([]);
  const [currentWord, setCurrentWord] = useState(getRandomWord);

  // Constants
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const isGameWon = currentWord.split("").every(letter => guessed.includes(letter));
  const wrongGuessCount = guessed.filter(letter => !currentWord.includes(letter)).length;
  const isGameOver = wrongGuessCount >= languages.length - 1;
  const lastGuess = guessed[guessed.length - 1];
  const isLastGuessIncorrect = lastGuess && !currentWord.includes(lastGuess);

  // Code language progress bar
  const languagesElement = languages.map((language, index) => {
    const isLost = wrongGuessCount > index;
    return (
      <span
        key={nanoid()}
        className={clsx("code-lang", isLost && "lost")}
        style={{
          backgroundColor: language.backgroundColor,
          color: language.color
        }}
      >
        {language.name}
      </span>
    );
  });

  // Current word display
  const guessWord = currentWord.split("").map(letter => {
    const shouldShow = isGameOver || guessed.includes(letter);
    const className = clsx(
      "guess-element",
      isGameOver && !guessed.includes(letter) && "missedLetters"
    );
    return (
      <span key={nanoid()} className={className}>
        {shouldShow ? letter.toUpperCase() : ""}
      </span>
    );
  });

  // Keyboard
  const keyboard = alphabet.split("").map(letter => {
    const isGuessed = guessed.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);

    const className = clsx("alphabet", {
      correct: isCorrect,
      wrong: isWrong
    });

    return (
      <button
        key={nanoid()}
        className={className}
        value={letter}
        disabled={isGameOver || isGameWon}
        onClick={() => handleKeyClick(letter)}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  // Handle guesses
  function handleKeyClick(letter) {
    setGuessed(prev =>
      prev.includes(letter) ? prev : [...prev, letter]
    );
  }

  // Restart game
  function startNewGame() {
    setGuessed([]);
    setCurrentWord(getRandomWord());
  }

  // Game status section
  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameOver,
    farewell: !isGameOver && isLastGuessIncorrect
  });

  function renderGameStatus() {
    const lang = languages[guessed.length - 1];

    if (!isGameWon && !isGameOver && isLastGuessIncorrect && lang) {
      return <p>{getFarewellText(lang.name)}</p>;
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
          <Confetti/>
        </>
      );
    }

    return (
      <>
        <h2>Game over!</h2>
        <p>You lose! Better start learning Assembly 😭</p>
      </>
    );
  }

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word within 8 attempts to keep the programming world safe
          from Assembly!
        </p>
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

      <section className="keyboard">
        {keyboard}
      </section>

      {(isGameWon || isGameOver) && (
        <button className="new-game" onClick={startNewGame}>
          New Game
        </button>
      )}
    </main>
  );
}
