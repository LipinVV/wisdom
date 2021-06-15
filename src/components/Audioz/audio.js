import React, { useState, useEffect } from 'react'
import { getDictionary } from '../../services/dictionary';
import './audio.css';

export const Audio = () => {
    
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

    const [play, setPlay] = useState(false)
    const playerHandler = () => {
        if(play === false) {
            setPlay(true)
        }
    }

    let au = (src) => {
        const sound = new Audio({
            src: showRandomWordUrl(num)
        })
        console.log('au', au)
    }
    
    return (
        
        <div>
            <audio
            controls
            play={play}
            ><source src={showRandomWordUrl(num)}/></audio>    
            <button onClick={playerHandler}>PLAY</button>
            <button>STOP</button>
        </div>
    )
}
