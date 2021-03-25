import { db } from "./firebase";
import { dictionary } from '../components/dictionary/data'

export const GetDictionary = async () => {
    const dictionaryCollection = db.collection("Dictionary");

    try {
        // const allWordsSnapShot = await dictionaryCollection.get();

        let allWords = dictionary;

        // prepare all words for client
        // allWordsSnapShot.forEach((doc) => {
        //     const unpackedWord = doc.data()
        //     allWords.push({
        //         key: doc.id,
        //         definition: unpackedWord.definition.definition,
        //         pinin: unpackedWord.pinin.pinin,
        //         word: unpackedWord.word.word,
        //     })
        // });

        const preparedAllWords = allWords.map((word, i) => {
            return {
                ...word,
                id: i + 1
            }
        })
        return preparedAllWords
    } catch (error) {
        return Promise.reject(error);
    }
}


