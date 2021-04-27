import {useSpring, animated as a} from 'react-spring'

export default function StreetOrPark(props) {
    const contentProps = useSpring({
        opacity: props.hidden === 2 ? 1 : 0,
        marginLeft: props.hidden === 2 ? 0 : -500
      });
    return (
        props.hidden === 2 ?
        <a.div style={contentProps} onClick={() => props.changeStep(props.hidden+1)} >
            <h4>Choisissez le type de spot</h4>
            <p>(vous pouvez séléctioner les deux)</p>
            <input type="button" id="street" value="street" onClick={
                (e) => props.setParkType([...props.parkType, e.target.value])} />

            <input type="button" value="park" onClick={
                (e) => props.setParkType([...props.parkType, e.target.value])} />
        </a.div> : null
        )
}