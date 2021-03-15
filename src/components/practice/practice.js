import React, { useEffect, useState } from 'react'
import { dictionary } from '../dictionary/data'


export const Practice = () => {


    const [timer, setTimer] = useState(3);
    const [running, setRunning] = useState(true);

    useEffect(() => {
        if (running) {
            const id = window.setInterval(() => {
                setTimer(seconds => seconds > 0 ? seconds - 1 : 'Время вышло!');
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

    const showRandomWord = (num) => {
        for (let word of dictionary) {
            if (dictionary[num].id - 1 === num) {
                return dictionary[num].word
            } else {
                return 'not found'
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
                    <span className={timer === 'Время вышло!' ? 'contest__timer contest__timer--off' : 'contest__timer'}>{timer}</span>
                    <div className='current__word'>
                        <span>
                            {showRandomWord(num)}
                        </span>
                    </div>
                    <label className='answer__label'>
                        <input
                            className={answer === showRandomWord(num) ? 'answer__input answer__input--correct' : 'answer__input'}
                            type='text'
                            onChange={handleChanger}
                            value={answer}
                            disabled={timer === 'Время вышло!'}
                        />
                    </label>
                    {answer === showRandomWord(num) ?
                        <button
                            onClick={handleGenerator}
                            className='answer__correct'>
                            Верно!
                    </button> :
                        timer === 'Время вышло!' ? <div className='answer__ended'>Далее</div> :

                            <div className='answer__await'>Впишите слово!</div>}
                </div>
            </div>
        </div>
    )
}