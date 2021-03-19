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
        setPractice(arrayShuffle(words).filter((_, i) => i < 4));
        setColor(false)
    }

    useEffect(() => {
        renderQuiz()
    }, [])

    let rndmzr = Math.floor(Math.random() * 4);

    const validation = (evt) => {
            if (evt.target.value === practice[rndmzr].definition) {
                setColor(true)
                setCounter(prevState => prevState + 1)
            } else {
                setWrong(prevState => prevState + 1)
                renderQuizz()
            }
    }

    const [color, setColor] = useState(false);
    // вместо колора какой-то стэйт ещё нужен чтобы что-то ещё было
    const [counter, setCounter] = useState(0);
    const [wrong, setWrong] = useState(0);

    return (
        <div className='match__contest'>
            <span>{color}</span>
            <span className='match__contest-def'>{practice.length > 0 && color === false ? practice[rndmzr].definition : null}</span>
            {practice.map((x, i) => {
                return (
                    <div>
                        <ul className='match__contest-words'>
                            <li className='match__contest-word'></li>
                            <button
                                value={x.definition}
                                type='button'
                                className={color === true ? 'match__contest-yes' : 'match__contest-no'}
                                onClick={validation}
                                disabled={color}
                            >
                                {console.log(color)}
                                {!color ? x.word : '没错!'}
                            </button>
                        </ul>
                    </div>
                )
            })}
            <button
                className='match__contest-button'
                type='button'
                onClick={renderQuizz}
                hidden={!color}
            >Следующий вопрос</button>
            {practice.length === 0 ? <button
                className='match__contest-button'
                type='button'
                onClick={renderQuizz}
            >Старт</button> : null}
            <span className='match__contest-correct'>Верно: {counter}</span>
            <span className='match__contest-incorrect'>Неверно: {wrong}</span>
        </div>
    )
}


// useEffect(() => {
//     setBox(words.filter(x => {
//     })
// )}, [words])
// console.log('words', words)
// // console.log('box', box)
