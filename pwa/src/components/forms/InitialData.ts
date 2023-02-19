interface componentInterface {
    id: string,
    type: string,
    props: object;
}

interface stateInterface {
    components: Record<string, componentInterface>,
    columns: Record<string, {id: string, componentsIds: string[]}>,
    columnOrder: string[]
}


const InitialData: stateInterface = {
    components: {
        "component1": {
            id: "component1",
            type: "TextInput",
            props: {
                label: "Temporary label",
                placeholder: "",
            },
        },
        "component2": {
            id: "component2",
            type: "TextInput",
            props: {
                label: "Temporary label2",
                placeholder: ""
            },
        },
        "component3": {
            id: "component3",
            type: "TextInput",
            props: {
                label: "Temporary label3",
                placeholder: "",
            },
        },
    },
    columns: {
        "form": {
            id: "form",
            componentsIds: ["component1", "component2", "component3"]
        }
    },
    columnOrder: ["form"]
};

export default InitialData;
