import { db } from "./firebase";

export const GetDictionary = async () => {
    const dictionaryCollection = db.collection("Dictionary");

    try {
        const allWordsSnapShot = await dictionaryCollection.get();

        let allWords = [];

        // prepare all words for client
        allWordsSnapShot.forEach((doc) => {
            const unpackedWord = doc.data()
            allWords.push({
                key: doc.id,
                definition: unpackedWord.definition.definition,
                pinin: unpackedWord.pinin.pinin,
                word: unpackedWord.word.word,
            })
        });

        allWords.map((word, i) => [...allWords, word.id = i + 1]);
        return allWords;
    } catch (error) {
        return Promise.reject(error);
    }
}


