import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import PrimaryButton from "../src/components/PrimaryButton";
import Spinner from "../src/components/Spinner";
import MainLayout from "../src/components/layouts/MainLayout";
import axiosInstance from "../src/utils/axiosInstance";

function Login(): JSX.Element {
  interface loginSchema {
    email: string;
    password: string;
  }

  const [token, saveToken] = useState<string | null>();
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    saveToken(token);
  })

  const loginValidationSchema = Yup.object().shape({
    password: Yup.string().required("To pole jest wymagane."),
    email: Yup.string()
      // .email("Podaj poprawny email.")
      .required("To pole jest wymagane."),
  });

  function handleLogin(data: loginSchema) {
    setIsBusy(true);
    axiosInstance
      .post("auth", data)
      .then((response) => {
        console.log(response.data);
        if (typeof window !== undefined) {
          sessionStorage.setItem('token', response.data.token);
        }
        axiosInstance
          .get("auth/user", { headers: { 'Authorization': `Bearer ${response.data.token}` } })
          .then((response) => {
            if (typeof window !== undefined) {
              sessionStorage.setItem('user', JSON.stringify({ id: response.data.id, roles: response.data[0].roles }));
            }
            window.location.replace('/');
            setIsBusy(false);
          });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Wprowadzono błędne dane logowania");
        }
        console.log(error);
        setIsBusy(false);
      });
    console.log(data);
  }

  if (!token) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Formik
            initialValues={{
              email: "",
              password: "",
              passwordConfirmation: "",
            }}
            validationSchema={loginValidationSchema}
            onSubmit={(values) => handleLogin(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="email">Email:</label>
                  </div>
                  <div className="md:w-2/3 flex-col">
                    <Field className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="email" type="text" />
                    {errors.email && touched.email ? <div className="text-red-500 ml-1/3 absolute">{errors.email}</div> : null}
                  </div>
                </div>
                

                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="password">Hasło:</label>
                  </div>
                  <div className="md:w-2/3 flex-col">
                    <Field className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="password" type="password" />
                    {errors.password && touched.password ? (
                  <div className="text-red-500 ml-1/3 absolute">{errors.password}</div>
                ) : null}
                  </div>
                </div>
                
                
                <div className="flex items-center justify-items-end py-2 flex-row-reverse">
                  <PrimaryButton busy={isBusy} type="submit">Zaloguj się</PrimaryButton>
                  {isBusy &&
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full mr-4" role="status">
                      <span className="visually-hidden">Ładowanie...</span>
                    </div>
                  }
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </MainLayout>
    );
  } else {
    return (
      <MainLayout>
        <div>
          <div className="text-center">Trwa pobieranie danych użytkownika...</div>
          <Spinner />
        </div>
      </MainLayout>
    )
  }
}

export default Login;
