interface FormComponentsContainerProps {
    children: JSX.Element,
    innerRef: (element: HTMLElement|null) => any
}

function FormComponentsContainer(
    props: FormComponentsContainerProps
): JSX.Element {
    return <div ref={props.innerRef}>{props.children}</div>;
}

export default FormComponentsContainer;
