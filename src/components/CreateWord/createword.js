import { React, useState } from 'react'
import { dictionary } from '../dictionary/data'
import firebase, { db } from '../../services/firebase'

export const CreateWord = () => {

    const [word, setWord] = useState('');
    const typeWord = evt => {
        const { value } = evt.target;
        setWord(value);
    }

    const [pinin, setPinin] = useState('');
    const typePinin = evt => {
        const { value } = evt.target;
        setPinin(value);
    }


    const [definition, setDefinition] = useState('');
    const typeDefinition = evt => {
        const { value } = evt.target;
        setDefinition(value);
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
                        onChange={typeWord}
                    /></label>
                <label className='word__label'>Пиньинь
                    <input
                        type='text'
                        value={pinin}
                        onChange={typePinin}
                    /></label>
                <label className='word__label'>Определение
                    <input
                        type='text'
                        value={definition}
                        onChange={typeDefinition}
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


