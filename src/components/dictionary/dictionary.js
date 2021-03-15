import { React, useState } from 'react'
import { dictionary } from './data'

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


    const declineNoun = count => {
        count = Math.abs(count) % 100;
        let count1 = count % 10;
        if (count > 10 && count < 20) { return 'слов'; }
        if (count1 > 1 && count1 < 5) { return 'слова'; }
        if (count1 === 1) { return 'слово'; }
        return 'слов';
    }

    return (
        <div className='container'>
            <div className='dictionary'>
                <h1 className='dictionary__header'>Ваш словарь</h1>
                [нужна сортировка по русскому алфавиту; далее - опция по формированию из выбранных слов уникального набора слов для изучения]<br/>
                [проблема №1: вводим любую букву и жмём "выбрать все" - выбираются все слова, вместо отрисованных]
                <label
                    className={globallyChecked === false ? 'dictionary__check-all-words' : 'dictionary__check-all-words dictionary__check-all-words--active'}>Выбрать все слова из списка
                    <input className='dictionary__global-checkbox'
                        type='checkbox'
                        onChange={globalHandleChanger}
                    />
                </label>
                {globallyChecked ? `Вы выбрали: ${dictionary.map(x => x).length} ${declineNoun(dictionary.map(x => x).length)}` : 
                `Вы выбрали: ${checked.length} ${declineNoun(checked.length)}`}
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