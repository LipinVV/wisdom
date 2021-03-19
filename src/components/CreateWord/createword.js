import { React, useState } from 'react'
import { dictionary } from '../dictionary/data'
import firebase, { db } from '../../services/firebase'

export const CreateWord = () => {

    const [word, setWord] = useState('');
    const [pinin, setPinin] = useState('');
    const [definition, setDefinition] = useState('');


    const hanldeOne = evt => {
        const { value } = evt.target;
        setDefinition(value);
        setPinin(value);
        setWord(value);
    }

    const clearHandler = () => {
        setWord('');
        setPinin('');
        setDefinition('');
    }


    // подключение к БД 
    const uploadDictionary = async (dictionary) => {
        const newDoc = await db.collection('Dictionary').add(
            {
                word: { word },
                pinin: { pinin },
                definition: { definition }
            });
        console.log('newDoc', newDoc)
    }


    return (
        <div className=''>
            <form className='word__creator'>
                <label className='word__label'>Слово
                    <input
                        type='text'
                        value={word}
                        onChange={hanldeOne}
                    /></label>
                <label className='word__label'>Пиньинь
                    <input
                        type='text'
                        value={pinin}
                        onChange={hanldeOne}
                    /></label>
                <label className='word__label'>Определение
                    <input
                        type='text'
                        value={definition}
                        onChange={hanldeOne}
                    /></label>
            </form>
            <button
                type='button'
                onClick={() => uploadDictionary(dictionary)}
            >UploadDictionary
                </button>
            <button
                type='button'
                onClick={clearHandler}
            >Clear</button>
        </div>
    )
}


