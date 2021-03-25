import { React } from 'react'
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom'
import { PracticeTypeMaraphon } from './practice-type/practice-type'
import { PracticeMatching } from './practice-matching/practice-matching'

export const PracticeMenu = () => {

    return (
        <Router>
            <div className='container'>
                <nav className='practice-navigation'>
                    <ul className='practice-navigation__menu'>
                        <li className='practice-navigation__menu__section'><Link to='/type-contest'>Письменный спринт</Link></li>
                        <li className='practice-navigation__menu__section'><Link to='/audio-contest'>Аудирование</Link></li>
                        <li className='practice-navigation__menu__section'><Link to='/match-contest'>Слово-перевод</Link></li>
                        <li className='practice-navigation__menu__section'><Link to='/dictionary'>Перевод-слово</Link></li>
                        
                    </ul>
                </nav>
            </div>
            <Switch>
                <Route path='/type-contest' component={PracticeTypeMaraphon}></Route>
                <Route path='/match-contest' component={PracticeMatching}></Route>
                {/* <Route path='/dictionary' component={Dictionary}></Route>
                <Route path='/materials' component={Materials}></Route> */}
            </Switch>
        </Router>
    )
}