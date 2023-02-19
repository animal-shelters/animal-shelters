import { useEffect, useState } from "react";
import {
    DragDropContext,
    Draggable,
    DraggableStateSnapshot,
    DraggingStyle,
    Droppable,
    DropResult,
    NotDraggingStyle
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import axiosInstance from "../../src/utils/axiosInstance";
import useToken from "../../src/utils/useToken";
import PrimaryButton from "../../src/components/PrimaryButton";
import SecondaryButton from "../../src/components/SecondaryButton";
import InitialData from "../../src/components/forms/InitialData";
import CheckboxInput, { CreateCheckboxInputComponent } from "../../src/components/forms/Inputs/CheckboxInput";
import OptionInput, { CreateOptionInputComponent } from "../../src/components/forms/Inputs/OptionInput";
import RadioButtonInput, {
    CreateRadioButtonInputComponent
} from "../../src/components/forms/Inputs/RadioButtonInput";
import TextAreaInput, { CreateTextAreaInputComponent } from "../../src/components/forms/Inputs/TextAreaInput";
import TextInput, { CreateTextInputComponent } from "../../src/components/forms/Inputs/TextInput";
import TextInputModal from "../../src/components/forms/modals/TextInputModal";
import AdminPanelLayout from "../../src/components/layouts/AdminPanelLayout";

export interface componentInterface {
    id: string;
    type: string;
    props: object;
}

function FormCreator(): JSX.Element {
    const ITEMS = [
        {
            content: "Text input",
            type: "TextInput",
        },
        {
            content: "Option input",
            type: "OptionInput",
        },
        {
            content: "Radio button input",
            type: "RadioButtonInput",
        },
        {
            content: "Checkbox input",
            type: "CheckboxInput",
        },
        {
            content: "Text area input",
            type: "TextAreaInput",
        },
    ];

    const [state, setState] = useState(InitialData);
    const [formName, setFormName] = useState("");
    const [token, setToken] = useState<string | null>();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setToken(token);
    })

    function onModalSave(id: string, values: any) {
        const tempComponent = state.components[id];
        for (const [key, value] of Object.entries(values)) {
            (tempComponent.props as Record<string, any>)[key] = value;
        }
        const newState = {
            ...state,
            conponents: {
                ...state.components,
                [id]: tempComponent
            },
        };
        setState(newState);
    }

    function getComponent(id: string, componentType: string, props: any) {
        if (componentType === "TextInput") {
            return (
                <div>
                    <TextInputModal id={id} onSave={(id, values) => onModalSave(id, values)} />
                    <TextInput {...props} />
                    <SecondaryButton className="mt-2" type="button" data-bs-toggle="modal" data-bs-target={`#${id}-modal`}>Edytuj</SecondaryButton>
                </div>
            );
        }
        if (componentType === "OptionInput") {
            return <OptionInput {...props} />;
        }
        if (componentType === "RadioButtonInput") {
            return <RadioButtonInput {...props} />;
        }
        if (componentType === "CheckboxInput") {
            return <CheckboxInput {...props} />;
        }
        if (componentType === "TextAreaInput") {
            return <TextAreaInput {...props} />;
        }
        return <></>;
    }

    function getStyle(
        style: DraggingStyle | NotDraggingStyle | undefined,
        snapshot: DraggableStateSnapshot
    ) {
        if (!snapshot.isDropAnimating) {
            return style;
        }
        return {
            ...style,
            // cannot be 0, but make it super tiny
            transitionDuration: `0.01s`,
        };
    }

    function onDragEnd(result: DropResult) {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (source.droppableId === "ITEMS") {
            const column =
                state.columns[
                destination.droppableId as keyof typeof state.columns
                ];

            let newComponent: componentInterface;
            switch (draggableId) {
                case "TextInput":
                    newComponent = CreateTextInputComponent(uuidv4());
                    break;
                case "OptionInput":
                    newComponent = CreateOptionInputComponent(uuidv4());
                    break;
                case "RadioButtonInput":
                    newComponent = CreateRadioButtonInputComponent(uuidv4());
                    break;
                case "CheckboxInput":
                    newComponent = CreateCheckboxInputComponent(uuidv4());
                    break;
                case "TextAreaInput":
                    newComponent = CreateTextAreaInputComponent(uuidv4());
                    break;
                default:
                    return;
            }

            const newComponentIds = Array.from(column.componentsIds);
            newComponentIds.splice(destination.index, 0, newComponent.id);

            const newColumn = {
                ...column,
                componentsIds: newComponentIds,
            };

            const newState = {
                ...state,
                components: {
                    ...state.components,
                    [newComponent.id]: newComponent,
                },
                columns: {
                    ...state.columns,
                    [newColumn.id]: newColumn,
                },
            };

            setState(newState);
        } else {
            const column =
                state.columns[source.droppableId as keyof typeof state.columns];

            const newComponentIds = Array.from(column.componentsIds);
            newComponentIds.splice(source.index, 1);
            newComponentIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...column,
                componentsIds: newComponentIds,
            };

            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newColumn.id]: newColumn,
                },
            };

            setState(newState);
        }
    }

    function onSave() {
        const components: any = [];
        console.log(state);
        for (let i = 0; i < state.columns.form.componentsIds.length; i++) {
            components.push(state.components[state.columns.form.componentsIds[i]]);
        }
        axiosInstance.post("form_schemes", { name: formName, content: JSON.stringify(components) }, { headers: { 'Authorization': `Bearer ${token}` } })
            .then((response) => {
                console.log(response);
            })
    }

    return (
        <AdminPanelLayout active={5}>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="text-left flex">
                    <div className="flex-grow">
                        <form className="w-full">
                            <Droppable droppableId="form">
                                {(provided) => (
                                    <>
                                        <div
                                            ref={provided.innerRef}
                                            className="flex-col"
                                        >
                                            <>
                                                {state.columns.form.componentsIds.map(
                                                    (componentId, index) => {
                                                        let component =
                                                            state.components[
                                                            componentId
                                                            ];
                                                        return (
                                                            <Draggable
                                                                draggableId={
                                                                    component.id
                                                                }
                                                                index={index}
                                                                key={component.id}
                                                            >
                                                                {(provided) => (
                                                                    <div
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        ref={
                                                                            provided.innerRef
                                                                        }
                                                                        className="component-container"
                                                                    >
                                                                        {getComponent(
                                                                            component.id,
                                                                            component.type,
                                                                            component.props
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        );
                                                    }
                                                )}
                                                {provided.placeholder}
                                                <label htmlFor="nazwa">Nazwa formularza</label>
                                                <input name="nazwa" onChange={(e) => setFormName(e.target.value)} />
                                                <PrimaryButton className="mt-2" type="button" onClick={() => onSave()}>Zapisz</PrimaryButton>
                                            </>
                                        </div>
                                    </>
                                )}
                            </Droppable>
                        </form>
                    </div>
                    <Droppable isDropDisabled={true} droppableId="ITEMS">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                className="text-center px-10"
                            >
                                <h2 className="">Przybornik</h2>
                                {ITEMS.map((item, index) => (
                                    <Draggable
                                        key={item.type}
                                        draggableId={item.type}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <>
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getStyle(
                                                        provided.draggableProps
                                                            .style,
                                                        snapshot
                                                    )}
                                                    className={`py-1 px-3 border border-dashed border-gray-500 m-2 ${snapshot.isDragging
                                                        ? ""
                                                        : "no-dragging-animation"
                                                        }`}
                                                >
                                                    {item.content}
                                                </div>
                                                {snapshot.isDragging && (
                                                    <div className="py-1 px-3 border border-dashed border-gray-500 m-2">
                                                        {item.content}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </AdminPanelLayout>
    );
}

export default FormCreator;
