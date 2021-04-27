import { useSpring, animated as a } from 'react-spring'

export default function EditParkName(props) {
    const contentProps = useSpring({
        opacity: props.step === 3 ? 1 : 0,
        marginLeft: props.step === 3 ? 0 : -500
    });
    return (
        props.step === 3 ?
            <a.div style={contentProps}  >
                <input onChange={(event) => props.setParkName(event.target.value)}
                    type="text" placeholder="name"></input>
                    <button onClick={() => props.changeStep(props.step + 1)}>valider</button>
            </a.div> : null
    )
}