import React, { useEffect, useState } from 'react'
import { getDictionary } from '../../../../services/dictionary';
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom'


export const PracticeWordMatching = () => {
    return (
        <div className='container'>
            <Link className='match-contest-word__exit' to='/practice'><span className='match-contest-word__exit__link'>Выйти из задания</span></Link>
        </div>
    )
}