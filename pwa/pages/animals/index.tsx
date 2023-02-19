import { useEffect, useRef, useState } from "react";
import AnimalCard from "../../src/components/AnimalCard";
import MainLayout from "../../src/components/layouts/MainLayout";
import Pagination from "../../src/components/Pagination";
import Spinner from "../../src/components/Spinner";
import Animal from "../../src/models/animal.dto";
import axiosInstance from "../../src/utils/axiosInstance";

function AnimalsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [animals, setAnimals] = useState<Array<Animal>>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(9);

    useEffect(() => {
        setIsLoading(true);
        axiosInstance.get("animals", { params: { page: pageIndex, itemsPerPage: pageSize } }).then((response) => {
            setAnimals(response.data["hydra:member"]);
            setTotalCount(response.data["hydra:totalItems"]);
            setIsLoading(false);
        })
    }, [pageIndex, pageSize])

    return (
        <MainLayout>
            <>
                <h1 className="text-3xl font-bold text-center mt-16">Lista zwierząt</h1>
                {isLoading
                    ? <Spinner />
                    :
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 gap-8 justify-items-center md:grid-cols-3 mt-16">
                            {animals.map((animal: Animal) => {
                                return (
                                    <AnimalCard {...animal} key={animal.id} />
                                )
                            })}
                        </div>
                        <Pagination pageIndex={pageIndex} totalItems={totalCount} pageSize={pageSize} onPageSizeChange={setPageSize} setPageIndex={setPageIndex} />
                    </div>
                }
            </>
        </MainLayout>

    )
}

export default AnimalsPage;
