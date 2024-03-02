import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function Footerr() {
  const navigate = useNavigate();

  const { login, logout, isLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("user");
    localStorage.removeItem("tickets");
  };

  return (
    <footer class="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <a class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              FBS
            </span>
          </a>
          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link to="../home" class="hover:underline me-4 md:me-6">
                Home
              </Link>
            </li>
            <li>
              <Link to="../user" class="hover:underline me-4 md:me-6">
                Details
              </Link>
            </li>
            <li>
              <Link to="../signup" class="hover:underline me-4 md:me-6" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="/" class="hover:underline">
            FBS™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
