"use client"
import Image from "next/image";
import { Label, Select } from 'flowbite-react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useState } from "react";

export default function Signup() {
  const Router = useRouter();

  const [username, setUsername] = useState("");
  const [Accesstype , setAccesstype] = useState("");
  const [password, setPassword] = useState("");
  const [userid , setUserid] = useState();

  const handleLogin = async () => {

    console.log(username, Accesstype, password, userid);

    const loginauth = `${process.env.NEXT_PUBLIC_APP_API}/auth/signin`;

    try {

      const response = await axios.post(loginauth, {
        username,
        user_type : Accesstype,
        password,
        user_id : userid,
      });

      if (response && response.data) {
        console.log("Login successful:", response.data);
        Router.push("/home");
      } else {
        console.error("Login failed: No data in response");
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
      alert("Check your credentials and try again.");
    }
  };

  const handleLogintemp = () => {
      Router.push('pages/');
  }

  return (  
   <section className="bg-gray-50 dark:bg-gray-900 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="useraname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="abcd12"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="userid"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your UserID
                </label>
                <input
                  type="number"
                  name="userid"
                  id="userid"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="12@chennai"
                  value={userid}
                  onChange={(e) => setUserid(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="accesstype"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Access Type
                </label>
                <Select id="accesstype" required onChange={(e) => setAccesstype(e.target.value)}>
                <option>Admin</option>
                <option>DAge</option>
                <option>user</option>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <button
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </button>
              </div>
              <button
                className="w-full text-white bg-gray-500 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleLogin}
              >
                Login
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href="/Auth/Signup"
                  className="font-medium text-black ml-5 text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
