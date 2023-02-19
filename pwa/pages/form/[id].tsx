import { useEffect, useState } from "react"
import axiosInstance from "../../src/utils/axiosInstance"
import useToken from "../../src/utils/useToken"
import useUser from "../../src/utils/useUser";
import PrimaryButton from "../../src/components/PrimaryButton";
import Spinner from "../../src/components/Spinner";
import { componentInterface } from "../admin_panel/form_creator";
import CheckboxInput from "../../src/components/forms/Inputs/CheckboxInput";
import OptionInput from "../../src/components/forms/Inputs/OptionInput";
import RadioButtonInput from "../../src/components/forms/Inputs/RadioButtonInput";
import TextAreaInput from "../../src/components/forms/Inputs/TextAreaInput";
import TextInput from "../../src/components/forms/Inputs/TextInput";
import User from "../../src/models/user-type";
import MainLayout from "../../src/components/layouts/MainLayout";

interface Props {
    id: number
}

export default function FormView({ id }: Props) {
    const [token, setToken] = useState<string | null>();
    const [user, setUser] = useState<User | null>();
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [form, setForm] = useState<Array<componentInterface>>();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setToken(token);
        const user = sessionStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
        setIsLoading(true);
        axiosInstance.get(`form_schemes/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then((response) => {
                setTitle(response.data.name);
                setForm(JSON.parse(response.data.content))
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                alert("Wystąpił nieoczekiwany błąd podczas ładowania danych");
            })
    }, []);

    function getComponent(componentType: string, props: any) {
        if (componentType === "TextInput") {
            return (
                <TextInput {...props} />
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

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        const content: Record<string, any> = [];
        if (form) {
            for (let i = 0; i < form.length; i++) {
                content.push({
                    [(form[i].id).toString()]: (e.target as any)[i].value
                });
            }
        }
        if (user)
            axiosInstance.post("forms", { content: JSON.stringify(content), formScheme: `/form_schemes/${id}`, user: `/users/${user.id}` }, { headers: { 'Authorization': `Bearer ${token}` } })
                .then((response) => {
                    console.log(response);
                })
    }

    if (isLoading || form == undefined) {
        return <MainLayout><> <Spinner /></></MainLayout>
    }

    return (
        <MainLayout>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
            }}>
                <h1 className="text-2xl text-center">{title}</h1>
                {form.map((element) => {
                    return getComponent(element.type, element.props);
                })}
                <PrimaryButton type="submit" className="mt-2">Zapisz</PrimaryButton>
            </form>
        </MainLayout>
    )
}

export async function getServerSideProps(context: { query: { id: number } }) {
    return { props: { id: context.query.id } }
}
