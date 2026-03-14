import React from 'react'
import { Link } from 'react-router'

const AllWords = ({ arrWords, arrTranslate }) => {

    return (
        <div className='container'>
            <div className='content'>
                <div className='buttonToMain'>
                    <Link to="/">
                        <button>На главную</button>
                    </Link>
                </div>
                <div className='table'>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Слово</th>
                                <th>Перевод</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrWords.map((item, i) => ( 
                                <tr key={i}>
                                    <td className='numbers'>{i+1}</td>
                                    <td>{item}</td>
                                    <td>{arrTranslate[i]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AllWords