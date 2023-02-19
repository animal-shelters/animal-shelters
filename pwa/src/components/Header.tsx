import Link from "next/link";
import { useEffect, useState } from "react";
import { Role } from "../models/role-type";
import User from "../models/user-type";
import { logout } from "../utils/authUtils";
import useToken from "../utils/useToken";
import useUser from "../utils/useUser";

function Header(): JSX.Element {
  const [token, setToken] = useState<string | null>();
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setToken(token);
    const user = sessionStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, [])


  function goToAdmin() {
    window.location.replace('/admin_panel');
  }

  return (
    <header>
      <nav className="bg-gray-800 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white text-white">
              Schronisko
            </span>
          </Link>
          {token === null ?
            <div className="flex items-center lg:order-2">
              <Link
                href="/login"
                className="text-white dark:text-white hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Logowanie
              </Link>
              <Link
                href="/register"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                Rejestracja
              </Link>
            </div> :
            <div>
              {user && (user.roles as unknown as Array<Role>).includes(Role.admin)
                && <button onClick={() => goToAdmin()} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Panel administratora</button>
              }
              <button onClick={() => logout()} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Wylogowanie</button>
            </div>
          }
        </div>
      </nav>
    </header>
  );
}

export default Header;
