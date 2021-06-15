import React, { useEffect, useState } from 'react'
import { getDictionary } from '../../../services/dictionary';
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom'
import './PracticeAudio.css'

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
    }, [])

    const numberGenerator = Math.floor(Math.random() * 140);
    const [num, setNum] = useState(numberGenerator);

    const showRandomWordUrl = (allWords, num) => {
        const foundWord = allWords.find((word) => word.id === num)
        return foundWord?.audioUrl
    }

    const showRandomWord = (num) => {
        for (let word of words) {
            if (word.id === num) {
                return word.word;
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
        if (evt.keyCode === 13 && answer === showRandomWord(num)) {
            nextAudio();
        }
    }

    const [isShowPlayer, setShowPlayer] = useState(true)
    const nextAudio = () => {
        setShowPlayer(false)
        handleGenerator()

        setTimeout(() => {
            setShowPlayer(true)
        }, 300)
    }

    const soundOutput = () => {
        const sound = new Audio(`${showRandomWordUrl(words, num)}`);
        return sound.play();
    }

    return (
        <div className='container'>
            <div className='audio-contest'>
                <Link className='audio-contest__exit' to='/practice'><span className='audio-contest__exit__link'>Выйти из задания</span></Link>
                <div className='audio-contest__current-word'>
                    {Boolean(showRandomWordUrl(words, num)) && isShowPlayer && (
                        <audio id={showRandomWord(num)} autoPlay>
                            <source src={showRandomWordUrl(words, num)} />
                        </audio>
                    )}
                    <button className='audio-contest__play' onClick={soundOutput}></button>
                </div>
                <label className='audio-contest__answer-label'>
                    <input
                        className='audio-contest__answer-field'
                        type='text'
                        value={answer}
                        onChange={handleChanger}
                        onKeyDown={handleKeyPress}
                    />
                </label>

                <button
                    onClick={nextAudio}
                >Далее</button>
            </div>
        </div>
    )

}
