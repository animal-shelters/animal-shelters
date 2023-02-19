interface RadioButtonInputProps {
    id: string;
    label: string;
    options: {
        value: string;
        displayText: string;
    }[];
}

export function CreateRadioButtonInputComponent(id: string) {
    const newTextInputComponent = {
        id: id,
        type: "RadioButtonInput",
        props: {
            id: id,
            label: "Tymczasowy label",
            options: [
                {
                    value: "opcja1",
                    displayText: "Opcja 1",
                },
                {
                    value: "opcja2",
                    displayText: "Opcja 2",
                },
                {
                    value: "opcja3",
                    displayText: "Opcja 3",
                },
            ],
        },
    };
    return newTextInputComponent;
}

function RadioButtonInput(props: RadioButtonInputProps): JSX.Element {
    return (
        <fieldset>
            <legend>{props.label}</legend>
            {props.options.map((opt) => {
                return (
                    <div key={opt.value}>
                        <input
                            type="radio"
                            value={opt.value}
                            id={opt.value}
                            name={props.label}
                        ></input>
                        <label htmlFor={opt.value}>{opt.displayText}</label>
                    </div>
                );
            })}
        </fieldset>
    );
}

export default RadioButtonInput;
export type { RadioButtonInputProps };

