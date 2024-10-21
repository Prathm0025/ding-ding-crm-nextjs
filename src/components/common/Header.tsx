"use client";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import Profile from "../svg/Profile";
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'
import Hamburger from "../svg/Hamburger";

const Header = () => {
  const [user, setUser] = useState<{ username: string; role: string; credits: number; } | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const savedMode = localStorage.getItem("dark-mode");
    if (savedMode) {
      setIsDarkMode(savedMode === "true");
      if (savedMode === "true") {
        document.body.classList.add("dark");
      }
    }
  }, []);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("dark-mode", "true");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("dark-mode", "false");
    }
  };

  const handelGetUser = async () => {
    try {
      const user = await Cookies.get('userToken')
      if (user) {
        const decodedUser: any = jwt.decode(user)
        setUser(decodedUser)
      }
    } catch (error) {

    }
  }
  useEffect(() => {
    handelGetUser()
  }, [])


  return (
    <>
      <div className="w-full mx-auto flex bg-gray-100 dark:bg-gray-800 px-5 py-3 justify-between items-center">
        <button className="lg:hidden">
          <Hamburger />
        </button>
        <div className="lg:block hidden">
          <div className="text-black dark:text-white text-[1.5rem] leading-tight font-semibold">
            Dashboard
          </div>
          <span className="dark:text-white text-black text-opacity-75 text-[.9rem] dark:text-opacity-60">Ding Ding CRM</span>
        </div>
        <div className="flex items-center space-x-4">
          {mounted && <label
            htmlFor="dark-mode-toggle"
            className="flex items-center cursor-pointer"
          >
            <div className="relative">
              <input
                type="checkbox"
                id="dark-mode-toggle"
                className="sr-only"
                checked={isDarkMode}
                onChange={handleToggle}
              />
              <div className="block bg-gray-300 dark:bg-gray-600 w-14 h-8 rounded-full"></div>
              <div
                className={`dot absolute left-1 top-1 bg-white dark:bg-gray-800 w-6 h-6 rounded-full transition transform  duration-300 ${isDarkMode ? "translate-x-6" : ""
                  }`}
              >
                {isDarkMode ? (
                  <FaMoon className="mt-1 text-white ml-[0.26rem]" />
                ) : (
                  <IoSunny className="mt-1 text-yellow-500 ml-[0.26rem]" />
                )}
              </div>
            </div>
          </label>}
          <div className="dark:bg-[#dfdfdf24] py-1 px-4 rounded-md bg-gray-300 text-black text-opacity-60 dark:text-white  text-lg">
            <p className="text-gray-900 dark:text-white">
              Credits :{" "}
              <span className=" text-gray-700 dark:text-[#dfdfdf9c]">
                {user?.credits}
              </span>
            </p>
          </div>
          {user && <div className="lg:flex hidden items-center space-x-1.5">
            <Profile />
            <span className="dark:text-white tracking-wide">{user?.username}</span>
            <span className="text-sm dark:text-gray-300 font-normal">({user?.role})</span>
          </div>}
        </div>
      </div>
    </>
  );
};

export default Header;