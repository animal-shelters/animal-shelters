function render(): JSX.Element {
    return (
        <>
            <form>
                {/* {InitialData.components.map((field) =>
                    React.createElement(field.type, field.props)
                )} */}
            </form>
            <button
                onClick={() => {
                    console.log("Test");
                }}
            >
                Add Input
            </button>
            <table>
                <tr>
                    <td className="bg-slate-500 w-10 h-4"></td>
                </tr>
                <tr>
                    <td className="w-10 h-4"></td>
                </tr>
                <tr>
                    <td className="bg-slate-500 w-10 h-4"></td>
                </tr>
            </table>
        </>
    );
}

export default render;
