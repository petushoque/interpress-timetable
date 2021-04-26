import './Counter.css'

function Counter (props) {
    const handlerMinusFunc = () => {props.handlerMinus()}
    const handlerPlusFunc = () => {props.handlerPlus()}
    return (
        <div className='counter'>
            <div className='counter-button counter-button-minus' onClick={handlerMinusFunc}>-</div>
            <p className='counter__digit'>{props.digit}</p>
            <p className='counter__description'>{props.description}</p>
            <div className='counter-button counter-button-plus' onClick={handlerPlusFunc}>+</div>
        </div>
    )
}

export default Counter