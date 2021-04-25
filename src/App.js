import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [data, setData] = useState({
    'hours-type': '',
    'total-hours': '',
    'start-date': '',
    'end-date': '',
    'day-of-visits': '',
    'recreation-time': '',
    'hours-per-day': '',
    'start-time': '',
    'end-time': '',
    'teacher': '',
    'room': '',
  });
  function handleAllData () {
    setData({
      'hours-type': hoursType,
      'total-hours': totalHours,
      'start-date': startDate,
      'end-date': endDate,
      'day-of-visits': visits,
      'recreation-time': recreation,
      'hours-per-day': hoursPerDay,
      'start-time': startTime,
      'end-time': endTime,
      'teacher': teacher,
      'room': room
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

  let NewDate = new Date()
  const today = NewDate.toISOString().slice(0,10);
  const [startDate, setStartDate] = useState(today)

  function handleChangeStartDate (e) {
    setStartDate(e.target.value)
  }

//РАСЧЕТ ДАТЫ ОКОНЧАНИЯ ОБУЧЕНИЯ

const [endDate, setEndDate] = useState(today)

function endDateFunc () {
  if (totalHours!==0 && hoursPerDay!==0 && 
    (visits.mo && visits.tu && visits.we && visits.th && visits.fr && visits.sa && visits.su)!==0 ) 
    
    
    {

  let start = new Date(startDate);
  let daysCount = Math.ceil(totalHours/hoursPerDay);
  let days = [
    'su',
    'mo',
    'tu',
    'we',
    'th',
    'fr',
    'sa'
  ];
  let dateForCounter = start;
  let counter = daysCount;

  //чиcтит баг, с выбранными датой, количеством часов и пустым полем дней недели
  if (!(visits.mo || visits.tu || visits.we || visits.th || visits.fr || visits.sa || visits.su))
  {
    counter=0;
  }

  while (counter > 0) {
    let dayOfWeek = days[dateForCounter.getDay()];    
    if (visits[dayOfWeek]) {
      counter = counter-1;
    }
    dateForCounter = new Date(dateForCounter.setDate(dateForCounter.getDate() + 1))
  }
  let result = new Date(dateForCounter.setDate(dateForCounter.getDate()) -1)
  setEndDate(result.toISOString().slice(0,10))
  }
  else {
    setEndDate(today)
  }
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
    setVisits({...visits, mo: true, tu: false, we: true, th: false, fr: true, sa: false, su: false});
  }
  function handleChangeTuTh () {
    setVisits({...visits, mo: false, tu: true, we: false, th: true, fr: false, sa: false, su: false});
  }

  function handleChangeMonday () {
    visits.mo === true ? setVisits({...visits, mo: false}) : setVisits({...visits, mo: true});
  }
  function handleChangeTuesday () {
    visits.tu === true ? setVisits({...visits, tu: false}) : setVisits({...visits, tu: true});
  }
  function handleChangeWednesday () {
    visits.we === true ? setVisits({...visits, we: false}) : setVisits({...visits, we: true});
  }
  function handleChangeThursday () {
    visits.th === true ? setVisits({...visits, th: false}) : setVisits({...visits, th: true});
  }
  function handleChangeFriday () {
    visits.fr === true ? setVisits({...visits, fr: false}) : setVisits({...visits, fr: true});
  }
  function handleChangeSaturday () {
    visits.sa === true ? setVisits({...visits, sa: false}) : setVisits({...visits, sa: true});
  }
  function handleChangeSunday () {
    visits.su === true ? setVisits({...visits, su: false}) : setVisits({...visits, su: true});
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

  useEffect(() => {
    if (startDate)
      handleChangeEndTime ()
  }, [hoursType, startTime, hoursPerDay, recreation])

  useEffect(() => {
    if (startTime)
      endDateFunc()
  }, [startDate, totalHours, hoursPerDay, visits])


  const [endTime, setEndTime] = useState('07:00')
  function handleChangeEndTime () {
    let arr = (startTime.split(':'))
    let educTime = 45 * (Number.parseInt(hoursPerDay))
    let educTimeAstro = 60 * (Number.parseInt(hoursPerDay))
    let recTime = Number.parseInt(recreation)
    let minutesAtStart = (Number.parseInt(arr[0]) * 60) + Number.parseInt(arr[1]);
    if (hoursType==='academic') {
      let minutesAtFinish = minutesAtStart + educTime + recTime;
      let hours = Math.floor(minutesAtFinish/60);
      if (hours < 10) {
        hours = `0${hours}`
      }
      let minutes = minutesAtFinish % 60;
      if (minutes < 10) {
        minutes = `0${minutes}`
      }
      let result = `${hours}:${minutes}`
      setEndTime(result)      
    }
    if (hoursType==='astronomical') {
      let minutesAtFinish = minutesAtStart + educTimeAstro + recTime;
      let hours = Math.floor(minutesAtFinish/60);
      if (hours < 10) {
        hours = `0${hours}`
      }
      let minutes = minutesAtFinish % 60;
      if (minutes < 10) {
        minutes = `0${minutes}`
      }
      let result = `${hours}:${minutes}`
      setEndTime(result)      
    }
  }





  const [teacher, setTeacher] = useState('');
  function handleChangeTeacher (e) {
    setTeacher(e.target.value)
  }

  const [room, setRoom] = useState('');
  function handleChangeRoom (e) {
    setRoom(e.target.value)
  }

  return (
    <div className='App'>

      <select className='hours-type' name="hourstype" size="1" defaultValue='academic' onChange={handleChangeHoursType}>
      <option value="academic">Академические</option>
      <option value="astronomical">Астрономические</option>
      </select>

      <div className='total-hours'>
        <button className='total-hours__button-minus' onClick={handleMinusTotalHours}>-</button>
        <p className='total-hours__digit'>{totalHours}</p>
        <p className='total-hours__paragraph'>Всего часов</p>
        <button className='total-hours__button-plus' onClick={handlePlusTotalHours}>+</button>
      </div>

      <div className='dates'>
        <input className='dates__input' value={startDate} onChange={handleChangeStartDate} type='date'/>
        <p className='dates__paragraph'>до</p>
        <input className='dates__input' value={endDate} type='date' readOnly/>
      </div>
      
      <div className='schedule-of-visits'>
          <button className='day-of-visits' onClick={handleChangeMnWeFr}>ПН/СР/ПТ</button>
          <button className='day-of-visits' onClick={handleChangeTuTh}>ВТ/ЧТ</button>
          <button className={visits.mo? 'day-of-visits_active' : 'day-of-visits'} onClick={handleChangeMonday}>ПН</button>
          <button className={visits.tu? 'day-of-visits_active' : 'day-of-visits'} onClick={handleChangeTuesday}>ВТ</button>
          <button className={visits.we? 'day-of-visits_active' : 'day-of-visits'} onClick={handleChangeWednesday}>СР</button>
          <button className={visits.th? 'day-of-visits_active' : 'day-of-visits'} onClick={handleChangeThursday}>ЧТ</button>
          <button className={visits.fr? 'day-of-visits_active' : 'day-of-visits'} onClick={handleChangeFriday}>ПТ</button>
          <button className={visits.sa? 'day-of-visits_active' : 'day-of-visits'} onClick={handleChangeSaturday}>СБ</button>
          <button className={visits.su? 'day-of-visits_active' : 'day-of-visits'} onClick={handleChangeSunday}>ВС</button>
      </div>

      <select className='recreation-time' name='recreation-time' size="1" defaultValue={recreation} onChange={handleChangeRecreationTime}>
      <option value='0'>Без перерыва</option>
      <option value='5'>5 минут</option>
      <option value='10'>10 минут</option>
      <option value='15'>15 минут</option>
      <option value='20'>20 минут</option>
      <option value='25'>25 минут</option>
      <option value='30'>30 минут</option>
      </select>

      <div className='hours-per-day'>
        <button className='hours-per-day__button-minus' onClick={handleMinusHoursPerDay}>-</button>
        <p className='hours-per-day__digit'>{hoursPerDay}</p>
        <p className='hours-per-day__paragraph'>Часов в день</p>
        <button className='hours-per-day__button-plus' onClick={handlePlusHoursPerDay}>+</button>
      </div>

      <div className='times'>
        <input className='times__input' onChange={handleChangeStartTime} value={startTime} type='time'/>
        <p className='times__paragraph'>до</p>
        <input className='times__input' type='time' value={endTime} readOnly/>
      </div>

      <select className='teacher-name' name="teachername" size="1" defaultValue='' onChange={handleChangeTeacher}>
      <option value="">Выберите преподавателя на это время</option>
      <option value="ivanov">Иванов Иван</option>
      <option value="petrov">Петров Петр</option>
      <option value="reeves">Киану Ривз</option>
      </select>

      <select className='room' name="room" size="1" defaultValue='' onChange={handleChangeRoom}>
      <option value="">Аудитория</option>
      <option value="001">001</option>
      <option value="002">002</option>
      <option value="003">003</option>
      </select>


      <button className='console-button' onClick={handleAllData}>Применить</button>
      <button className='console-button' onClick={() => console.log(data)}>Показать данные в консоли</button>

      </div>
    
  );
}

export default App;
