import { React, useState } from 'react'
import { dictionary } from './data'

// https://firebase.google.com/ - для хостинга базы данных с аудио
// https://vercel.com/ - хостинг для проекта
// git init - инициация репо
// git remote add origin git@github.com:LipinVV/chineese-app.git
// 

export const Dictionary = () => {

    const [search, setSearch] = useState('');

    const handleSearcher = evt => {
        const { value } = evt.target;
        setSearch(value);
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


    const declineNoun = ([one, few, many]) => count => {
        count = Math.abs(count) % 100;
        let count1 = count % 10;
        if (count > 10 && count < 20) { return many; }
        if (count1 > 1 && count1 < 5) { return few; }
        if (count1 == 1) { return one; }
        return many;
    }

    return (
        <div className='container'>
            <div className='dictionary'>
                <h1 className='dictionary__header'>Ваш словарь</h1>
                <label
                    className={globallyChecked === false ? 'dictionary__check-all-words' : 'dictionary__check-all-words dictionary__check-all-words--active'}>Выбрать все слова из списка
                    <input className='dictionary__global-checkbox'
                        type='checkbox'
                        value=''
                        onChange={globalHandleChanger}
                    />
                </label>
                {globallyChecked ? `Вы выбрали: ${dictionary.map(x => x).length}` : `Вы выбрали: ${checked.length}`}
                <input
                    className='dictionary__input'
                    type='text'
                    placeholder='Поиск по слову...'
                    onChange={handleSearcher}
                />
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
                                        checked={checked.includes(word.id) || globallyChecked}
                                        onChange={handleChanger}
                                    />
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