import React from 'react'
import { Link } from 'react-router'

const HaveToRemember = () => {

    // получаем ключи и значения слов из localStorage            
    let keys = Object.keys(localStorage);
    let values = Object.values(localStorage);
           
    let newKeys = [];
    let newValues = [];


    for (let i = 0; i < keys.length; i++) {   
        if (keys[i].endsWith('_2')){
            newKeys.push(keys[i].slice(0, -2));
            newValues.push(values[i].slice(0, -2));            
        }
    }        


    return (
        <div className='container'>
            <div className='content'>
                <div className='buttonToMain'>
                    <Link to="/">
                        <button>На главную</button>
                    </Link>
                </div>
                <h3> Слова, которые нужно запомнить </h3>
                <div className='table'>
                    <table>
                        <thead>
                            <tr>
                                <td className='numbers'>#</td>
                                <th>Слово</th>
                                <th>Перевод</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newKeys.map((item, i) => ( 
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{item}</td>
                                    <td>{newValues[i]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default HaveToRemember