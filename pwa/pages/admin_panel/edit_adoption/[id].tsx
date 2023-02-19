import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../../../src/components/PrimaryButton";
import User from "../../../src/models/user-type";
import Animal from "../../../src/models/animal.dto";
import axiosInstance from "../../../src/utils/axiosInstance";
import useToken from "../../../src/utils/useToken";
import { dateToInputFormat, stringDateToInputFormat } from "../../../src/utils/dateUtils";
import { mapAdoption, mapAdoptionToDto } from "../../../src/models/adoption.dto";
import { AxiosResponse } from "axios";
import Spinner from "../../../src/components/Spinner";
import AdminPanelLayout from "../../../src/components/layouts/AdminPanelLayout";
import { useRouter } from "next/router";

interface AdoptionSchema {
    user: string;
    animal: string;
    date: string;
}

export default function AddAdoption() {
    const [isLoading, setIsLoading] = useState(false);
    const [initialValues, setInitialValues] = useState<AdoptionSchema | null>(null);

    const router = useRouter();
    const { id } = router.query;
    const [isBusy, setIsBusy] = useState(false);
    const [users, setUsers] = useState<Array<User>>([]);
    const [animals, setAnimals] = useState<Array<Animal>>([]);
    const [token, setToken] = useState<string | null>();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setToken(token);
        if (id) {
            setIsLoading(true);
            axiosInstance.get(`adoptions/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
                .then((response: AxiosResponse<any>) => {
                    let adoption = mapAdoption(response.data["hydra:member"][0]);
                    setInitialValues({
                        animal: adoption.animalId.toString(),
                        user: adoption.userId.toString(),
                        date: stringDateToInputFormat(adoption.date)
                    });
                })
                .catch((error) => {
                    console.error(error);
                    alert("Wystąpił problem podczas ładowania danych adopcji");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
        axiosInstance.get("animals")
            .then((response) => {
                setAnimals(response.data["hydra:member"]);
            })
            .catch((error) => {
                console.error(error);
                alert("Wystąpił problem podczas ładowania listy zwierząt");
            });
        axiosInstance.get("users", { headers: { 'Authorization': `Bearer ${token}` } })
            .then((response) => {
                setUsers(response.data["hydra:member"]);
            })
            .catch((error) => {
                console.error(error);
                alert("Wystąpił problem podczas ładowania listy użytkowników");
            });
    }, [])

    const adoptionValidationSchema = Yup.object().shape({
        user: Yup.string()
            .required("To pole jest wymagane."),
        animal: Yup.string()
            .required("To pole jest wymagane."),
        date: Yup.date()
            .required("To pole jest wymagane."),
    });


    function handleSubmit(data: AdoptionSchema) {
        setIsBusy(true);
        console.log(mapAdoptionToDto(data));
        if (!initialValues) {
            axiosInstance.post("adoptions", mapAdoptionToDto(data), { headers: { 'Authorization': `Bearer ${token}` } })
                .then((_) => {
                    alert("Poprawnie zapisano adopcję");
                    window.location.replace('/admin_panel/adoptions');
                }).catch((error) => {
                    console.error(error);
                    alert("Wystąpił problem przy zapisywaniu adopcji");
                })
        } else {
            axiosInstance.put(`adoptions/${id}`, mapAdoptionToDto(data), { headers: { 'Authorization': `Bearer ${token}` } })
                .then((_) => {
                    alert("Poprawnie zapisano adopcję");
                    window.location.replace('/admin_panel/adoptions');
                }).catch((error) => {
                    console.error(error);
                    alert("Wystąpił problem przy zapisywaniu adopcji");
                })
        }
        setIsBusy(false);
    }

    if (isLoading) {
        return (
            <AdminPanelLayout active={3}>
                <Spinner />
            </AdminPanelLayout>
        );
    }

    return (
        <AdminPanelLayout active={3}>
            <Formik
                initialValues={initialValues
                    ? initialValues
                    : {
                        user: "",
                        animal: "",
                        date: dateToInputFormat(new Date()),
                    }}
                validationSchema={adoptionValidationSchema}
                onSubmit={(values) => handleSubmit(values)}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="user">Id użytkownika:</label>
                            </div>
                            <div className="md:w-2/3">
                                <Field className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="user" />
                                {errors.user && touched.user ? <div className="text-red-500 ml-1/3 absolute">{errors.user}</div> : null}
                            </div>
                        </div>

                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="animal">Id zwierzęcia:</label>
                            </div>
                            <div className="md:w-2/3">
                                <Field className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="animal" />
                                {errors.animal && touched.animal ? (
                                    <div className="text-red-500 ml-1/3 absolute">
                                        {errors.animal}
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="date">Data adopcji</label>
                            </div>
                            <div className="md:w-2/3">
                                <Field className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="date" type="date" />
                            </div>
                        </div>

                        <div className="flex items-center py-2 flex-row-reverse justify-items-end">
                            <PrimaryButton busy={isBusy} type="submit">Zapisz</PrimaryButton>
                            {isBusy &&
                                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full ml-4" role="status">
                                    <span className="visually-hidden">Ładowanie...</span>
                                </div>
                            }
                        </div>
                    </Form>
                )}
            </Formik>
        </AdminPanelLayout>
    )
}
