import AdminPanelDrawer from "../../src/components/AdminPanelDrawer";
import MainLayout from "../../src/components/layouts/MainLayout";

function AdminPanel() {
    return (
        <MainLayout>
            <div className="relative flex w-full h-full">
                <AdminPanelDrawer active={-1} />
                <div className="container mx-auto px-10 text-center">
                    <h1 className="text-3xl font-bold underline my-4">Panel administratora</h1>
                </div>
            </div>
        </MainLayout>
    );
}

export default AdminPanel;
