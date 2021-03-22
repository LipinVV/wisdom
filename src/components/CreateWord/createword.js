import { React, useState } from 'react'
import { dictionary } from '../dictionary/data'
import firebase, { db } from '../../services/firebase'

export const CreateWord = () => {

    const [word, setWord] = useState('');
    const [pinin, setPinin] = useState('');
    const [definition, setDefinition] = useState('');

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
    }

    return (
        <div className=''>
            <form className='word__creator'>
                <label className='word__label'>Слово
                    <input
                        type='text'
                        value={word}
                        onChange={() => setWord()}
                    /></label>
                <label className='word__label'>Пиньинь
                    <input
                        type='text'
                        value={pinin}
                        onChange={() => setPinin()}
                    /></label>
                <label className='word__label'>Определение
                    <input
                        type='text'
                        value={definition}
                        onChange={() => setDefinition()}
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


