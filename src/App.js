import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  //СБОР ВСЕХ ДАННЫХ ДЛЯ ОТПРАВКИ НА СЕРВЕР
  const [data, setData] = useState({
    'hours-type': '',
    'total-hours': '',
    'start-date': '',
    'day-of-visits': '',
    'recreation-time': '',
    'hours-per-day': '',
    'start-time': ''
  });
  function handleAllData () {
    setData({
      'hours-type': hoursType,
      'total-hours': totalHours,
      'start-date': startDate,
      'day-of-visits': visits,
      'recreation-time': recreation,
      'hours-per-day': hoursPerDay,
      'start-time': startTime
    })
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

  const [recreation, setRecreation] = useState(0);
  function handleChangeRecreationTime (e) {
    setRecreation(e.target.value)
  }

  const [hoursPerDay, setHoursPerDay] = useState(0)
  function handlePlusHoursPerDay () {
    if (hoursPerDay < totalHours) {
      setHoursPerDay(hoursPerDay+1)
    }
    else {
      return hoursPerDay
    }
  }
  function handleMinusHoursPerDay () {
    if (hoursPerDay>0) {
      setHoursPerDay(hoursPerDay-1)
    }
    else {
      return hoursPerDay
    }
  }

  const [startTime, setStartTime] = useState('07:00')
  function handleChangeStartTime (e) {
    setStartTime(e.target.value)
  }

  return (
    <div className="App">
      <form>
      <select name="hourstype" size="1" defaultValue='academic' onChange={handleChangeHoursType}>
      <option value="academic">Академические</option>
      <option value="astronomical">Астрономические</option>
      </select>
      </form>

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

      <div className='recreation'>
      <form>
      <select name='recreation-time' size="1" defaultValue={recreation} onChange={handleChangeRecreationTime}>
      <option value='0'>Без перерыва</option>
      <option value='5'>5 минут</option>
      <option value='10'>10 минут</option>
      <option value='15'>15 минут</option>
      <option value='20'>20 минут</option>
      <option value='25'>25 минут</option>
      <option value='30'>30 минут</option>
      </select>
      </form>
      </div>

      <div className='hours-per-day'>
        <button onClick={handleMinusHoursPerDay}>-</button>
        <p>{hoursPerDay}</p>
        <p>Часов в день</p>
        <button onClick={handlePlusHoursPerDay}>+</button>
      </div>

      <div className='times'>
        <input onChange={handleChangeStartTime} value={startTime} type='time'/>
        <p>до</p>
        <input type='time'/>
      </div>


      <button onClick={handleAllData}>Применить</button>
      <button onClick={() => console.log(data)}>Показать данные в консоли</button>
      </div>
    
  );
}

export default App;
