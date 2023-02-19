import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import axiosInstance from "../../src/utils/axiosInstance";
import { urlToFile, urlToFileName } from "../../src/utils/imgUtils";
import useToken from "../../src/utils/useToken";
import PrimaryButton from "../../src/components/PrimaryButton";
import UploadComponent from "../../src/components/UploadImage";
import AdminPanelLayout from "../../src/components/layouts/AdminPanelLayout";
import SecondaryButton from "../../src/components/SecondaryButton";
import { useRouter } from "next/router";

export interface LandingPageSchema {
    banner: string[];
    about: [string, string, string];
    contact: {
        name: string;
        addressFirstLine: string;
        addressSecondLine: string;
        nip: string;
        krs: string;
        email: string;
        mapHref: string;
    };
}

function LandingPageEdit() {
    const [pictures, setPictures] = useState<Array<any>>([]);
    const [token, setToken] = useState<string | null>();
    const [isLoading, setIsLoading] = useState(false);
    const [hasSiteMesta, setHasSiteMeta] = useState(false);
    const [isBusy, setIsBusy] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setToken(token);

        setIsLoading(true);
        axiosInstance.get("site_metas")
            .then((response) => {
                if (response.data["hydra:member"].length) {
                    setHasSiteMeta(true);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    })

    const maxNumber = 10;

    const onChange = (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined
    ) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setPictures(imageList as never[]);
    };

    function handleFormSubmit(values: any) {
        setIsBusy(true);
        console.log(JSON.stringify(values));
        if (hasSiteMesta) {
            axiosInstance.put(`site_metas/landing_page`, { jsonValue: [JSON.stringify(values)] }, { headers: { 'Authorization': `Bearer ${token}` } })
                .catch((error) => {
                    console.error(error);
                    alert("Wystąpił błąd podczas zapisywania danych");
                })
        }
        else {
            axiosInstance.post(`site_metas`, { metaKey: "landing_page", jsonValue: [JSON.stringify(values)] }, { headers: { 'Authorization': `Bearer ${token}` } })
                .catch((error) => {
                    console.error(error);
                    alert("Wystąpił błąd podczas zapisywania danych");
                })
        }
        pictures.map((picture, index) => {
            urlToFile(picture.dataURL, index.toString())
                .then((file) => {
                    axiosInstance.post("media_objects", { file: file, domain: `banner` }, { headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "multipart/form-data" } })
                        .then((response) => {
                            if (index === pictures.length - 1) {
                                router.replace('/');
                            }
                        }
                        )
                        .catch((error) => {
                            console.error(error);
                            alert("Wystąpił błąd podczas zapisywania obrazów");
                        });
                });
        });
    }

        return (
            <AdminPanelLayout active={0}>
                <div>
                    <fieldset className="border-2 border-dashed p-4 pt-6 mt-4">
                        <legend className="text-2xl">
                            Banner
                            <span className="text-md"> (do 2MB)</span>
                        </legend>
                        <ImageUploading
                            multiple
                            value={pictures}
                            onChange={onChange}
                            maxNumber={maxNumber}
                            maxFileSize={5000000}
                            acceptType={["jpg", "png"]}
                        >
                            {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps
                            }) => (
                                // write your building UI
                                <div className="upload__image-wrapper">
                                    <PrimaryButton
                                        type="button"
                                        style={isDragging ? { color: "red" } : undefined}
                                        onClick={onImageUpload}
                                        {...dragProps}
                                    >
                                        Dodaj zdjęcie
                                    </PrimaryButton>
                                    &nbsp;
                                    <SecondaryButton type="button" onClick={onImageRemoveAll}>Usuń wszystkie zdjęcia</SecondaryButton>
                                    {imageList.map((image, index) => (
                                        <div key={index} className="image-item flex justify-center content-center gap-2 mt-2">
                                            <img src={image.dataURL} alt="" width="100" />
                                            <div className="image-item__btn-wrapper flex items-center">
                                                <PrimaryButton type="button" onClick={() => onImageUpdate(index)}>Aktualizuj</PrimaryButton>
                                                <SecondaryButton type="button" onClick={() => onImageRemove(index)}>Usuń</SecondaryButton>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ImageUploading>
                    </fieldset>
                    <Formik
                        initialValues={{
                            about: [
                                "",
                                "",
                                ""
                            ],
                            contact: {
                                name: "",
                                addressFirstLine: "",
                                addressSecondLine: "",
                                nip: "",
                                krs: "",
                                email: "",
                                mapHref: "",
                            }
                        }}
                        onSubmit={(values) => handleFormSubmit(values)}>
                        <Form className="w-full">

                            <Field name="about" as="fieldset" className="border-2 border-dashed p-4 pt-6 mt-4">
                                <legend className="text-2xl">O schronisku</legend>
                                <ul className="list-disc text-left ml-4">
                                    <li><Field className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mb-2" name="about.0" placeholder="Informacje o schronisku..."  /></li>
                                    <li><Field className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mb-2" name="about.1" placeholder="Informacje o schronisku..." /></li>
                                    <li><Field className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="about.2" placeholder="Informacje o schronisku..." /></li>
                                </ul>
                            </Field>
                            <Field name="contact" as="fieldset" className="border-2 border-dashed p-4 pt-6 mt-4">
                                <legend className="text-2xl">Kontakt</legend>

                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="contact.name">Nazwa</label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <Field className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="contact.name" placeholder="Nazwa schroniska" />
                                    </div>
                                </div>

                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="contact.addressFirstLine">Ulica i numer</label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <Field className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="contact.addressFirstLine" placeholder="Ulica i numer" />
                                    </div>
                                </div>

                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="contact.addressSecondLine">Kod pocztowy i nazwa miejscowości</label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <Field className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="contact.addressSecondLine" placeholder="Kod pocztowy i nazwa miejscowości" />
                                    </div>
                                </div>

                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="contact.nip">NIP</label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <Field className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="contact.nip" placeholder="NIP" />
                                    </div>
                                </div>

                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="contact.krs">KRS</label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <Field className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="contact.krs" placeholder="KRS" />
                                    </div>
                                </div>

                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="contact.email">Email</label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <Field className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="contact.email" placeholder="Adres poczty email" type="email" />
                                    </div>
                                </div>

                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="contact.mapHref">Link google maps</label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <Field className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="contact.mapHref" placeholder="Link do map google" />
                                    </div>
                                </div>
                            </Field>
                            <div className="flex items-center py-2 flex-row-reverse justify-items-end">
                                <PrimaryButton busy={isBusy} type="submit" className="bg-primary dark:bg-primaryDark dark:text-white mt-4 mb-8">Zapisz</PrimaryButton>
                                {isBusy &&
                                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full ml-4" role="status">
                                        <span className="visually-hidden">Ładowanie...</span>
                                    </div>
                                }
                            </div>
                        </Form>
                    </Formik>
                </div>
            </AdminPanelLayout>
        );
    }

    export default LandingPageEdit;
