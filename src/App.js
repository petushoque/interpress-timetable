import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [data, setData] = useState({
    'hoursType': '',
    'totalHours': '',
    'startDate': ''
  });
  function handleAllData () {
    console.log(data)
    setData({
      'hoursType': hoursType,
      'totalHours': totalHours,
      'startDate': startDate
    })
    console.log(data)
  }

  const [hoursType, setHoursType] = useState('academic');
  function handleChangeHoursType (e) {
    setHoursType(e.target.value)
  }

  const [totalHours, setTotalHours] = useState(0)
  function handlePlusTotalHours () {
    setTotalHours(totalHours+1)
  }
  function handleMinusTotalHours () {
    if (totalHours>0) {
      setTotalHours(totalHours-1)
    }
    else {
      return totalHours
    }
  }

  let Data = new Date()
  const today = Data.toISOString().slice(0,10);
  const [startDate, setStartDate] = useState(today)

  function handleChangeStartDate (e) {
    setStartDate(e.target.value)
  }
  

  return (
    <div className="App">
      <form>
      <select name="hourstype" size="1" defaultValue='academic' onChange={handleChangeHoursType}>
      <option value="academic">Академические</option>
      <option value="astronomical">Астрономические</option>
      </select>
      </form>
      <h1>{hoursType==='academic'? 'ACADEM' : 'ASTRO'}</h1>

      <div className='total-hours'>
        <button onClick={handleMinusTotalHours}>-</button>
        <p>{totalHours}</p>
        <p>Всего часов</p>
        <button onClick={handlePlusTotalHours}>+</button>
      </div>

      <div className='dates'>
        <input value={startDate} onChange={handleChangeStartDate} type='date'/>
        <p>до</p>
        <input type='date'/>
      </div>




<button onClick={handleAllData}>ОТПРАВИТЬ</button>
      </div>
    
  );
}

export default App;
