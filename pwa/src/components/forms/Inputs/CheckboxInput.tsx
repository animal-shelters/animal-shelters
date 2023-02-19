interface CheckboxInputProps {
    id: string;
    label: string;
    value: string;
}

export function CreateCheckboxInputComponent(id: string) {
    const newTextInputComponent = {
        id: id,
        type: "CheckboxInput",
        props: {
            id: id,
            label: "Tymczasowy label",
            value: "checkboxValue",
        },
    };
    return newTextInputComponent;
}

function CheckboxInput(props: CheckboxInputProps): JSX.Element {
    return (
        <>
            <label htmlFor={props.id}>{props.label}</label>
            <input type="checkbox" name={props.id} id={props.id} value={props.value}></input>
        </>
    );
}

export default CheckboxInput;
export type { CheckboxInputProps };

