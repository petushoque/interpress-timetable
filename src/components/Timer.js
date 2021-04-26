import './Timer.css'

function Timer (props) {
    const handlerFunc = () => {props.handlerMinus()}

    return (
        <div className='timer'>
            <input className='timer__input' value={props.start} onChange={handlerFunc} type={props.type}/>
            <p className='timer__paragraph'>до</p>
            <input className='timer__input' value={props.finish} type={props.type} readOnly/>
        </div>
    )
}

export default Timer



