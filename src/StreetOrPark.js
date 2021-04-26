export default function StreetOrPark(props) {
    return (
        props.hidden ?
        <div>
            <input type="button" id="street" value="street" onClick={
                (e) => props.setParkType([...props.parkType, e.target.value])} />

            <input type="button" value="park" onClick={
                (e) => props.setParkType([...props.parkType, e.target.value])} />
        </div> : <></>
    )
}