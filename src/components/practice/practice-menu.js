import { React } from 'react'
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom'

export const PracticeMenu = () => {
    // contest sub-menu
    // перенос switch в отдельный
    return (
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
    )
}