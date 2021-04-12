import React, { useEffect, useState } from 'react'
import { getDictionary } from '../../../../Services/dictionary';
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom'
import './PracticeMatchingWord.css'

export const PracticeWordMatching = () => {
    return (
        <div className='container'>
            <Link className='match-contest-word__exit' to='/practice'><span className='match-contest-word__exit__link'>Выйти из задания</span></Link>
        </div>
    )
}