import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Books", path: "/books" },
    { name: "Cart", path: "/cart" },
    { name: "Profile", path: "/profile" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-gray-200 dark:bg-gray-900 shadow-lg">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="../../../public/vite.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              BookStore
            </span>
          </a>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <Link
              to="tel:8103334932"
              className="text-sm text-gray-500 dark:text-white hover:underline"
            >
              (810) 333-4932
            </Link>
            <Link
              to="/login"
              className="text-sm text-[#fc575cdd] dark:text-[#fc575c] hover:underline"
            >
              SignIn
            </Link>
            <Link
              to="/register"
              className="text-sm text-[#fc575cdd] dark:text-[#fc575c] hover:underline "
            >
              SignUp
            </Link>
          </div>
          <button
            className="block md:hidden text-gray-500 dark:text-white"
            onClick={toggleMenu}
          >
            <FaGripLines size={20} />
          </button>
        </div>
      </nav>
      <nav
        className={`fixed top-16 left-0 right-0 bg-gray-50 dark:bg-gray-700 z-40 ${
          isOpen ? "block" : "hidden"
        } md:block transition-all duration-500`}
      >
        <div className="max-w-screen-xl px-4 lg:py-3 pt-14 pb-3 mx-auto">
          <div className="flex flex-col md:flex-row md:items-center">
            {links.map((item, i) => (
              <ul
                className="flex flex-col md:flex-row font-medium mt-0 md:space-x-8 space-y-4 md:space-y-0 rtl:space-x-reverse text-sm"
                key={i}
              >
                <Link
                  to={item.path}
                  className="text-gray-900 lg:text-lg dark:text-white lg:mr-8 mr-5 hover:underline hover:text-[#fc575cdd] transition-all duration-500"
                  onClick={handleLinkClick}
                >
                  {item.name}
                </Link>
              </ul>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
