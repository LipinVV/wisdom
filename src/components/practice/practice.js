import React, { useState } from 'react'
import { dictionary } from '../dictionary/data'


export const Practice = () => {

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
                        />
                    </label>
                    {answer === showRandomWord(num) ?
                        <button
                            onClick={handleGenerator}
                            className='answer__correct'>
                            Верно!
                    </button> :
                        <div className='answer__await'>Впишите слово!</div>}
                </div>
            </div>
        </div>
    )
}