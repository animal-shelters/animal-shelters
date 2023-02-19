interface OptionInputProps {
    id: string;
    label: string;
    options: {
        value: string;
        displayText: string;
    }[];
}

export function CreateOptionInputComponent(id: string) {
    const newOptionInputComponent = {
        id: id,
        type: "OptionInput",
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
    return newOptionInputComponent;
}

function OptionInput(props: OptionInputProps): JSX.Element {
    return (
        <label>
            {props.label}
            <br></br>
            <select name={props.id}>
                {props.options.map((opt) => {
                    return (
                        <option value={opt.value} key={opt.value}>
                            {opt.displayText}
                        </option>
                    );
                })}
            </select>
        </label>
    );
}

export default OptionInput;
