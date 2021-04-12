import { React } from 'react'
import { Dictionary } from './components/dictionary/dictionary'
import { Materials } from './components/materials/materials'
import { Theory } from './components/theory/theory'
import { PracticeMenu } from './components/Practice/PracticeMenu/PracticeMenu'
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom'
import { PracticeTypeMaraphon } from './components/Practice/PracticeType/PracticeType'
import { PracticeDefinitionMatching } from './components/Practice/PracticeMatching/PracticeMatchingDefinition/PracticeMatchingDefinition'
import { PracticeWordMatching } from './components/Practice/PracticeMatching/PracticeMatchingWord/PracticeMatchingWord'
import { PracticeAudioMatching } from './components/Practice/PracticeAudio/PracticeAudio';
import { Audio } from './components/Audioz/audio';
import './app.css'

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
      </div>
      <Switch>
        <Route path='/theory' component={Theory}></Route>
        <Route path='/practice' component={PracticeMenu}>
          <PracticeMenu />
        </Route>
        <Route exact path='/type-contest' component={PracticeTypeMaraphon}></Route>
        <Route exact path='/match-definition-contest' component={PracticeDefinitionMatching}></Route>
        <Route exact path='/word-definition-contest' component={PracticeWordMatching}></Route>
        <Route exact path='/audio-contest' component={PracticeAudioMatching}></Route>
        <Route path='/dictionary' component={Dictionary}></Route>
        <Route path='/materials' component={Materials}>
          <Audio />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
