import React, { useEffect, useState } from 'react'
import confetti from "canvas-confetti"

/**
 * Determines the message that will be posted to the client. Whether they won or lost and they have to try again. 
 * 
 * @param { innerHTML } container in which the message will be set.
 * @param { InputHTMLAttributes } guessField HTML input attribute.
 * @param { ButtonHTMLAttributes } guessButton HTML button attribute.
 * @param { String } message that will be posted in the container.
 */
function determineOutcome(container, guessField, guessButton, message) {
    container.innerHTML = message;
    guessField.style.display = 'none';
    guessButton.style.display = 'none';
}

/**
 * Updates the container that holds the word to be guessed and clears the guess field so the user can guess again.
 * 
 * @param { number } index 
 * @param { innerHTML } container in which the message will be set.
 * @param { InputHTMLAttributes } guessField HTML input attribute.
 * @param { List } words object containing all words available.
 */
function updateWord(index, container, guessField, words) {
    container.innerHTML = "Cómo Se Dice&nbsp;"  + words[index].spanish.bold() + "(" + words[index].type.italics() + ")?";
    guessField.value = '';
}

/**
 * Validate strings are alphanumeric.
 * 
 * @param { str } string which is being validated.
 * @returns true or false whether or not the string is alphanumeric.
 */
function isAlphanumeric(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
}

/**
 * Resets the game when the 'play again' button is pressed. This will make the guess button, guess field,
 * the field in which the user is asked what the word they need to guess, and the score and lives fields 
 * are shown again. 
 * 
 * @param { words } words that are shuffled after a new game is intantiated.
 */
function playAgainReset(words) {
    let guessButton = document.getElementById('guessButton');
    let playAgainButton = document.getElementById('playAgainButton');
    let guessField = document.getElementById('guessField');
    let nextWordContainer = document.getElementById('nextWordContainer');
    let scoreID = document.getElementById("score");
    let numberOfLives = document.getElementById('numberOfLives');

    scoreID.innerText = "Score: 0"
    numberOfLives.innerText = "Lives: 3"
    playAgainButton.style.display = 'none';
    guessButton.style.display = 'inline'
    guessField.style.display = 'inline';
    guessField.value = ''
    nextWordContainer.innerHTML = "Cómo Se Dice&nbsp;"  + words[0].spanish.bold() + "(" + words[0].type.italics() + ")?";
}


/**
 * Component that handles the creation of the text field that will ask the user what word is being guessed,
 * the input field for the user to guess, and the button that triggers the validation of the users guess.
 * 
 * @returns Component that handles the users guess.
 */
function GuessWord() {

    // words already come randomized so we can start with the first index. i.e. 0
    let currentWordIndex = 0;
    let currentNumberOfLives = 3;
    let correctNumberOfGuesses = 0;

    const determineInput = (e) => {
        // This prevents the eventHandler from refershing the page. We don't want the page to refresh until the game is finished.
        e.preventDefault();

        console.log("I'm being pressed")

        let nextWordContainer = document.getElementById('nextWordContainer');
        let guessField = document.getElementById('guessField');
        let scoreID = document.getElementById("score");
        let numberOfLives = document.getElementById('numberOfLives');
        let playAgainButton = document.getElementById("playAgainButton");
        let guessButton = document.getElementById("guessButton");

        const userGuess = guessField.value.toLowerCase().trim();
        const currentWord = words[currentWordIndex];

        if(isAlphanumeric(userGuess)) {
            /* 
            The user got the correct answer, that means that there will be confetti, the background will turn green, 'correctNumberOfGuesses'
            and 'currentWordIndex' will be incremented by one. The score will be updated as well.
            */
            if (userGuess === currentWord.english.toLowerCase()) {
                confetti();
                
                correctNumberOfGuesses++
                console.log("Correct number of guesses: " + correctNumberOfGuesses)

                scoreID.innerHTML = "Score: " + correctNumberOfGuesses.toString();

                /* 
                The user got 10 correct words with remaining lives. Meaning we tell them they won and we display the 'play again'
                button so they can play play again
                */
                if (correctNumberOfGuesses == 10) {
                    determineOutcome(nextWordContainer, guessField, guessButton, 'You Win!');
                    playAgainButton.style.display = "inline";
                }
                /*
                The user got the correct answer, they haven't reached the 10 points to win and there are still words in the words map to guess.
                Meaning the 'nextWordContainer' will be updated with the new word and the guessfield will be emptied so the user can guess again. 
                */
                else if (currentWordIndex < words.length) {
                    currentWordIndex++;
                    updateWord(currentWordIndex, nextWordContainer, guessField, words);
                }
            /*
            The user got the wrong answer, meaning we will decrease the currentNumberOfLives by one.
            */
            } else {
                currentNumberOfLives--;
                numberOfLives.innerText = "Lives: " + currentNumberOfLives.toString();

                /* 
                The user got the wrong answer and if the user has 0 lives, then they lose the game and the play again button will be
                displayed so they can play again.
                */
                if (currentNumberOfLives == 0) {
                    determineOutcome(nextWordContainer, guessField, guessButton, 'You ran out of lives, try again.');
                    playAgainButton.style.display = "inline";
                /* 
                The user got the wrong answer and if the user has lives left, then we move on to the next word meaning we will increase 
                the 'currentWordIndex' by one.
                */
                } else {
                    currentWordIndex++;
                    updateWord(currentWordIndex, nextWordContainer, guessField, words);
                }
            }
        }
    }

    /*
     'words' is the value of our current state, meaning the current array of random words the current game is using.
     'setWords' is the value that helps us set the 'words' state after we want to get a new array of random words for the next game.
     */
    const [words, setWords] = useState("loading")

    /* 
     Async function that will be called when the user clicks the 'play again' button. Will call the server to get a new set of 
     words to use for the new game and reset the board.
     */
    async function playAgain(wordIndex, lives, guesses) {
        fetchWords();
        playAgainReset(words)

        wordIndex = 0
        lives = 3
        guesses = 0
    }

    // Asyn method that calls server to get random words for the game.
    async function fetchWords() {
        console.log("In async function")
        const result = await fetch("/api/getWords");
        const body = await result.json();
        setWords(body);
    }

    useEffect(() => {
        fetchWords()
    }, [])

  return (
    <div>
        {/* Asking the user the word to guess. */}
        <div className="flex justify-center" >
            <h2 id="nextWordContainer" className="w-1/4 flex justify-center">
                ¿Cómo Se Dice&nbsp;<b>{words[currentWordIndex].spanish}</b>(<i>{words[currentWordIndex].type}</i>)?
            </h2>
        </div>

        {/* 
            This form is what allows the usage of the 'enter' key when the user wants to submit their input/guess to be verified. 
            For some reason the 'onkeydown', 'onkeyup' and other variations of binding does not work. 
        */}
        <form onSubmit={determineInput}>
            {/* Input field for the users guess. */}
            <div className="flex justify-center">
                <input autoComplete="one-time-code" type="text" id="guessField" className="block p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-96 "></input>
            </div>
            
            
            {/* Buttons that handle the submittion of the users guess. */}
            <div className="flex justify-center">
                <button style={{ display: 'inline' }} onClick={determineInput} id="guessButton" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-20 mt-4">Guess</button>
                
                {/* <button style={{ display: 'none' }} onClick={() => window.location.reload(true)} id="playAgainButton" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Play again</button> */}
                <button style={{ display: 'none' }} onClick={() => {playAgain(currentWordIndex, currentNumberOfLives, correctNumberOfGuesses)}} id="playAgainButton" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Play again</button>

            </div>
            
        </form>
    </div>
  )
}

export default GuessWord