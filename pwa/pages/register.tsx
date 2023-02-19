import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import axiosInstance from "../src/utils/axiosInstance";
import useToken from "../src/utils/useToken";
import useUser from "../src/utils/useUser";
import PrimaryButton from "../src/components/PrimaryButton";
import MainLayout from "../src/components/layouts/MainLayout";

interface registrationSchema {
  email: string;
  password: string;
  passwordConfirmation: string;
}

const registrationValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Hasło musi zawierać przynajmniej 8 znaków.")
    .required("To pole jest wymagane."),
  passwordConfirmation: Yup.string()
    .required("To pole jest wymagane.")
    .oneOf([Yup.ref("password"), null], "Podane hasła nie są identyczne."),
  email: Yup.string()
    .email("Podaj poprawny email.")
    .required("To pole jest wymagane."),
});

function Registration(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistration = (data: registrationSchema) => {
    setIsLoading(true);
    axiosInstance
      .post("users", data)
      .then((response) => {
        if (typeof window !== undefined) {
          sessionStorage.setItem('user', JSON.stringify({ id: response.data.id, roles: response.data.roles }));
        }
        axiosInstance
          .post("auth", data)
          .then((response) => {
            if (typeof window !== undefined) {
              sessionStorage.setItem('token', response.data.token);
            }
            window.location.replace('/');
            setIsLoading(false);
          })
      })
      .catch((error) => {
        console.log(error);
        alert("Wystąpił nieoczekiwany błąd");
        setIsLoading(false);
      });
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Formik
          initialValues={{
            email: "",
            password: "",
            passwordConfirmation: "",
          }}
          validationSchema={registrationValidationSchema}
          onSubmit={(values) => handleRegistration(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="email">Email:</label>
                </div>
                <div className="md:w-2/3">
                  <Field className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="email" type="email" />
                  {errors.email && touched.email ? <div className="text-red-500 ml-1/3 absolute">{errors.email}</div> : null}
                </div>
              </div>

              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="password">Hasło:</label>
                </div>
                <div className="md:w-2/3">
                  <Field className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="password" type="password" />
                  {errors.password && touched.password ? (
                    <div className="text-red-500 ml-1/3 absolute">{errors.password}</div>
                  ) : null}
                </div>
              </div>

              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="passwordConfirmation">Potwierdzenie hasła:</label>
                </div>
                <div className="md:w-2/3">
                  <Field className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="passwordConfirmation" type="password" />
                  {errors.passwordConfirmation && touched.passwordConfirmation ? (
                    <div className="text-red-500 ml-1/3 absolute">{errors.passwordConfirmation}</div>
                  ) : null}
                </div>
              </div>

              <div className="flex items-center flex-row-reverse py-2 justify-items-end">
                <PrimaryButton type="submit" className="mt-2" busy={isLoading}>Zarejestruj się</PrimaryButton>
                {isLoading &&
                  <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full mr-4" role="status">
                    <span className="visually-hidden">Ładowanie...</span>
                  </div>}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </MainLayout>
  );
}

export default Registration;
