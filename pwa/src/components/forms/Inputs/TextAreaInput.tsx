interface TextAreaInputProps {
    id: string;
    label: string;
    placeholder: string;
    rows?: number;
    cols?: number;
}

export function CreateTextAreaInputComponent(id: string) {
    const newTextInputComponent = {
        id: id,
        type: "TextAreaInput",
        props: {
            id: id,
            label: "Tymczasowy label",
            placeholder: "Tymczasowy placeholder",
        },
    };
    return newTextInputComponent;
}

function TextAreaInput(props: TextAreaInputProps): JSX.Element {
    return (
        <label>
            {props.label}
            <br></br>
            <textarea name={props.id} placeholder={props.placeholder} rows={props.rows || 4} cols={props.cols || 50}></textarea>
        </label>
    );
}

export default TextAreaInput;
export type { TextAreaInputProps };

