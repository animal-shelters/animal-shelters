import Link from "next/link";

function render(props: any){
    return (
        <div className="flex flex-col h-100 min-h-screen bg-gray-700 text-white">
            <Link href="/admin_panel/landing_page_edit" className={`p-3 ${props.active === 0 ? "bg-gray-500" : undefined}`}>Edytuj stronę główną</Link>
            <Link href="/admin_panel/add_animal" className={`p-3 ${props.active === 1 ? "bg-gray-500" : undefined}`}>Dodaj zwierzę</Link>
            <Link href="/admin_panel/users" className={`p-3 ${props.active === 2 ? "bg-gray-500" : undefined}`}>Lista użytkowników</Link>
            <Link href="/admin_panel/adoptions" className={`p-3 ${props.active === 3 ? "bg-gray-500" : undefined}`}>Lista adopcji</Link>
            <Link href="/admin_panel/add_adoption" className={`p-3 ${props.active === 4 ? "bg-gray-500" : undefined}`}>Dodaj adopcję</Link>
            <Link href="/admin_panel/form_creator" className={`p-3 ${props.active === 5 ? "bg-gray-500" : undefined}`}>Dodaj formularz</Link>
        </div>
    )
}

export default render;