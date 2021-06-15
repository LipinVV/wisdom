import { React } from 'react'
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom'
import './PracticeMenu.css'

export const PracticeMenu = () => {
    // contest sub-menu
    // перенос switch в отдельный
    return (
        <div className='container'>
            <nav className='practice-navigation'>
                <ul className='practice-navigation__menu'>
                    <li className='practice-navigation__menu__section'><Link to='/type-contest'>Письменный спринт</Link></li>
                    <li className='practice-navigation__menu__section'><Link to='/audio-contest'>Аудирование</Link></li>
                    <li className='practice-navigation__menu__section'><Link to='/match-definition-contest'>Перевод-слово</Link></li>
                    <li className='practice-navigation__menu__section'><Link to='/word-definition-contest'>Слово-перевод</Link></li>
                </ul>
            </nav>
        </div>
    )
}