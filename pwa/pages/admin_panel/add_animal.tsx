import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import axiosInstance from "../../src/utils/axiosInstance";
import useToken from "../../src/utils/useToken";
import PrimaryButton from "../../src/components/PrimaryButton";
import { urlToFile } from "../../src/utils/imgUtils";
import AdminPanelLayout from "../../src/components/layouts/AdminPanelLayout";
import ImageUploading, { ImageListType } from "react-images-uploading";
import SecondaryButton from "../../src/components/SecondaryButton";


function AddAnimal() {
    const [pictures, setPictures] = useState<Array<any>>([]);
    const [isBusy, setIsBusy] = useState(false);
    const [token, setToken] = useState<string | null>();
    const maxNumber = 10;

    const onChange = (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined
    ) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setPictures(imageList as never[]);
    };

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setToken(token);
    }, [])


    async function handleSubmit(data: any) {
        setIsBusy(true);
        axiosInstance.post("animals", data, { headers: { 'Authorization': `Bearer ${token}` } })
            .then((response) => {
                pictures.map((picture, index) => {
                    urlToFile(picture.dataURL, index.toString())
                        .then((file) => {
                            if (index == 0 && pictures.length == 1) {
                                axiosInstance.post("media_objects", { file: file, domain: `animal/${response.data.id}`, isMain: true }, { headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "multipart/form-data" } })
                                    .then((response) => {
                                        window.location.replace("/animals")
                                        setIsBusy(false);
                                    });
                            } else if (index == 0) {
                                axiosInstance.post("media_objects", { file: file, domain: `animal/${response.data.id}`, isMain: true }, { headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "multipart/form-data" } })
                            } else if (index != pictures.length - 1) {
                                axiosInstance.post("media_objects", { file: file, domain: `animal/${response.data.id}` }, { headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "multipart/form-data" } })
                                    .then((response) => console.log(response));
                            } else {
                                axiosInstance.post("media_objects", { file: file, domain: `animal/${response.data.id}` }, { headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "multipart/form-data" } })
                                    .then((response) => {
                                        window.location.replace("/animals")
                                        setIsBusy(false);
                                    });
                            }
                        });

                })
            })
            .catch((error) => {
                console.log(error);
                alert("Coś poszło nie tak. Spróbuj ponownie.");
                return;
            });
    }

    return (
        <AdminPanelLayout active={1}>
            <div>
                <fieldset className="border-2 border-dashed p-4 pt-6 mt-4">
                    <legend className="text-2xl">
                        Zdjęcia
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
                                    style={isDragging ? { color: "red" } : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    Dodaj zdjęcie
                                </PrimaryButton>
                                &nbsp;
                                <SecondaryButton onClick={onImageRemoveAll}>Usuń wszystkie zdjęcia</SecondaryButton>
                                {imageList.map((image, index) => (
                                    <div key={index} className="image-item flex justify-center content-center gap-2 mt-2">
                                        <img src={image.dataURL} alt="" width="100" />
                                        <div className="image-item__btn-wrapper flex items-center">
                                            <PrimaryButton onClick={() => onImageUpdate(index)}>Aktualizuj</PrimaryButton>
                                            <SecondaryButton onClick={() => onImageRemove(index)}>Usuń</SecondaryButton>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ImageUploading>
                </fieldset>
                <Formik
                    initialValues={{}}
                    onSubmit={(values) => handleSubmit(values)}>
                    <Form className="w-full mt-8">
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="species">Gatunek</label>
                            </div>
                            <div className="md:w-2/3">
                                <Field className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="species" placeholder="Gatunek zwierzęcia" />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="breed">Rasa</label>
                            </div>
                            <div className="md:w-2/3">
                                <Field className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="breed" placeholder="Rasa zwierzęcia" />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="name">Imię</label>
                            </div>
                            <div className="md:w-2/3">
                                <Field className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="name" placeholder="Imię zwierzęcia" />
                            </div>
                        </div>

                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="birthDate">
                                    Data urodzenia
                                    <br />
                                    <span className="text-sm">(pierwszy dzień miesiąca jeżeli data jest estymowana)</span>
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <Field className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="birthDate" type="date" />
                            </div>
                        </div>

                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="intakeDate">Data przyjęcia do schroniska</label>
                            </div>
                            <div className="md:w-2/3">
                                <Field className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="intakeDate" type="date" />
                            </div>
                        </div>

                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="description">Opis</label>
                            </div>
                            <div className="md:w-2/3">
                                <Field className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="description" placeholder="Opis zwierzęcia" as="textarea" />
                            </div>
                        </div>

                        <div className="flex items-center py-2 flex-row-reverse justify-items-end">
                            <PrimaryButton busy={isBusy} type="submit" className="bg-primary dark:bg-primaryDark dark:text-white">Zapisz</PrimaryButton>
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
    )
}

export default AddAnimal;
