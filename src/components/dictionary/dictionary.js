import React, { useState, useEffect } from 'react'
import { getDictionary } from '../../Services/dictionary'
import { CreateWord } from '../CreateWord/Createword'
import './Dictionary.css'

export const Dictionary = () => {
    useEffect(() => {
        getAllWords()
    }, [])

    const [words, setWords] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const filter = (word, allWords) => {
        const arrangedWords = allWords.filter((value) => {
            if (word === '') {
                return value;
            }
            if (Number(word) === value.id) {
                console.log('number =>', Number(word), 'value.id=>', value.id)
                return value;
            } else if (value.definition.toLowerCase().includes(word.toLowerCase()) ||
                value.word.toLowerCase().includes(word.toLowerCase())) {
                return value;
            }
        })
        setFiltered(arrangedWords)
    }

    const [checked, setChecked] = useState([]);

    const handleChanger = evt => {
        const { value } = evt.target;
        setChecked(prevState => {
            if (prevState.includes(Number(value))) {
                return prevState.filter(element => element !== Number(value))
            } else {
                return [...prevState, Number(value)]
            }
        })
    }

    const [globallyChecked, setGloballyChecked] = useState(false);

    const globalHandleChanger = () => {
        setGloballyChecked(prevState => !prevState)
    }

    const declineNoun = count => {
        count = Math.abs(count) % 100;
        let count1 = count % 10;
        if (count > 10 && count < 20) { return 'слов'; }
        if (count1 > 1 && count1 < 5) { return 'слова'; }
        if (count1 === 1) { return 'слово'; }
        return 'слов';
    }

    const getAllWords = async () => {
        try {
            const allWordsFromServer = await getDictionary()
            setWords(allWordsFromServer)
            setFiltered(allWordsFromServer)
        } catch (error) {
            console.error(error)
        }
    }

    let soundOutput = (src) => {
        const sound = new Audio(`${src}`);
        return sound.play();
    }

    return (
        <div className='container'>
            <div className='dictionary'>
                <h1 className='dictionary__header'>Ваш словарь</h1>
                <label
                    className={globallyChecked === false ? 'dictionary__check-all-words' : 'dictionary__check-all-words dictionary__check-all-words--active'}>
                    Выбрать все слова из списка
                    <input className='dictionary__global-checkbox'
                        type='checkbox'
                        onChange={globalHandleChanger}
                    />
                </label>
                {globallyChecked ? `Вы выбрали: ${words.length} ${declineNoun(words.length)}` :
                    `Вы выбрали: ${checked.length} ${declineNoun(checked.length)}`}
                <input
                    className='dictionary__input'
                    type='text'
                    placeholder='Поиск по слову...'
                    onChange={(evt) => filter(evt.target.value, words)}
                />
                {Boolean(filtered.length) && filtered.map((word) => (
                    <ul className='dictionary__list' key={word.id}>
                        <li className='dictionary__checkbox'>
                            <input
                                type='checkbox'
                                value={word.id}
                                checked={checked.includes(word.id) || globallyChecked}
                                onChange={handleChanger}
                            />
                        </li>
                        <li className='dictionary__id'>{word.id}</li>
                        <li className='dictionary__word'>{word.word}</li>
                        <li className='dictionary__pinin'>{word.pinin}</li>
                        <li className='dictionary__definition'>{word.definition}</li>
                        <li className='dictionary__audio'>
                            {word.audioUrl && <buttion
                                className='dictionary__audio__button'
                                type='button'
                                onClick={() => soundOutput(word.audioUrl)} />}
                        </li>
                    </ul>
                ))}
                {<div className={filtered.length === 0 ? 'dictionary__message' : 'dictionary__message-hidden'}>По вашему запросу ничего не найдено</div>}
            </div>
            <CreateWord />
        </div>
    )
}
// buttons: play/pause;
// убрать аудиоэлемент из верстки, написать компонент с пропсом аудиоюрл
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
// 