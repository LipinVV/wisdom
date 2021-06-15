import React, { useEffect, useState } from 'react'
import { getDictionary } from '../../../../services/dictionary';
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom'
import './PracticeMatchingDefinition.css'

export const PracticeDefinitionMatching = () => {
    // можно ли прокинуть из одного файла во все?
    const [words, setWords] = useState([])
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
    // console.log('practice', practice) => массив при первой загрузке пуст, аналогично в словаре
    // из-за этого к этой опции привязана логики отрисовки, нужно поправить

    const renderQuiz = () => {
        setStatus(false)
        setPractice(arrayShuffle(words).filter((_, i) => i < 4));
    }

    //to start
    const startTask = () => {
        setPractice(arrayShuffle(words).filter((_, i) => i < 4));
    }

    let num = Math.floor(Math.random() * 4);

    const [status, setStatus] = useState(false)
    const validation = (evt) => {
        const { value } = evt.target;
        if (value === practice[num].definition) {
            setStatus(true)
        }
        if (value !== practice[num].definition) {
            setStatus(false)
            const toggler = practice.map((word) => {
                console.log('value', word)
                return {
                    ...word,
                    status: word.definition === value ? 'error' : word.status,
                }
            })
            setPractice(toggler);
        }
    }

    return (
        <div className='container'>
            <div className='match-contest'>
                <Link className='match-contest-definition__exit' to='/practice'><span className='match-contest-definition__exit__link'>Выйти из задания</span></Link>
                {practice.length > 0 ?
                    <span
                        style={status ? { color: 'yellow' } : { color: 'white' }}
                        className='match-contest__word-definition'>
                        {status ? 'Верно!' : practice[num].definition}
                    </span> : null}
                {practice.map((item, index) => {
                    return (
                        <div key={item.word}>
                            <ul className='match-contest__all-words'>
                                <li className='match-contest__one-word'>
                                    <button
                                        value={item.definition}
                                        type='button'
                                        className={`match-contest__option ${item.status}`}
                                        onClick={validation}
                                        disabled={status}
                                    >
                                        {item.word}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )
                })}
                {status === true && <button
                    className='match-contest__next-button'
                    type='button'
                    onClick={renderQuiz}
                    hidden={practice.length === 0}
                    disabled={status === false}
                >Следующий вопрос</button>}
                {practice.length === 0 ? <button
                    className='match-contest__start-button'
                    type='button'
                    onClick={startTask}
                >Старт</button> : null}
            </div>
        </div>
    )
}

// 2 практику написания слов по таймеру (спринт) сделать аналогичной для аудирования
// 2.1 как и в п. 2 только без таймера, на ограниченное количество слов, в т.ч. выбранных пользователем
// 3 практику выбора перевод-слово сделать аналогично слово-перевод
// 5 при нажатии пункта в меню - происходит перебор по 4 вариантам ответа
