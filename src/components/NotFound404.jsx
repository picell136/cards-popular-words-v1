import React from 'react'
import { Link } from 'react-router'

const NotFound = () => {
  return (
    <div className='container'>
      <div className='content'>
        <h2>Такой страницы нет</h2>
        <div className='buttonToMain'>
            <Link to="/">
                <button>На главную</button>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound