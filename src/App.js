import './App.css';
import { useState, useEffect } from 'react';

import Header from './components/Header'
import SelectList from './components/SelectList'
import Counter from './components/Counter'
import Timer from './components/Timer'

function App() {

  let NewDate = new Date()
  const today = NewDate.toISOString().slice(0,10);

  const [data, setData] = useState({
    'hours-type': '',
    'total-hours': 0,
    'start-date': today,
    'end-date': today,
    'day-of-visits': {    
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false,},
    'recreation-time': 0,
    'hours-per-day': 0,
    'start-time': '07:00',
    'end-time': '07:00',
    'teacher': '',
    'room': '',
  });


  function handleChangeHoursType (e) {
    setData({...data, 'hours-type': e.target.value})
  }
  function handlePlusTotalHours () {
    setData({...data, 'total-hours': data['total-hours']+1})
  }
  function handleMinusTotalHours () {
    if (data['total-hours']>0) {
      setData({...data, 'total-hours': data['total-hours']-1})
    }
    else {
      return data['total-hours']
    }
  }

  function handleChangeStartDate (e) {
    setData({...data, 'start-date': e.target.value})
  }


function endDateFunc () {
  if (data['total-hours']!==0 && data['hours-per-day']!==0 && 
    (visits.mo && visits.tu && visits.we && visits.th && visits.fr && visits.sa && visits.su)!==0 )     
    
    {


  let start = new Date(data['start-date']);
  let daysCount = Math.ceil(data['total-hours']/data['hours-per-day']);
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
  const result = (new Date(dateForCounter.setDate(dateForCounter.getDate()) -1)).toISOString().slice(0,10)
  setData({...data, 'end-date': result})

  }
  else {
    setData({...data, 'end-date': today})
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

  function handleChangeRecreationTime (e) {
    setData({...data, 'recreation-time': e.target.value})
  }


  function handlePlusHoursPerDay () {
    if (data['hours-per-day'] < data['total-hours']) {
      const replacement = data['hours-per-day'] + 1
      setData({...data, 'hours-per-day': replacement})
      
    }
    else {
      return
      //return data['hours-per-day']
    }
  }

  function handleMinusHoursPerDay () {
    if (data['hours-per-day']>0) {
      const replacement = data['hours-per-day'] - 1;
      setData({...data, 'hours-per-day': replacement})      
    }
    else {
      return
      //eturn data['hours-per-day']
    }
  }
  
  function handleChangeStartTime (e) {
    setData({...data, 'start-time': e.target.value})
  }

  useEffect(() => {
    if (data['recreation-time'])
      handleChangeEndTime ()
  }, [data['recreation-time']])

  useEffect(() => {
    if (data['start-date'])
      handleChangeEndTime ()
  }, [data['start-date']])

  useEffect(() => {
    if (data['hours-type'])
      handleChangeEndTime ()
  }, [data['hours-type']])

  useEffect(() => {
    if (data['hours-per-day'])
      handleChangeEndTime() 
  }, [data['hours-per-day']])

  

  useEffect(() => {
    if (data)
      endDateFunc()
  }, [data['start-date'], data['total-hours'], data['hours-per-day'], visits])



  function handleChangeEndTime () {
    let arr = (data['start-time'].split(':'))
    let educTime = 45 * (Number.parseInt(data['hours-per-day']))
    let educTimeAstro = 60 * (Number.parseInt(data['hours-per-day']))
    let recTime = Number.parseInt(data['recreation-time'])
    let minutesAtStart = (Number.parseInt(arr[0]) * 60) + Number.parseInt(arr[1]);
    if (data['hours-type']==='academic') {
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
      console.log(result)
      setData({...data, 'end-time': result})

    }
    if (data['hours-type']==='astronomical') {
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
      console.log(result)
      setData({...data, 'end-time': result})    
    }
  }

  function handleChangeTeacher (e) {
    setData({...data, 'teacher': e.target.value})
  }

  function handleChangeRoom (e) {
    setData({...data, 'room': e.target.value})
  }
  return (
    <div className='App'>

      <div className='timetable'>

        <Header/>

          <div className='main-content'>

        <SelectList class='hours-type' handler={handleChangeHoursType}>
          <option value="">Тип часов</option>
          <option value="academic">Академические</option>
          <option value="astronomical">Астрономические</option>
        </SelectList>

        <Counter handlerMinus={handleMinusTotalHours} handlerPlus={handlePlusTotalHours} digit={data['total-hours']} description='Всего часов'/>

        <Timer start={data['start-date']} finish={data['end-date']} handler={handleChangeStartDate} type='date'/>

      
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

      <Counter handlerMinus={handleMinusHoursPerDay} handlerPlus={handlePlusHoursPerDay} digit={data['hours-per-day']} description='Часов в день'/>

      <SelectList class='recreation-time' handler={handleChangeRecreationTime}>
        <option value='0'>Без перерыва</option>
        <option value='5'>5 минут</option>
        <option value='10'>10 минут</option>
        <option value='15'>15 минут</option>
        <option value='20'>20 минут</option>
        <option value='25'>25 минут</option>
        <option value='30'>30 минут</option>
      </SelectList>

      <Timer start={data['start-time']} finish={data['end-time']} handler={handleChangeStartTime} type='time'/>

      <SelectList class='teacher-name' handler={handleChangeTeacher}>
        <option value="">Выберите преподавателя на это время</option>
        <option value="ivanov">Иванов Иван</option>
        <option value="petrov">Петров Петр</option>
        <option value="reeves">Киану Ривз</option>
      </SelectList>

      <SelectList class='room' handler={handleChangeRoom}>
        <option value="">Аудитория</option>
        <option value="001">001</option>
        <option value="002">002</option>
        <option value="003">003</option>
      </SelectList>

      <button className='console-button' onClick={() => console.log(data)}>Показать данные в консоли</button>

      </div>
        </div>
      </div>
    
  );
}

export default App;
