import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import AdminPanelLayout from "../../src/components/layouts/AdminPanelLayout";
import Spinner from "../../src/components/Spinner";
import TD from "../../src/components/tables/TD";
import TH from "../../src/components/tables/TH";
import TR from "../../src/components/tables/TR";
import { FullUser, mapUser, UserDto } from "../../src/models/user-type";
import axiosInstance from "../../src/utils/axiosInstance";

function Users(): JSX.Element {
    const [users, setUsers] = useState<Array<FullUser>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState<string | null>();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setToken(token);
        setIsLoading(true);
        axiosInstance.get("users", { headers: { 'Authorization': `Bearer ${token}` } })
            .then((response) => {
                console.log(response.data["hydra:member"]);
                setUsers(Array.from(response.data["hydra:member"].map((user: UserDto) => {
                    return mapUser(user);
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
            <AdminPanelLayout active={2}>
                <Spinner />
            </AdminPanelLayout>
        )
    }
    if (!users.length) {
        return (
            <AdminPanelLayout active={2}>
                <div>
                    Brak użytkowników do wyświetlenia
                </div>
            </AdminPanelLayout>
        )
    }
    return (
        <AdminPanelLayout active={2}>
            <div>
                <table className="min-w-full">
                    <thead className="bg-white border-b">
                        <tr>
                            <TH scope="col">Nr</TH>
                            <TH scope="col">Email</TH>
                            <TH scope="col">Imię</TH>
                            <TH scope="col">Nazwisko</TH>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => {
                            return (
                                <TR key={index}>
                                    <TD>{user.id.toString()}</TD>
                                    <TD>{user.email}</TD>
                                    <TD>{user.name}</TD>
                                    <TD>{user.surname}</TD>
                                </TR>
                            )
                        })}
                    </tbody>
                </table>
            </div >
        </AdminPanelLayout>
    )
}

export default Users;
