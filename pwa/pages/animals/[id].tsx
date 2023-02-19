import { useEffect, useState } from "react";
import Spinner from "../../src/components/Spinner";
import MainLayout from "../../src/components/layouts/MainLayout";
import Animal from "../../src/models/animal.dto";
import axiosInstance, { backendBaseUrl } from "../../src/utils/axiosInstance";
import { mapResponseToUrls } from "../../src/utils/imgUtils";

interface Props {
    id: number;
}

function AnimalDetailsPage({ id }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [areImagesLoading, setAreImagesLoading] = useState(false);
    const [images, setImages] = useState<Array<string> | null>(null);
    const [animal, setAnimal] = useState<Animal | null>(null);

    useEffect(() => {
        setIsLoading(true);
        axiosInstance.get(`animals/${id}`)
            .then((response) => {
                setAnimal(response.data);
                setIsLoading(false);
            })
            .then((response) => {
                setAreImagesLoading(true);
                axiosInstance.get(`media_objects`, { params: { domain: `animal/${id}`, page: 1, isMain: false } })
                    .then((response) => {
                        setImages(mapResponseToUrls(response));
                        setAreImagesLoading(false);
                    });
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }, [])

    const ImagesComponent = () => {
        if (images != undefined && images.length != 0) {
            return (
                <div className={`grid grid-cols-1 md:grid-cols-${images?.length ? Math.min(images?.length, 3).toString() : '3'} gap-8 justify-items-center mt-16 items-center`}>
                    {images?.map((image, index) => {
                        return <img key={index} src={backendBaseUrl + image} alt="Zdjęcie zwierzęcia" />
                    })}
                </div>
            )
        }
        return (
            <h2 className="text-3xl font-bold text-center mt-16">
                Brak zdjęć
            </h2>
        )
    }


    return (
        <MainLayout>
            {isLoading
                ? <Spinner />
                :
                <div className="container mx-auto">
                    {animal
                        ? <>
                            <h1 className="text-3xl font-bold text-center mt-16">{animal.name}</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center mt-16 items-center">
                                <div>
                                    {animal.description}
                                    <table className="mt-10 w-full border">
                                        <tbody className="border">
                                            <tr className="border">
                                                <th>Data urodzenia</th>
                                                <td>{animal.birthDate.toString()}</td>
                                            </tr>
                                            <tr className="border">
                                                <th>Data przyjęcia do schroniska</th>
                                                <td>{animal.intakeDate.toString()}</td>
                                            </tr>
                                            <tr className="border">
                                                <th>Gatunek</th>
                                                <td>{animal.breed}</td>
                                            </tr>
                                            <tr className="border">
                                                <th>Rasa</th>
                                                <td>{animal.species}</td>
                                            </tr>
                                            <tr className="border">
                                                <th>Numer</th>
                                                <td>{animal.id}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <img
                                    src={animal.highlightedImage ? backendBaseUrl + animal.highlightedImage : "https://dummyimage.com/300x300/fff/aaa"}
                                    alt="..."
                                />
                            </div>
                            <h1 className="text-3xl font-bold text-center mt-16">Zdjęcia</h1>
                            {areImagesLoading
                                ? <Spinner />
                                : <ImagesComponent />
                            }

                        </>
                        : <h1 className="text-3xl font-bold text-center mt-16">Nie znaleziono zwierzęcia</h1>}

                </div>
            }
        </MainLayout>
    );
}

export async function getServerSideProps(context: { query: { id: number } }) {
    const data = await axiosInstance.get(`animals/${context.query.id}`);
    console.log(data)
    return { props: { id: context.query.id } }
}

export default AnimalDetailsPage;
