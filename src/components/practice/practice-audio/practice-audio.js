import React, { useEffect, useState } from 'react'
import { getDictionary } from '../../../services/dictionary';
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom'


export const PracticeAudioMatching = () => {

    const [words, setWords] = useState([]);
    const getAllWords = async () => {
        try {
            const allWordsFromServer = await getDictionary()
            setWords(allWordsFromServer)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getAllWords()
        // setNum(numberGenerator)
    }, [])

    const numberGenerator = Math.floor(Math.random() * 140);
    const [num, setNum] = useState(numberGenerator);

    const showRandomWordUrl = (num) => {
        for (let word of words) {
            if (word.id === num) {
                console.log(word.audioUrl)
                return word.audioUrl;
            } else {
                continue
            }
        }
    }

    const handleGenerator = () => {
        setNum(numberGenerator);
        setAnswer('');
    }

    const [answer, setAnswer] = useState('');
    const handleChanger = (evt) => {
        const { value } = evt.target;
        setAnswer(value);
    }

    const handleKeyPress = (evt) => {
        // if (evt.keyCode === 13 && answer === showRandomWordUrl(num)) {
        //     setAnswer('');
        // }
    }

    return (
        <div className='container'>
            <div className='audio-contest'>
                <Link className='audio-contestn__exit' to='/practice'><span className='audio-contest__exit__link'>Выйти из задания</span></Link>

                <div className='audio-contest__current-word'>
                        <span>{showRandomWordUrl(num)}
                            <audio id='audio-contest' 
                            controls
                            ><source src={showRandomWordUrl(num)}/></audio>
                        </span>
                    </div>

                <label>
                    <input
                        className='audio-contest__answer-field'
                        type='text'
                        value={answer}
                        onChange={handleChanger}
                        onKeyDown={handleKeyPress}
                    />
                </label>

                <button
                    onClick={handleGenerator}
                >PRESS</button>
            </div>
        </div>
    )

}