import {db} from "./firebase";

const getDictionary = async () => {
    const dictionaryCollection = db.collection("Dictionary")

    try {
        const allWordsSnapShot = await dictionaryCollection.get()

        let allWords = []

        // prepare all words for client
        allWordsSnapShot.forEach((doc) => {
            const unpackedWord = doc.data()
            allWords.push({
                id: doc.id,
                definition: unpackedWord.definition.definition,
                pinin: unpackedWord.pinin.pinin,
                word: unpackedWord.word.word,
            })
        })

        return allWords

    } catch (error) {
        return Promise.reject(error)
    }
}

export {getDictionary}
