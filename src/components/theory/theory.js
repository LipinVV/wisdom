import React from 'react'
import { Lesson } from './lesson'
import './theory.css'

export const Theory = () => {

    return (
        <div className='theory'>
            [плитка кнопок с уроками(справа или слева от кнопок - иконки), при нажатии уходим в раздел, в разделе есть кнопка "назад"]
            <Lesson />
        </div>
    )
}
