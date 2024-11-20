import React from "react";
import { Container } from "../../components";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-10">
      <Container>
        <div className="container mx-auto px-4">
          {/* Logo and About */}
          <div className="flex flex-col items-start space-y-4 mb-8">
            <div className="flex items-center">
              <img src="/logo/owl-logo.png" alt="" className="md:h-40 h-28 relative right-6" />
              <h2 className="md:text-4xl text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-700 to-yellow-500 drop-shadow-md">
                KnowledgeNest
              </h2>
            </div>
            <p className="text-gray-400 max-w-md">
              KnowledgeNest is your go-to platform for insightful posts,
              intriguing facts, and educational resources. Join us on a journey
              to expand your knowledge and discover new perspectives.
            </p>
          </div>

          {/* Footer Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
            {/* Categories */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#technology" className="hover:underline">
                    Technology
                  </a>
                </li>
                <li>
                  <a href="#science" className="hover:underline">
                    Science
                  </a>
                </li>
                <li>
                  <a href="#health" className="hover:underline">
                    Health
                  </a>
                </li>
                <li>
                  <a href="#education" className="hover:underline">
                    Education
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="#about" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/all-posts" className="hover:underline">
                    All Posts
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:underline">
                    Your Profile
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li>📍 Daltonganj, palamu, Jharkhand</li>
                <li>📞 +91 9546953892</li>
                <li>✉️ support@knowledgenest.com</li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com" className="hover:text-gray-400">
                  <i className="fab fa-facebook-f"></i> Facebook
                </a>
                <a href="https://twitter.com" className="hover:text-gray-400">
                  <i className="fab fa-twitter"></i> Twitter
                </a>
                <a href="https://instagram.com" className="hover:text-gray-400">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 pt-4 text-center text-gray-500">
            &copy; {new Date().getFullYear()} KnowledgeNest. Design and
            Developed by Mr. Raju kr. Vishwakarma
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
