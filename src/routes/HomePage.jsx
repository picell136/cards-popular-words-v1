import React, { useState } from 'react'
import { Link } from 'react-router'

const HomePage = ({ arrWords, arrTranslate }) => {

  let words = arrWords;
  let translate = arrTranslate;

  const [start, setStart] = useState(false);

  const [random, setRandom] = useState(shuffle());
  const [engWord, setEngWord] = useState(words[random]);
  const [rusWord, setRusWord] = useState('');  

  const [iKnow, setIKnow] = useState(false);  
  const [int, setInt] = useState();

  // получаем ключи и значения слов из localStorage           
  let keys = Object.keys(localStorage);
  let values = Object.values(localStorage);

  let newKeys = [];
  let newValues = [];

  for (let i = 0; i < keys.length; i++) {     // Берем слова которые "Я знаю" и добавляем в массивы newKeys и newValues
    if (keys[i].endsWith('_1')){
        newKeys.push(keys[i].slice(0, -2));
        newValues.push(values[i].slice(0, -2));            
    }
  }     

  //

  function shuffle() {
    return Math.floor(Math.random() * ((1000 - 1) - 0 + 1)) + 0   // рандомайзер 1
  }
  
  function shuffle2() {
    return Math.floor(Math.random() * ((newKeys.length - 1) - 0 + 1)) + 0   // рандомайзер 2
  }  

  // Функция-примешивание запомненных слов к основным, чтобы проверить, не забыл ли пользователь их
  function addToArrays() {
    let randomInt_2 = shuffle2();
    if (!newKeys.length){
      return;
    } else if (words.includes(newKeys[randomInt_2])) {
      return;
    } else {
      words.push(newKeys[randomInt_2])
      translate.push(newValues[randomInt_2])
    }
  }

  // Кнопка "Я знаю"
  function clickHandler1() {

    setRusWord('')
    setIKnow(true)

    if (!start) {
      setStart(true)
      let randomInt = shuffle()
      setEngWord(words[randomInt])
      setInt(randomInt)   
      localStorage.setItem(`${words[random]}_1`, `${translate[random]}_1`)
      let index = words.indexOf(random);
      if (index > -1) {         // срабатывает splice если элемент найден
        words.splice(index, 1); 
        translate.splice(index, 1); // удаляем слово и перевод из массивов
      }

      // добавляем в массивы слово из "Я знаю"
      addToArrays();

    } else if (start) {
      let randomInt = shuffle()
      setEngWord(words[randomInt])
      setInt(randomInt)
      localStorage.setItem(`${words[int]}_1`, `${translate[int]}_1`) 
      let index = words.indexOf(int);
      if (index > -1) {         // срабатывает splice если элемент найден
        words.splice(index, 1);
        translate.splice(index, 1);  // удаляем слово и перевод из массивов
      } 
      
      // добавляем в массивы слово из "Я знаю"
      addToArrays();

    }
  }


  // Кнопка "Я не знаю"
  function clickHandler2() {

    if (iKnow){ 
      setRusWord(translate[int]) 
      localStorage.setItem(`${words[int]}_2`, `${translate[int]}_2`)
      // добавляем в массивы слово из "Я знаю"
      addToArrays();

    } else if (!iKnow || iKnow === null) { 
      setRusWord(translate[random])
      localStorage.setItem(`${words[random]}_2`, `${translate[random]}_2`)  
      // добавляем в массивы слово из "Я знаю"
      addToArrays();
    }

    document.getElementById('button_1').style.visibility = 'hidden';
    document.getElementById('button_2').style.visibility = 'hidden';
    document.getElementById('button_3').style.visibility = 'visible';
  }


  // скрытая кнопка "Далее"
  function clickHandler3() {
    let randomInt = shuffle()
    setRandom(randomInt)
    setEngWord(words[randomInt])
    setRusWord('')

    setIKnow(null)

    document.getElementById('button_1').style.visibility = 'visible';
    document.getElementById('button_2').style.visibility = 'visible';
    document.getElementById('button_3').style.visibility = 'hidden';
  }

  function resetButton() {  // сброс данных локального хранилища
    localStorage.clear();
  }

  function memorizedWords() {
    let obj = {}  // объект (с данными из локал. хранилища) со словами, которые надо выучить 

    // получаем ключи и значения слов            
    let keys = Object.keys(localStorage);
    let values = Object.values(localStorage);

    // создаем объект со словами, которые надо выучить              
    for (let i = 0; i < keys.length; i++) {   
        obj[keys[i]] = values[i]
    }
  }

  return (
    <div className='container'>
      <div className='content'>
        <div className='main-content'>

          <div className='engWord'>
            <h2>{engWord}</h2>
          </div>
      
          <div className='buttons'>
              <button onClick={clickHandler1} id="button_1">Я знаю</button>
              <button onClick={clickHandler2} id="button_2">Я не знаю</button>
              <button onClick={clickHandler3} id="button_3" style={{visibility: 'hidden'}}>Далее</button>
          </div>

          <div className='rusWord'>
            <h3>{rusWord}</h3>
          </div>
        </div>

        <div>
          <Link to="./memorizedWords">
            <button type="submit" onClick={memorizedWords}>Слова, которые знаю</button>
          </Link>
        </div>

        <div>
          <Link to="./haveToRemember" >
            <button type="submit">Слова, которые НЕ знаю</button>
          </Link>
        </div> 

        <div>
          <Link to="./AllWords">
            <button id="button_6">Все слова</button>
          </Link>
        </div>

        <div className='resetButton'>
            <button type="submit" onClick={resetButton} id="button_7">Сброс сохр. слов</button>
        </div>

      </div>
    </div>
  )
}

export default HomePage