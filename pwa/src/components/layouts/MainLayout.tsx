import AdminPanelDrawer from "../AdminPanelDrawer";
import Header from "../Header";

interface Props {
    children: JSX.Element;
}

function MainLayout({ children }: Props) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}

export default MainLayout;