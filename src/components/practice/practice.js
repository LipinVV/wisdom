import { array } from 'prop-types';
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


    const [timer, setTimer] = useState(10);
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
            <div className='practice'>
                <div className='type__contest'>
                    <span className={timer === '' ? 'contest__timer contest__timer--off' : 'contest__timer'}>{timer}</span>
                    <div className='current__word'>
                        <span className=''>
                            {timer === '' ? 'Время вышло!' : showRandomWord(num)}
                        </span>
                    </div>
                    <label className='answer__label'>
                        <input
                            className={answer === showRandomWord(num) ? 'answer__input answer__input--correct' : 'answer__input'}
                            type='text'
                            onChange={handleChanger}
                            value={answer}
                            hidden={timer === ''}
                        />
                    </label>
                    {answer === showRandomWord(num) && timer !== '' ?
                        <button
                            onClick={handleGenerator}
                            className='answer__correct'>
                            Верно!
                    </button> :
                        timer === '' ?
                            <div className='answer__ended'>Далее{' =>'}</div> :
                            <div className='answer__await'>Впишите слово!</div>}
                </div>
            </div>
        </div>
    )
}