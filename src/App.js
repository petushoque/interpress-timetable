import './App.css';
import { useState, useEffect } from 'react';

import Header from './components/Header'
import SelectList from './components/SelectList'
import Counter from './components/Counter'
import Timer from './components/Timer'
import Days from './components/Days'

function App() {

  let NewDate = new Date()
  const today = NewDate.toISOString().slice(0,10);

  const [data, setData] = useState({
    'hours-type': '',
    'total-hours': 0,
    'start-date': today,
    'end-date': today,
    'day-of-visits': [],
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
  if (data['total-hours']!==0 && data['hours-per-day']!==0 && visits.length!==0 )    
    {
      let start = new Date(data['start-date']);
      let daysCount = Math.ceil(data['total-hours']/data['hours-per-day']);
      let days = [
        7,
        1,
        2,
        3,
        4,
        5,
        6
      ];
      let dateForCounter = start;
      let counter = daysCount;

      console.log(counter)

  if (visits.length===0)
  {
    counter=0;
  }
  while (counter > 0) {
    let dayOfWeek = days[dateForCounter.getDay()];
    if (visits.includes(dayOfWeek)) {
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

  const [visits, setVisits] = useState([])

  function handleChanggeDayOfVisits (day) {
    //if (day==='mowefr') {
    //  if (!(visits.includes(1))) {
    //    console.log('+')
    //    setVisits([...visits, 1])
    //  }
    //  if (!(visits.includes(3))) {
    //    setVisits([...visits, 3])
    //  }
    //  if (!(visits.includes(5))) {
    //    setVisits([...visits, 5])
    //  }
    //  setVisits(visits.filter((n) => {return (n===1 || n===3 || n===5)}))   
    //}
    //if (day==='tuth') {
    //  if (!(visits.includes(2))) {
    //    setVisits([...visits, 2])
    //  }
    //  if (!(visits.includes(4))) {
    //    setVisits([...visits, 4])
    //  }
    //  setVisits(visits.filter((n) => {return (n==2 || n==4)}))   
    //}
    
    if (day > 0) {
    visits.includes(day) ? setVisits(visits.filter(item => item !== day)) : setVisits([...visits, day]);
    }
  }
  
  function handleChangeRecreationTime (e) {
    setData({...data, 'recreation-time': e.target.value})
  }


  function handlePlusHoursPerDay () {
    if (data['hours-per-day'] < data['total-hours']) {
      const replacement = (data['hours-per-day'] + 1)
      setData({...data, 'hours-per-day': replacement})
      
    }
    else {
      return data['hours-per-day']
    }
  }

  function handleMinusHoursPerDay () {
    if (data['hours-per-day']>0) {
      const replacement = data['hours-per-day'] - 1;
      setData({...data, 'hours-per-day': replacement})      
    }
    else {
      return data['hours-per-day']
    }
  }
  
  function handleChangeStartTime (e) {
    setData({...data, 'start-time': e.target.value})
  }

  useEffect(() => {
    if (data)
      handleChangeEndTime ()
  }, [data['recreation-time'], data['start-time'], data['hours-type'], data['hours-per-day']])

  

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
            <select className='location' size="1">
              <option>?????????????? (???? ??????????????)</option>
            </select>
            <div className='color'>
              <p className='color__paragraph'>???????? ????????????:</p>
              <input className='color__input'type='color'></input>
            </div>
            <SelectList class='hours-type' handler={handleChangeHoursType}>
              <option value="">?????? ??????????</option>
              <option value="academic">??????????????????????????</option>
              <option value="astronomical">??????????????????????????????</option>
            </SelectList>
            <Counter handlerMinus={handleMinusTotalHours} handlerPlus={handlePlusTotalHours} digit={data['total-hours']} description='?????????? ??????????'/>
            <Timer start={data['start-date']} finish={data['end-date']} handler={handleChangeStartDate} type='date'/>
            <Days handler={handleChanggeDayOfVisits} visits={visits}></Days>
            <Counter handlerMinus={handleMinusHoursPerDay} handlerPlus={handlePlusHoursPerDay} digit={data['hours-per-day']} description='?????????? ?? ????????'/>
            <SelectList class='recreation-time' handler={handleChangeRecreationTime}>
              <option value='0'>?????? ????????????????</option>
              <option value='5'>5 ??????????</option>
              <option value='10'>10 ??????????</option>
              <option value='15'>15 ??????????</option>
              <option value='20'>20 ??????????</option>
              <option value='25'>25 ??????????</option>
              <option value='30'>30 ??????????</option>
            </SelectList>
            <Timer start={data['start-time']} finish={data['end-time']} handler={handleChangeStartTime} type='time'/>
            <SelectList class='teacher-name' handler={handleChangeTeacher}>
              <option value="">???????????????? ?????????????????????????? ???? ?????? ??????????</option>
              <option value="ivanov">???????????? ????????</option>
              <option value="petrov">???????????? ????????</option>
              <option value="reeves">?????????? ????????</option>
            </SelectList>
            <SelectList class='room' handler={handleChangeRoom}>
              <option value="">??????????????????</option>
              <option value="001">001</option>
              <option value="002">002</option>
              <option value="003">003</option>
            </SelectList>
            <div className='notification'>
              <p className='notification__paragraph'>?????????? <strong className='notification__strong'>??????????????????????????</strong> ?? <strong className='notification__strong'>??????????????????</strong> ???? ????????????????????</p>
            </div>
            <button className='console-button' onClick={() => {console.log(data); console.log(visits)}}>???????????????? ???????????? ?? ??????????????</button>
        </div>
      </div>
    </div>    
  );
}

export default App;



