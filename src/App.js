import { React } from 'react'
import { Dictionary } from './components/dictionary/dictionary'
import { Materials } from './components/materials/materials'
import { Theory } from './components/theory/theory'
import { PracticeMenu } from './components/practice/practice-menu'
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
      </div>
      <Switch>
        <Route path='/theory' component={Theory}></Route>
        <Route path='/practice' component={PracticeMenu}>
          <PracticeMenu />
        </Route>
        <Route path='/dictionary' component={Dictionary}></Route>
        <Route path='/materials' component={Materials}></Route>
      </Switch>
    </Router>
  )
}

export default App;