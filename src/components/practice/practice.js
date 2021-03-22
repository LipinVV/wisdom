import React, { useEffect, useState } from 'react'
import { GetDictionary } from "../../services/dictionary";

export const Practice = () => {
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


    const [timer, setTimer] = useState(30);
    const [running, setRunning] = useState(true);

    useEffect(() => {
        if (running) {
            const id = window.setInterval(() => {
                setTimer(seconds => seconds > 1 ? seconds - 1 : '');
            }, 1000)
            return () => window.clearInterval(id);
        }
    }, [running]);


    const numberGenerator = Math.floor(Math.random() * 40);
    const [num, setNum] = useState(numberGenerator);

    const handleGenerator = () => {
        setNum(numberGenerator);
        setAnswer('');
    }

    // есть ли другой способ?
    const showRandomWord = (num) => {
        for (let word of words) {
            if (word.id === num) {
                return word.word;
            } else {
                continue
            }
        }
    }

    const [answer, setAnswer] = useState('');

    const handleChanger = (evt) => {
        const { value } = evt.target;
        setAnswer(value);
    }

    return (
        <div className='container'>
            <div className='type-character-contest'>
                <div className='type-character-contest__wrapper'>
                    <span className={timer === '' ? 'type-character-contest__timer type-character-contest__timer_off' : 'type-character-contest__timer'}>
                        {timer}
                    </span>
                    <div className='type-character-contest__current-word'>
                        <span>
                            {timer === '' ? 'Время вышло!' : showRandomWord(num)}
                        </span>
                    </div>
                    <label className='type-character-contest__answer-label'>
                        <input
                            className={answer === showRandomWord(num) ? 'type-character-contest__answer-input type-character-contest__answer-input_correct' : 'type-character-contest__answer-input'}
                            type='text'
                            onChange={handleChanger}
                            value={answer}
                            hidden={timer === ''}
                        />
                    </label>
                    {answer === showRandomWord(num) && timer !== '' ?
                        <button
                            onClick={handleGenerator}
                            className='type-character-contest__answer-is-correct'>
                            Верно!
                    </button> :
                        timer === '' ?
                            <div className='type-character-contest__answers-ended'>Далее{' =>'}</div> :
                            <div className='type-character-contest__answers-awaiting'>Впишите слово!</div>}
                </div>
            </div>
        </div>
    )
}