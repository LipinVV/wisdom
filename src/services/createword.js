import { React, useState } from 'react'
import { dictionary } from '../components/dictionary/data'
import firebase, { db } from '../services/firebase'

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
        const newDoc = await db.collection('Dictionary').add({ word: { word }, pinin: { pinin }, definition: { definition } });
        console.log('newDoc', newDoc)
    }



    // const getDictionary = async (dictionary)  => {
    //     const savedDoc = await db.collection('Dictionary').doc('CeWvdhucltTtWUV2PvAB').data()   
    //     console.log(savedDoc)
    // }

    // let docRef = db.collection("Dictionary");
    // console.log('docRef', docRef.doc('Dictionary'))
    // // console.log(docRef.get().then(x => console.log(x.data())))
    // for(let i = 0; i < docRef.lenght; i++){
    //     console.log(docRef[i].dictionary[0])
    // }

    let docRef = db.collection("Dictionary").doc('d7arKjm9OFOXP3V5ttF1');
    console.log('MAP =>', docRef)
    const getDictionary = docRef.get().then((doc) => {
        if (doc.exists) {
            return {
                word: doc.data().word,
                pinin: doc.data().pinin,
                definition: doc.data().definition,
            }
        } else {
            console.log("No such document!");
        }
    }).then(data => {
        const values = Object.values(data)
        for(let i = 0; i < values.length; i++) {
            const result = {
                word: Object.values(values[0])[0],
                pinin: Object.values(values[1])[0],
                definition: Object.values(values[2])[0],
            }
            console.log('result', result)
            return result;
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

    return (
        <div className=''>
            <button type='button' onClick={getDictionary}>GET</button>
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


