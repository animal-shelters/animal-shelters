interface TextInputProps {
    id: string;
    label: string;
    placeholder: string;
}

export function CreateTextInputComponent(id: string) {
    const newTextInputComponent = {
        id: id,
        type: "TextInput",
        props: {
            id: id,
            label: "Tymczasowy label",
            placeholder: "Tymczasowy placeholder",
        },
    };
    return newTextInputComponent;
}

function TextInput(props: TextInputProps): JSX.Element {
    return (
        <label>
            {props.label}
            <br></br>
            <input name={props.id} placeholder={props.placeholder}></input>
        </label>
    );
}

export default TextInput;
export type { TextInputProps };

