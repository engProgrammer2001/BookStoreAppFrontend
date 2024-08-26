import React from "react";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="pt-44 p-4">
      <div className="flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl underline font-bold">Contact Us</h1>
      </div>
      
      <div className="py-10 flex flex-col md:flex-row">
        {/* First div: Image */}
        <div className="w-full md:w-1/2">
          <img
            src="/images/contact.jpg"
            alt="Contact"
            className="w-full h-[30vh] md:h-[50vh] object-cover"
          />
        </div>

        {/* Second div: Email and Address */}
        <div className="w-full md:w-1/2 flex flex-wrap pt-5 lg:p-4 justify-between">
          {/* Email Contact */}
          <div className="w-full md:w-[48%] bg-zinc-600 p-4 rounded flex flex-col items-center text-center mb-4 md:mb-0">
            <FaEnvelope className="text-3xl md:text-5xl mb-2 text-red-500" />
            <h3 className="text-xl md:text-2xl font-bold">Email</h3>
            <p className="pt-4 md:pt-8">example@email.com</p>
            <p className="pt-2">support@email.com</p>
            <p className="pt-2">Info@email.com</p>
          </div>

          {/* Address */}
          <div className="w-full md:w-[48%] bg-zinc-600 p-4 rounded flex flex-col items-center text-center">
            <FaMapMarkerAlt className="text-3xl md:text-5xl mb-2 text-green-400" />
            <h3 className="text-xl md:text-2xl font-bold">Address</h3>
            <p className="pt-4 md:pt-8">123 Main St, City, Country</p>
            <p className="pt-2">Postal Code</p>
            <p className="pt-2">Phone Number</p>
          </div>
        </div>
      </div>

      {/* Form and Map */}
      <div className="flex flex-col lg:flex-row justify-center items-center h-auto lg:h-[500px]">
        {/* First div: Form */}
        <div className="w-full lg:w-1/2 h-full p-4 bg-gray-600 flex flex-col justify-center mb-4 lg:mb-0">
          <div className="flex justify-center items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Leave a message</h1>
          </div>
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-100 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter Name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-100 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter Email"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-100 text-sm font-bold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                placeholder="Enter Message"
              ></textarea>
            </div>
            <div className="flex">
              <Link
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </Link>
            </div>
          </form>
        </div>

        {/* Second div: Map */}
        <div className="w-full lg:w-1/2 h-full lg:p-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7417.072626841313!2d77.30986290000001!3d28.591772600000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1724177785929!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
