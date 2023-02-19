import Link from "next/link";
import { useEffect, useState } from "react";
import AdminPanelLayout from "../../src/components/layouts/AdminPanelLayout";
import Spinner from "../../src/components/Spinner";
import TD from "../../src/components/tables/TD";
import TH from "../../src/components/tables/TH";
import TR from "../../src/components/tables/TR";
import Adoption, { AdoptionDto, mapAdoption } from "../../src/models/adoption.dto";
import axiosInstance from "../../src/utils/axiosInstance";
import useToken from "../../src/utils/useToken";

function Adoptions(): JSX.Element {
    const [adoptions, setAdoptions] = useState<Array<Adoption>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState<string | null>();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setToken(token);
        setIsLoading(true);
        axiosInstance.get("adoptions", { params: { page: 1, "order[date]": "desc" }, headers: { 'Authorization': `Bearer ${token}` } })
            .then((response) => {
                console.log(response.data["hydra:member"]);
                setAdoptions(Array.from(response.data["hydra:member"].map((adoption: AdoptionDto) => {
                    return mapAdoption(adoption);
                })));
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            })
    }, [])

    if (isLoading) {
        return (
            <AdminPanelLayout active={3}>
                <Spinner />
            </AdminPanelLayout>
        )
    }
    if (!adoptions.length) {
        return (
            <AdminPanelLayout active={3}>
                <div>
                    Brak adopcji do wyświetlenia
                </div>
            </AdminPanelLayout>
        )
    }
    return (
        <AdminPanelLayout active={3}>
            <div>
                <table className="min-w-full">
                    <thead className="bg-white border-b">
                        <tr>
                            <TH scope="col">Nr</TH>
                            <TH scope="col">Data adopcji</TH>
                            <TH scope="col">Imię zwierzęcia</TH>
                            <TH scope="col">Klient</TH>
                            <TH scope="col">Edycja</TH>
                        </tr>
                    </thead>
                    <tbody>
                        {adoptions.map((adoption, index) => {
                            return (
                                <TR key={index}>
                                    <TD>{index.toString()}</TD>
                                    <TD>{adoption.date.toString()}</TD>
                                    <TD>
                                        <Link href={`/animals/${adoption.animal.id}`}>
                                            {adoption.animal.name}
                                        </Link>
                                    </TD>
                                    <TD>
                                        <Link href={`/users/${adoption.user.id}`}>
                                            {adoption.user.email}
                                        </Link>
                                    </TD>
                                    <TD>
                                        <Link href={`/admin_panel/edit_adoption/${adoption.adoptionId}`}  >
                                            <i className="fa-solid fa-pen-to-square fa-xl"></i>
                                        </Link>
                                    </TD>
                                </TR>
                            )
                        })}
                    </tbody>
                </table>
            </div >
        </AdminPanelLayout>
    )
}

export default Adoptions;
