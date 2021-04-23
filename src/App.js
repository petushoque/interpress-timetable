import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  //СБОР ВСЕХ ДАННЫХ ДЛЯ ОТПРАВКИ НА СЕРВЕР
  const [data, setData] = useState({
    'hoursType': '',
    'totalHours': '',
    'startDate': '',
    'day-of-visits': ''
  });
  function handleAllData () {
    setData({
      'hoursType': hoursType,
      'totalHours': totalHours,
      'startDate': startDate,
      'day-of-visits': visits
    })
    console.log(data)
  }

  //Состояние типа часов, академические/астрономические
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

  const [visits, setVisits] = useState({
    mo: false,
    tu: false,
    we: false,
    th: false,
    fr: false,
    sa: false,
    su: false,
  })
  
  function handleChangeMnWeFr () {
    setVisits({...visits, mo: true, tu: false, we: true, th: false, fr: true, sa: false, su: false})
  }
  function handleChangeTuTh () {
    setVisits({...visits, mo: false, tu: true, we: false, th: true, fr: false, sa: false, su: false})
  }

  function handleChangeMonday () {
    visits.mo === true ? setVisits({...visits, mo: false}) : setVisits({...visits, mo: true})
  }
  function handleChangeTuesday () {
    visits.tu === true ? setVisits({...visits, tu: false}) : setVisits({...visits, tu: true})
  }
  function handleChangeWednesday () {
    visits.we === true ? setVisits({...visits, we: false}) : setVisits({...visits, we: true})
  }
  function handleChangeThursday () {
    visits.th === true ? setVisits({...visits, th: false}) : setVisits({...visits, th: true})
  }
  function handleChangeFriday () {
    visits.fr === true ? setVisits({...visits, fr: false}) : setVisits({...visits, fr: true})
  }
  function handleChangeSaturday () {
    visits.sa === true ? setVisits({...visits, sa: false}) : setVisits({...visits, sa: true})
  }
  function handleChangeSunday () {
    visits.su === true ? setVisits({...visits, su: false}) : setVisits({...visits, su: true})
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
      
      <div className='schedule-of-visits'>
          <button onClick={handleChangeMnWeFr}>ПН/СР/ПТ</button>
          <button onClick={handleChangeTuTh}>ВТ/ЧТ</button>
          <button className={visits.mo? 'day-of-visits_active' : 'day-of-visits'} onClick={handleChangeMonday}>ПН</button>
          <button className={visits.tu? 'day-of-visits_active' : 'day-of-visits'} onClick={handleChangeTuesday}>ВТ</button>
          <button className={visits.we? 'day-of-visits_active' : 'day-of-visits'} onClick={handleChangeWednesday}>СР</button>
          <button className={visits.th? 'day-of-visits_active' : 'day-of-visits'} onClick={handleChangeThursday}>ЧТ</button>
          <button className={visits.fr? 'day-of-visits_active' : 'day-of-visits'} onClick={handleChangeFriday}>ПТ</button>
          <button className={visits.sa? 'day-of-visits_active' : 'day-of-visits'} onClick={handleChangeSaturday}>СБ</button>
          <button className={visits.su? 'day-of-visits_active' : 'day-of-visits'} onClick={handleChangeSunday}>ВС</button>
      </div>




      <button onClick={handleAllData}>ОТПРАВИТЬ</button>
      </div>
    
  );
}

export default App;
