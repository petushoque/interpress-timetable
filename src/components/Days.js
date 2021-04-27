import './Days.css'

function Days (props) {
    function handlerFunc (arg) {props.handler(arg)}
    return (
        <div className='days'>
            <div className='days__day' onClick={() => handlerFunc('mowefr')}>ПН/СР/ПТ</div>
            <div className='days__day' onClick={() => handlerFunc('tuth')}>ВТ/ЧТ</div>
            <div className={props.visits.includes(1)? 'days__day_active' : 'days__day'} onClick={() => handlerFunc(1)}>ПН</div>
            <div className={props.visits.includes(2)? 'days__day_active' : 'days__day'} onClick={() => handlerFunc(2)}>ВТ</div>
            <div className={props.visits.includes(3)? 'days__day_active' : 'days__day'} onClick={() => handlerFunc(3)}>СР</div>
            <div className={props.visits.includes(4)? 'days__day_active' : 'days__day'} onClick={() => handlerFunc(4)}>ЧТ</div>
            <div className={props.visits.includes(5)? 'days__day_active' : 'days__day'} onClick={() => handlerFunc(5)}>ПТ</div>
            <div className={props.visits.includes(6)? 'days__day_active' : 'days__day'} onClick={() => handlerFunc(6)}>СБ</div>
            <div className={props.visits.includes(7)? 'days__day_active' : 'days__day'} onClick={() => handlerFunc(7)}>ВС</div>
        </div>
    )
}

export default Days