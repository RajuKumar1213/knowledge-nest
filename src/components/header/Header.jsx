import React, { useState } from "react";
import { Alert, Container } from "./../../components";
import LogoutButton from "./LogoutButton";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const isVisible = useSelector((state) => state.alert.isVisible);
  const userStatus = useSelector((state) => state.auth.status);
  const [menuOpen, setMenuOpen] = useState(false);

  const navList = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !userStatus,
    },
    {
      name: "Sign up",
      slug: "/signup",
      active: !userStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: userStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: userStatus,
    },
    {
      name: "Profile",
      slug: "/dashboard",
      active: userStatus,
    },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const closeMenu = () => setMenuOpen(false); // Function to close the menu

  return (
    <>
      <nav className="w-full z-30 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white fixed block shadow-lg">
        <Container>
          <div className="container mx-auto  flex items-center justify-between px-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="/logo/owl-logo.png"
                alt=""
                className="h-16 inline relative right-2"
              />
              <div className="text-2xl inline-block font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-700 to-yellow-500 drop-shadow-md">
                KnowledgeNest
              </div>
            </Link>

            {/* Hamburger Icon */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                aria-label="Toggle Menu"
                className="text-gray-300 focus:outline-none"
              >
                {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>

            {/* Links */}
            <div
              className={`fixed top-0 right-0 h-full w-64 bg-gray-900 z-40 transform transition-transform duration-300 ease-in-out md:static md:w-auto md:h-auto md:transform-none md:flex md:space-x-8 md:bg-transparent ${
                menuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex flex-col space-y-4 p-4 md:space-y-0 md:p-0 md:flex-row md:items-center md:justify-end">
                {navList.map((item) =>
                  item.active ? (
                    <NavLink
                      key={item.name}
                      to={item.slug}
                      onClick={closeMenu} // Close the menu on click
                      className={({ isActive }) =>
                        `relative text-gray-300 font-semibold px-4 py-2 block transition duration-300 ease-in-out 
                       ${
                         isActive
                           ? "text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-400"
                           : "hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-gray-400 hover:to-gray-600 px-2"
                       }
                       before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:bg-gradient-to-r before:from-gray-400 before:to-gray-600 px-4
                       ${
                         isActive
                           ? "before:scale-x-100"
                           : "before:scale-x-0 hover:before:scale-x-100"
                       }
                       before:transition-transform before:duration-300 before:origin-left`
                      }
                    >
                      {item.name}
                    </NavLink>
                  ) : null
                )}
                {userStatus && <LogoutButton />}
              </div>
            </div>

            {/* Overlay for small screens */}
            {menuOpen && (
              <div
                className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30 md:hidden"
                onClick={closeMenu}
              ></div>
            )}
          </div>
        </Container>
      </nav>

      <div className="h-10 md:h-0">{isVisible && <Alert />}</div>
    </>
  );
}

export default Header;
