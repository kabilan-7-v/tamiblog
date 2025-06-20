import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    phoneCode: "+91",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({
      name: "",
      phone: "",
      phoneCode: "+91",
      email: "",
      message: "",
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          எங்களுடன் தொடர்பு கொள்ளுங்கள்
        </h1>
        <p className="text-gray-600">
          இந்தப் படிவத்தை நிரப்பவும், விரைவில் நாங்கள் உங்களைத் தொடர்புகொள்வோம்.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5 lg:pr-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="flex items-center mb-2 font-medium"
              >
                <span className="text-yellow-500 mr-2">👤</span> பெயர்*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="உங்கள் பெயரை உள்ளிடவும்"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row mb-6 gap-4">
              <div className="w-full sm:w-5/12">
                <label
                  htmlFor="phone"
                  className="flex items-center mb-2 font-medium"
                >
                  <span className="text-yellow-500 mr-2">📞</span> குறியீடு*
                </label>
                <div className="relative">
                  <select
                    id="phoneCode"
                    name="phoneCode"
                    value={formData.phoneCode}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 appearance-none"
                  >
                    <option value="+91">IN +91</option>
                    <option value="+1">US +1</option>
                    <option value="+44">UK +44</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-5/12">
                <label
                  htmlFor="phone"
                  className="flex items-center mb-2 font-medium"
                >
                  <span className="text-yellow-500 mr-2">📞</span> தொலைபேசி*
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="தொலைபேசி எண்ணை உள்ளிடவும்"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="flex items-center mb-2 font-medium"
              >
                <span className="text-yellow-500 mr-2">✉️</span> மின்னஞ்சல்*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="e.g., email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="flex items-center mb-2 font-medium"
              >
                <span className="text-yellow-500 mr-2">💬</span> உங்கள் செய்தி*
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="இங்கே உரையை உள்ளிடவும்"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 resize-y"
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="bg-yellow-400 text-gray-800 py-3 px-12 rounded-full hover:bg-yellow-500 transition duration-300 font-medium"
              >
                அனுப்பு
              </button>
            </div>
          </form>
        </div>

        <div className="hidden lg:flex w-full lg:w-2/5 lg:mt-0 justify-center">
          <div className="bg-white rounded-full p-4 border border-gray-200 flex items-center justify-center h-64 w-64">
            <div className="relative w-full h-full">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="text-center">
                  <span className="text-xl">👋 Say Hi!</span>
                  <div className="mt-4">
                    <div className="bg-gray-900 text-white rounded-full p-3 inline-block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 transform rotate-45"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-full border-2 border-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
