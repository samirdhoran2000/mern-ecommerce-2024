import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        {/* Use grid for column layout on mobile/tablet and row layout on larger screens */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8">
          {/* First Section: Brand Info */}
          <div className="text-center sm:text-center lg:text-left">
            <h3 className="text-xl font-bold mb-4">MediCare</h3>
            <p className="text-sm sm:text-base">
              Your trusted medical supply store since 1995.
            </p>
          </div>

          {/* Second Section: Quick Links */}
          <div className="text-center sm:text-center lg:text-left">
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <a
                  href="#"
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Third Section: Contact Us */}
          <div className="text-center sm:text-center lg:text-left">
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="flex items-center justify-center lg:justify-start">
                <Phone className="h-5 w-5 mr-2" />
                <span>+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center justify-center lg:justify-start">
                <Mail className="h-5 w-5 mr-2" />
                <span>info@medicare.com</span>
              </li>
              <li className="flex items-center justify-center lg:justify-start">
                <MapPin className="h-5 w-5 mr-2" />
                <span>123 Medical St, Health City, HC 12345</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer bottom area */}
      <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
        <p>
          &copy; 2024 MediCare. All rights reserved.
          <span className="block sm:inline">
            {" "}
            Website developed by{" "}
            <a href="https://www.techamica.com" className="text-blue-500 hover:text-blue-400">
              TechAmica IT Solutions
            </a>
            .
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
