import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBdDn46IrDMw5nIApCV-ttOcX87Vo_pKwo",
    authDomain: "wisdom-49a72.firebaseapp.com",
    projectId: "wisdom-49a72",
    storageBucket: "wisdom-49a72.appspot.com",
    messagingSenderId: "872106722046",
    appId: "1:872106722046:web:b0bd91e461d2b06960dbaf",
    measurementId: "G-955W7ECRQV"
};

const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();

export default firebase