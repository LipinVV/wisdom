import React from 'react'
import { Dictionary } from './components/dictionary/dictionary'
import { Materials } from './components/materials/materials'
import { Practice } from './components/practice/practice'
import { Theory } from './components/theory/theory'
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom'


function App() {
  return (
    <Router>
      <div className='container'>
        <nav className='app__navigation'>
          <ul className='app__menu'>
            <li className='app__section'><Link to='/theory'>Теория</Link></li>
            <li className='app__section'><Link to='/practice'>Практика</Link></li>
            <li className='app__section'><Link to='/dictionary'>Словарь</Link></li>
            <li className='app__section'><Link to='/materials'>Материалы</Link></li>
          </ul>
        </nav>
          {/* <!-- The core Firebase JS SDK is always required and must be listed first -->
          <script src="https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js"></script>

          <!-- TODO: Add SDKs for Firebase products that you want to use
              https://firebase.google.com/docs/web/setup#available-libraries -->
          <script src="https://www.gstatic.com/firebasejs/8.3.0/firebase-analytics.js"></script>

          <script>
            // Your web app's Firebase configuration
            // For Firebase JS SDK v7.20.0 and later, measurementId is optional
            var firebaseConfig = {
              apiKey: "AIzaSyBdDn46IrDMw5nIApCV-ttOcX87Vo_pKwo",
              authDomain: "wisdom-49a72.firebaseapp.com",
              projectId: "wisdom-49a72",
              storageBucket: "wisdom-49a72.appspot.com",
              messagingSenderId: "872106722046",
              appId: "1:872106722046:web:b0bd91e461d2b06960dbaf",
              measurementId: "G-955W7ECRQV"
            };
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            firebase.analytics();
           </script> */}
      </div>
      <Switch>
        <Route path='/theory' component={Theory}></Route>
        <Route path='/practice' component={Practice}></Route>
        <Route path='/dictionary' component={Dictionary}></Route>
        <Route path='/materials' component={Materials}></Route>
      </Switch>
    </Router>
  )
}

export default App;