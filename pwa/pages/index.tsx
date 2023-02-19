import Link from "next/link";
import { useEffect, useState } from "react";
import AnimalCard from "../src/components/AnimalCard";
import Spinner from "../src/components/Spinner";
import MainLayout from "../src/components/layouts/MainLayout";
import Animal from "../src/models/animal.dto";
import axiosInstance from "../src/utils/axiosInstance";
import { mapResponseToUrls } from "../src/utils/imgUtils";
import { LandingPageSchema } from "./admin_panel/landing_page_edit";

function App({ animals }: { animals: Array<Animal> }) {
  console.log(animals);
  const [newestAnimals, setNewestAnimals] = useState<Array<Animal>>([]);
  const [areAnimalsLoaind, setAreAnimalsLoading] = useState<boolean>(false);
  const [isSiteMetaLoading, setIsSiteMetaLoading] = useState<boolean>(false);
  const [siteMeta, setSiteMeta] = useState<LandingPageSchema>();
  const [isBannerLoading, setIsBannerLoading] = useState<boolean>(false);
  const [bannerUrls, setBannerUrls] = useState<Array<string>>([]);

  useEffect(() => {
    setAreAnimalsLoading(true);
    axiosInstance
      .get("animals", {
        params: { page: 1, itemsPerPage: 3, "order[intakeDate]": "desc" },
      })
      .then((result: any) => {
        setNewestAnimals(result.data["hydra:member"]);
        setAreAnimalsLoading(false);
      })
      .catch((error) => {
        alert("Wystąpił nieoczekiwany problem. Spróbuj ponownie.");
        console.error(error);
      });
    setIsSiteMetaLoading(true);
    axiosInstance
      .get("site_metas")
      .then((response) => {
        if (response.data["hydra:member"].length) {
          console.log(
            JSON.parse(response.data["hydra:member"][0].jsonValue[0])
          );
          setSiteMeta(
            JSON.parse(response.data["hydra:member"][0].jsonValue[0])
          );
        }
        setIsSiteMetaLoading(false);
      })
      .catch((error) => {
        alert("Wystąpił problem podczas ładowania danych.");
        console.error(error);
      });
    setIsBannerLoading(true);
    axiosInstance
      .get("media_objects", { params: { domain: "banner" } })
      .then((response) => {
        setBannerUrls(mapResponseToUrls(response));
        console.log(bannerUrls);
        setIsBannerLoading(false);
      })
      .catch((error) => {
        console.error(error);
        alert("Wystąpił problem podczas ładowania zdjęć baneru.");
      });
  }, []);

  if (isSiteMetaLoading || isBannerLoading) {
    return <Spinner />;
  }

  return (
    <MainLayout>
      <div className="App">
        <div
          id="carouselExampleCaptions"
          className="carousel slide carousel-fade carousel-dark relative"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
            {!isBannerLoading && bannerUrls.length ? (
              bannerUrls.map((url, index) => {
                return (
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to={index}
                    className={index == 0 ? "active" : ""}
                    aria-current={index == 0 ? "true" : "false"}
                    aria-label={`Slide ${index}`}
                  ></button>
                );
              })
            ) : (
              <>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </>
            )}
          </div>
          <div className="carousel-inner relative w-full overflow-hidden">
            {!isBannerLoading && bannerUrls.length ? (
              bannerUrls.map((url, index) => {
                return (
                  <div className="carousel-item active relative float-left w-full">
                    <img
                      src={"https://localhost" + url}
                      className="block w-full"
                      alt={
                        siteMeta && siteMeta.banner && siteMeta.banner[index]
                          ? siteMeta.banner[index]
                          : "..."
                      }
                    />
                    <div className="carousel-caption hidden md:block absolute text-center"></div>
                  </div>
                );
              })
            ) : (
              <>
                <div className="carousel-item active relative float-left w-full">
                  <img
                    src="https://placekitten.com/1920/800"
                    className="block w-full"
                    alt="..."
                  />
                  <div className="carousel-caption hidden md:block absolute text-center"></div>
                </div>
                <div className="carousel-item relative float-left w-full">
                  <img
                    src="https://loremflickr.com/1920/800"
                    className="block w-full"
                    alt="..."
                  />
                  <div className="carousel-caption hidden md:block absolute text-center"></div>
                </div>
                <div className="carousel-item relative float-left w-full">
                  <img
                    src="https://loremflickr.com/1920/800"
                    className="block w-full"
                    alt="..."
                  />
                  <div className="carousel-caption hidden md:block absolute text-center"></div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="w-3/5 mx-auto mt-16 border-b border-gray-100 pb-8">
          <h2>Nowi w schronisku</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 mt-5 justify-items-center gap-8">
            {areAnimalsLoaind ? (
              <Spinner />
            ) : newestAnimals && newestAnimals.length > 0 ? (
              newestAnimals.map((animal) => {
                return (
                  <div key={animal.id}>
                    <AnimalCard {...animal} />
                  </div>
                );
              })
            ) : (
              <h3>Brak zwierząt w schronisku</h3>
            )}
          </div>
          <Link href="/animals">
            <button className="mt-5 inline-block px-6 py-2.5 border border-blue-600 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:text-white hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:text-white focus:outline-none focus:ring-0 active:bg-blue-800 active:text-white active:shadow-lg transition duration-150 ease-in-out">
              Wszystkie zwierzęta
            </button>
          </Link>
        </div>
        <div className="w-3/5 mx-auto mt-8 pb-8 border-b border-gray-100">
          <h2>O schronisku</h2>
          <div className="w-3/5 mx-auto">
            <ul className="list-disc text-left mt-5">
              {siteMeta && siteMeta.about && siteMeta.about.length ? (
                siteMeta.about.map((element) => {
                  if (element.length)
                    return (
                      <>
                        <li>{element}</li>
                        <br />
                      </>
                    );
                })
              ) : (
                <>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                    pulvinar, sapien varius euismod ornare, nibh justo pharetra
                    lectus, vitae imperdiet nibh magna ac urna. Maecenas cursus
                    pulvinar nibh eu congue. Vestibulum ornare auctor nisl.
                    Donec a pellentesque tortor. Morbi congue rutrum tellus in
                    commodo. Sed malesuada lacinia arcu vel accumsan. Nam eget
                    lorem ultricies, pulvinar est ultrices, condimentum odio.
                    Morbi lobortis dolor eget lacus tempus, id porta felis
                    semper.
                  </li>
                  <br />
                  <li>
                    Ut mattis nulla mi, a luctus augue porttitor eu. Donec
                    luctus risus non mattis aliquam. Vivamus accumsan tempor
                    enim vel varius. Quisque viverra, dui id efficitur viverra,
                    odio magna tempus ex, ac ultrices neque massa eu purus. Cras
                    ut egestas ante, quis faucibus neque. Nulla facilisi. Nulla
                    vel commodo lacus, eu suscipit odio. Aenean efficitur mauris
                    lorem, ac imperdiet ante mollis vel. Donec quis tortor vel
                    justo porttitor semper vitae a lectus. Sed gravida congue
                    congue.
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="w-3/5 mx-auto mt-8 pb-8 border-b border-gray-100">
          <h2>Kontakt</h2>
          <div className="flex w-3/5 mx-auto gap-8 mt-5">
            {siteMeta && siteMeta.contact ? (
              <div className="my-auto flex-1">
                {siteMeta.contact.name && (
                  <>
                    <span>{siteMeta.contact.name}</span>
                    <br />
                    <br />
                  </>
                )}
                {siteMeta.contact.addressFirstLine && (
                  <>
                    <span>{siteMeta.contact.addressFirstLine}</span>
                    <br />
                  </>
                )}
                {siteMeta.contact.addressSecondLine && (
                  <>
                    <span>{siteMeta.contact.addressSecondLine}</span>
                    <br />
                  </>
                )}
                {siteMeta.contact.nip && (
                  <>
                    <span>NIP {siteMeta.contact.nip}</span>
                    <br />
                  </>
                )}
                {siteMeta.contact.krs && (
                  <>
                    <span>KRS {siteMeta.contact.krs}</span>
                    <br />
                  </>
                )}
                {siteMeta.contact.email && (
                  <>
                    <span>{siteMeta.contact.email}</span>
                    <br />
                  </>
                )}
              </div>
            ) : (
              <div className="my-auto flex-1">
                <span>Schronisko dla bezdomnych zwierząt w Monako</span>
                <br />
                <br />
                <span>ul. Zwierzęca 420</span>
                <br />
                <span>11-111 Monako</span>
                <br />
                <br />
                <span>NIP 3212321232</span>
                <br />
                <span>KRS 00000123123</span>
                <br />
                <span>temp@mail.com</span>
              </div>
            )}
            <iframe
              src={
                siteMeta &&
                siteMeta.contact &&
                siteMeta.contact.mapHref &&
                siteMeta.contact.mapHref.length
                  ? siteMeta.contact.mapHref
                  : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.14246872506!2d-17.029222584439378!3d32.78848149070716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc605b496dd35b2d%3A0x71dfd8c78eaf124f!2sS%C3%A3o%20Vicente%2C%20Portugalia!5e0!3m2!1spl!2spl!4v1667839435614!5m2!1spl!2spl"
              }
              width="2000"
              height="400"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="map"
              className="flex-1"
            ></iframe>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default App;

export async function getServerSideProps() {
  let animals;
  try {
    animals = await axiosInstance.get("animals", {
      params: { page: 1, itemsPerPage: 3, "order[intakeDate]": "desc" },
    });
  } catch (error) {
    console.error(error);
  }
  // console.log(animals);
  // return { props: { animals } };
  return { props: { animals: animals || null } };
}
