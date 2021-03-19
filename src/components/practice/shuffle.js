import React, { useEffect, useState } from 'react'
import { GetDictionary } from "../../services/dictionary";


export const Shuffle = () => {
    // можно ли прокинуть из одного файла во все?
    const [words, setWords] = useState([])
    const getAllWords = async () => {
        try {
            const allWordsFromServer = await GetDictionary()
            setWords(allWordsFromServer)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getAllWords()
    }, [])

    const arrayShuffle = (arr) => {
        let newPos, temp;

        for (let i = arr.length - 1; i > 0; i--) {
            newPos = Math.floor(Math.random() * (i + 1))
            temp = arr[i];
            arr[i] = arr[newPos];
            arr[newPos] = temp;
        }
        return arr;
    }

    const [practice, setPractice] = useState([])
    // console.log('practice', practice) => массив при первой загрузке пуст(даже если вписать что-то в него), аналогично в словаре
    const renderQuiz = () => {
        if (color === false) {
            setColor(false)
        } else {
            setPractice(arrayShuffle(words).filter((_, i) => i < 4));
        }
    }

    const renderQuizz = () => {
        setColor(false)
        setSomestate(false)
        setPractice(arrayShuffle(words).filter((_, i) => i < 4));
    }

    useEffect(() => {
        renderQuiz()
    }, [])

    const [num, setNum] = useState(Math.floor(Math.random() * 4));
    const [correctCounter, setCorrectCounter] = useState(0);
    const [mistakeCounter, setMistakeCounter] = useState(0);
   
    const validation = (evt) => {
        if (evt.target.value === practice[num].definition) {
            setColor(true)
            setCorrectCounter(prevState => prevState + 1)
        } else {
            evt.preventDefault();
            setMistakeCounter(prevState => prevState + 1)
            // renderQuizz()
            setColor(false)
            setSomestate(true)
        }
    }

    const [color, setColor] = useState(false);
    const [somestate, setSomestate] = useState(false);
    

    return (
        <div className='match__contest'>
            <span>{color}</span>
            {practice.length > 0 ? <span className='match__contest-def'>{practice[num].definition}</span> : null}
            {practice.map((x, i) => {
                return (
                    <div>
                        <ul className='match__contest-words'>
                            <li className='match__contest-word'></li>
                            <button
                                value={x.definition}
                                type='button'
                                className={'match__contest-no'}
                                onClick={validation}
                                disabled={color || somestate}
                            >
                                {x.word}
                            </button>
                        </ul>
                    </div>
                )
            })}
            <button
                className={!color && !somestate ? 'match__contest-button' : 'match__contest-button match__contest-button-hidden'}
                type='button'
                onClick={renderQuizz}
                hidden={!color && !somestate}
            >Следующий вопрос</button>
            {practice.length === 0 ? <button
                className='match__contest-button'
                type='button'
                onClick={renderQuizz}
            >Старт</button> : null}
            <div className='match__contest-answers'>
                <span className='match__contest-correct'>{correctCounter > 0 ? `Верно: ${correctCounter}` : ''}</span>
                <span className='match__contest-incorrect'>{mistakeCounter > 0 ? `Неверно: ${mistakeCounter}` : ''}</span>
            </div>
        </div>
    )
}


// useEffect(() => {
//     setBox(words.filter(x => {
//     })
// )}, [words])
// console.log('words', words)
// // console.log('box', box)
