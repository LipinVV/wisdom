import { React, useState } from 'react'
import { dictionary } from './data'

// https://firebase.google.com/ - для хостинга базы данных с аудио
// https://vercel.com/ - хостинг для проекта
// git init - инициация репо
// git remote add origin git@github.com:LipinVV/chineese-app.git
// 

export const Dictionary = () => {

    const [search, setSearch] = useState('');

    const handleSearcher = (evt) => {
        const { value } = evt.target;
        setSearch(value);
    }

    const [checked, setChecked] = useState([]);

    const handleChanger = evt => {
        const { value } = evt.target;
        setChecked(prevState => {
            if (prevState.includes(value)) {
                return prevState.filter(element => element !== value)
            } else {
                return [...prevState, Number(value)]
            }
        })
    }

    return (
        <div className='container'>
            <div className='dictionary'>
                [показать кол-во совпадений, аудиофайл слов]
            <h1 className='dictionary__header'>Ваш словарь</h1>

                <input
                    className='dictionary__input'
                    type='text'
                    placeholder='Поиск по слову...'
                    onChange={handleSearcher}
                >
                </input>
                {dictionary
                    .filter((value) => {
                        if (search === '') {
                            return value;
                        }
                        if (Number(search) === value.id) {
                            return value;
                        }
                        else if (value.definition.toLowerCase().includes(search.toLowerCase()) ||
                            value.word.toLowerCase().includes(search.toLowerCase())) {
                            return value;
                        }
                    })
                    .length === 0 ?
                    <div className='dictionary__message'>По вашему запросу ничего не найдено</div>
                    : dictionary
                        .filter((value) => {
                            if (search === '') {
                                return value;
                            }
                            if (Number(search) === value.id) {
                                return value;
                            }
                            else if (value.definition.toLowerCase().includes(search.toLowerCase()) ||
                                value.word.toLowerCase().includes(search.toLowerCase())) {
                                return value;
                            }
                        })
                        .map((word) => (
                            <ul className='dictionary__list' key={word.id}>
                                <li className='dictionary__checkbox'>
                                    <input
                                        type='checkbox'
                                        value={word.id}
                                        checked={checked.includes(word.id)}
                                        onChange={handleChanger}
                                    >
                                    </input>
                                </li>
                                <li className='dictionary__id'>{word.id}</li>
                                <li className='dictionary__word'>{word.word}</li>
                                <li className='dictionary__pinin'>{word.pinin}</li>
                                <li className='dictionary__definition'>{word.definition}</li>
                            </ul>
                        ))
                }
            </div>
        </div>
    )
}