import AdminPanelDrawer from "../AdminPanelDrawer";
import MainLayout from "./MainLayout";

interface Props {
    children: JSX.Element;
    active: number;
}

function AdminPanelLayout({ children, active }: Props) {
    return (
        <MainLayout>
            <div className="relative flex w-full h-full">
                <AdminPanelDrawer active={active} />
                <div className="container mx-auto px-10 text-center">
                    <h1 className="text-3xl font-bold underline my-4">Panel administratora</h1>
                    {children}
                </div>
            </div>
        </MainLayout>
    );
}

export default AdminPanelLayout;