import './SelectList.css'

function SelectList (props) {
    const handlerFunc = (e) => {props.handler(e)}
    return (
        <select className={props.class} size="1" onChange={handlerFunc}>
            {props.children}
        </select>
    )
}

export default SelectList
