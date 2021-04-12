import { React, useState } from 'react'
import { dictionary } from '../Dictionary/data'
import firebase, { db } from '../../Services/firebase'
import { storage } from '../../Services/firebase'
import './Createword.css'

export const CreateWord = () => {

    const [word, setWord] = useState('');
    const [pinin, setPinin] = useState('');
    const [definition, setDefinition] = useState('');
    const [audioUrl, setAudioUrl] = useState('');

    const clearHandler = () => {
        setWord('');
        setPinin('');
        setDefinition('');
    }

    // подключение к БД 
    const uploadDictionary = async (dictionary) => {
        const preparedWord = {
            word: { word },
            pinin: { pinin },
            definition: { definition },
            audioUrl: { audioUrl }
        }
        const newDoc = await db.collection('Dictionary').add(preparedWord);
    }

    const uploadFile = async (evt) => {
        const { files } = evt.target;
        const snapshotRef = storage.child(`/audio/${files[0].name}`)
        const snapshot = await snapshotRef.put(files[0])
        const fileUrl = await snapshot.ref.getDownloadURL();
        // токен нужно откорректировать
        const {origin, pathname} = new URL(fileUrl);
        const preparedAudioUrl = `${origin}${pathname}?alt=media`
        setAudioUrl(preparedAudioUrl)
    }

    return (
        <div className=''>
            <form className='word__creator'>
                <label className='word__label'>Слово
                    <input
                        type='text'
                        value={word}
                        onChange={(evt) => setWord(evt.target.value)}
                    /></label>
                <label className='word__label'>Пиньинь
                    <input
                        type='text'
                        value={pinin}
                        onChange={(evt) => setPinin(evt.target.value)}
                    /></label>
                <label className='word__label'>Определение
                    <input
                        type='text'
                        value={definition}
                        onChange={(evt) => setDefinition(evt.target.value)}
                    /></label>
                <label>
                    <input
                        type='file'
                        onChange={uploadFile}
                    />
                </label>
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


