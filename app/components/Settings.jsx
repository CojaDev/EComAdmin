'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Currency } from '../constants/Currency';
import { toast } from 'react-hot-toast';
import { CldUploadWidget } from 'next-cloudinary';
import { CldImage } from 'next-cloudinary';
const Settings = () => {
  const [storeData, setStoreData] = useState({
    name: '',
    description: '',
    address: '',
    email: '',
    currency: '',
    logo: '',
    admins: [],
    specialPage: [],
    faq: [],
    ig: '',
    fb: '',
    yt: '',
    customLink: '',
  });

  useEffect(() => {
    axios.get('/api/store').then((response) => {
      setStoreData(response.data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoreData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/store', storeData);
      toast.success('Store Saved!');
      setTimeout(() => window.location.reload(), 1200);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  const handleAdminChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAdmins = [...storeData.admins];
    updatedAdmins[index][name] = value;
    setStoreData((prevData) => ({
      ...prevData,
      admins: updatedAdmins,
    }));
  };

  const handleAddAdmin = () => {
    const color = getRandomColor();
    const newAdmin = { name: '', email: '', img: color };
    setStoreData((prevData) => ({
      ...prevData,
      admins: [...prevData.admins, newAdmin],
    }));

    setStoreData((prevData) => ({
      ...prevData,
      admins: [...prevData.admins.slice(0, -1), newAdmin],
    }));
  };

  const handleRemoveAdmin = (index) => {
    const updatedAdmins = [...storeData.admins];
    updatedAdmins.splice(index, 1);
    setStoreData((prevData) => ({
      ...prevData,
      admins: updatedAdmins,
    }));
  };
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleLogoUpload = (result) => {
    setStoreData((prevData) => ({
      ...prevData,
      logo: result.info.secure_url,
    }));
  };
  const handleDeleteLogo = (e) => {
    setStoreData((prevData) => ({
      ...prevData,
      logo: '',
    }));
  };
  // Function to handle changes in special page name or text
  const handleSpecialPageChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSpecialPages = [...storeData.specialPage];
    updatedSpecialPages[index][name.split('.')[1]] = value; // Changed here
    setStoreData((prevData) => ({
      ...prevData,
      specialPage: updatedSpecialPages,
    }));
  };

  // Function to add a new special page
  const handleAddSpecialPage = () => {
    const newPage = { name: 'New Page', text: '' }; // Default values for new page
    setStoreData((prevData) => ({
      ...prevData,
      specialPage: [...prevData.specialPage, newPage],
    }));
  };

  // Function to remove a special page
  const handleRemoveSpecialPage = (index) => {
    const updatedSpecialPages = [...storeData.specialPage];
    updatedSpecialPages.splice(index, 1);
    setStoreData((prevData) => ({
      ...prevData,
      specialPage: updatedSpecialPages,
    }));
  };

  const handleFaqChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFaq = [...storeData.faq];
    updatedFaq[index][name.split('.')[1]] = value; // Changed here
    setStoreData((prevData) => ({
      ...prevData,
      faq: updatedFaq,
    }));
  };

  // Function to add a new special page
  const handleAddFaq = () => {
    const newFaq = { question: '', answer: '' }; // Default values for new page
    setStoreData((prevData) => ({
      ...prevData,
      faq: [...prevData.faq, newFaq],
    }));
  };

  // Function to remove a special page
  const handleRemoveFaq = (index) => {
    const updatedFaq = [...storeData.faq];
    updatedFaq.splice(index, 1);
    setStoreData((prevData) => ({
      ...prevData,
      faq: updatedFaq,
    }));
  };
  return (
    <section className="w-full h-full flex flex-col p-4">
      {storeData && (
        <>
          <form className="w-full flex flex-col " onSubmit={handleSubmit}>
            <p className="font-medium text-lg mb-1">General</p>
            <div className="flex flex-col  sm:flex-row w-full gap-10">
              <div className="flex gap-1 flex-col lg:w-[20rem] w-full">
                <p>Store Name</p>
                <input
                  type="text"
                  className="inputs  w-full"
                  name="name"
                  placeholder="Store Name"
                  value={storeData.name}
                  onChange={handleChange}
                />
                <div className="flex flex-col gap-1">
                  <p>Logo</p>
                  <div className="flex gap-2">
                    <CldUploadWidget
                      uploadPreset="arytrzdd"
                      onUpload={handleLogoUpload}
                    >
                      {({ open }) => {
                        return (
                          <button
                            className="flex flex-col gap-2 w-24 min-w-24 min-h-24 h-24 border cursor-pointer items-center justify-center border-black hover:bg-black/5 transition-colors"
                            onClick={(e) => {
                              e.preventDefault();
                              open();
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
                              />
                            </svg>
                            Upload
                          </button>
                        );
                      }}
                    </CldUploadWidget>

                    {storeData.logo && (
                      <div className="relative">
                        <CldImage
                          width="96"
                          height="96"
                          src={storeData.logo}
                          sizes="100vw"
                          alt={'logo'}
                          draggable={false}
                          className="w-24 h-24 min-w-24 min-h-24 object-cover z-20"
                        />
                        <div
                          className="flex items-center justify-center absolute w-6 h-6 bg-red-500 top-0 right-0 cursor-pointer z-0 hover:bg-red-600 transition-all"
                          onClick={() => handleDeleteLogo()}
                        >
                          <p className="font-semibold text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-[1.125rem] h-[1.125rem]"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <p>Description</p>
                <textarea
                  className="inputs w-full resize-none min-h-[7rem]"
                  name="description"
                  placeholder="Description"
                  value={storeData.description}
                  onChange={handleChange}
                />
                <p>Address</p>
                <input
                  type="text"
                  className="inputs w-full"
                  name="address"
                  placeholder="Address"
                  value={storeData.address}
                  onChange={handleChange}
                />
                <p>Email</p>
                <input
                  type="text"
                  className="inputs w-full"
                  name="email"
                  placeholder="Email"
                  value={storeData.email}
                  onChange={handleChange}
                />
                <p>Currency</p>
                <select
                  className="w-full inputs"
                  name="currency"
                  value={storeData.currency}
                  onChange={handleChange}
                >
                  {Currency.map((currency, index) => (
                    <option key={index} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
                <button
                  className="bg-black px-3 mt-2 py-2  text-white"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
          <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}>
            {/* Users form */}
            <p className="font-medium text-lg mt-6">Users</p>
            <div className="flex flex-col sm:flex-row w-full gap-10">
              <div className="flex gap-1 flex-col w-full">
                <div className="flex gap-3 w-full overflow-x-scroll py-2 white-scroll min-h-[365px]">
                  {storeData.admins.map((user, index) => (
                    <div
                      className="flex flex-col sm:min-w-[16rem] min-w-[14rem]  gap-2 border items-center p-2 border-black"
                      key={index}
                    >
                      {/* Profile Image or Initials */}
                      {!user.img.includes('#') ? (
                        <img
                          draggable={false}
                          src={user.img}
                          alt={'pfp ' + user.name}
                          className="cursor-pointer sm:min-w-[16rem] min-w-[14rem] sm:max-w-[16rem] max-w-[14rem] object-cover h-full pt-0  active:scale-95 transition-all"
                        />
                      ) : (
                        <div className="w-full h-full min-h-[13rem] sm:min-w-[16rem] min-w-[14rem] flex justify-center items-center">
                          <div
                            style={{ backgroundColor: user.img }}
                            className="w-full h-full flex items-center justify-center"
                          >
                            <p className="text-9xl font-sans">
                              {user.name && user.name[0].toUpperCase()}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Input fields for name and email */}
                      <input
                        type="text"
                        className="inputs w-full"
                        name="name"
                        value={user.name}
                        placeholder="Name"
                        onChange={(e) => handleAdminChange(index, e)}
                      />
                      <input
                        type="text"
                        className="inputs w-full"
                        name="email"
                        value={user.email}
                        placeholder="Email"
                        onChange={(e) => handleAdminChange(index, e)}
                      />

                      {/* Buttons for saving and removing admin */}
                      <div className="flex gap-2 w-full">
                        <button
                          className="bg-black px-3 hover:opacity-85 transition-all active:scale-[0.98] mt-2 py-2 w-full text-white"
                          type="submit"
                        >
                          Save
                        </button>
                        <button
                          className="bg-red-500 px-2 hover:opacity-85 transition-all active:scale-[0.98] mt-2 py-2 text-white"
                          onClick={() => handleRemoveAdmin(index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                  {/* Button for adding new admin */}
                  <div
                    className="flex flex-col sm:min-w-[16rem] min-w-[14rem] max-w-[16rem] h-full w-[15rem] border items-center justify-center border-black cursor-pointer"
                    onClick={handleAddAdmin}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-20 h-20"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {/* Special Pages form section */}
          <form className="w-full flex flex-col" onSubmit={handleSubmit}>
            <p className="font-medium text-lg mb-1">Special Pages</p>
            <div className="flex gap-3 overflow-x-auto black-scroll py-2 ">
              {storeData.specialPage.map((page, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 border border-black p-1.5 min-h-[300px] sm:min-w-[16rem] min-w-[14rem]"
                >
                  <input
                    type="text"
                    className="inputs w-full"
                    name={`specialPage[${index}].name`}
                    placeholder="Page Name"
                    value={page.name}
                    onChange={(e) => handleSpecialPageChange(index, e)}
                  />
                  <textarea
                    className="inputs w-full resize-none  h-full"
                    name={`specialPage[${index}].text`}
                    placeholder="Page Content"
                    value={page.text}
                    onChange={(e) => handleSpecialPageChange(index, e)}
                  />
                  <div className="flex gap-2 w-full">
                    <button
                      className="bg-black px-3 hover:opacity-85 transition-all active:scale-[0.98] mt-2 py-2 w-full text-white"
                      type="submit"
                    >
                      Save
                    </button>
                    <button
                      className="bg-red-500 px-2 hover:opacity-85 transition-all active:scale-[0.98] mt-2 py-2 text-white"
                      type="submit"
                      onClick={() => {
                        handleRemoveSpecialPage(index);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="bg-black px-3 mt-2 py-2 mb-10 text-white w-[9rem]"
              type="button"
              onClick={handleAddSpecialPage}
            >
              Add Page
            </button>
          </form>
          {/* Faq form section */}
          <form className="w-full flex flex-col" onSubmit={handleSubmit}>
            <p className="font-medium text-lg mb-1">Faq</p>
            <div className="flex gap-3 overflow-x-auto black-scroll py-2 ">
              {storeData.faq.map((question, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 border border-black p-1.5 min-h-[240px] md:min-w-[22rem] sm:min-w-[19rem] min-w-[13rem]"
                >
                  <textarea
                    className="inputs w-full resize-none  h-2/4"
                    name={`faq[${index}].question`}
                    placeholder="Question"
                    value={question.question}
                    onChange={(e) => handleFaqChange(index, e)}
                  />
                  <textarea
                    className="inputs w-full resize-none  h-full"
                    name={`faq[${index}].answer`}
                    placeholder="Answer"
                    value={question.answer}
                    onChange={(e) => handleFaqChange(index, e)}
                  />
                  <div className="flex gap-2 w-full">
                    <button
                      className="bg-black px-3 hover:opacity-85 transition-all active:scale-[0.98] mt-2 py-2 w-full text-white"
                      type="submit"
                    >
                      Save
                    </button>
                    <button
                      className="bg-red-500 px-2 hover:opacity-85 transition-all active:scale-[0.98] mt-2 py-2 text-white"
                      type="submit"
                      onClick={() => {
                        handleRemoveFaq(index);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="bg-black px-3 mt-2 py-2 mb-10 text-white w-[9rem]"
              type="button"
              onClick={handleAddFaq}
            >
              Add Question
            </button>
          </form>

          <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}>
            <p className="font-medium text-lg mt-6">Social Links</p>
            <div className="flex flex-col  sm:flex-row w-full gap-10">
              <div className="flex gap-1 flex-col lg:w-[20rem] w-full">
                <p>Facebook</p>
                <input
                  type="text"
                  className="inputs  w-full"
                  name="fb"
                  value={storeData.fb}
                  onChange={handleChange}
                />
                <p>Instagram</p>
                <input
                  type="text"
                  className="inputs  w-full"
                  name="ig"
                  value={storeData.ig}
                  onChange={handleChange}
                />
                <p>Youtube</p>
                <input
                  type="text"
                  className="inputs  w-full"
                  name="yt"
                  value={storeData.yt}
                  onChange={handleChange}
                />
                <p>Custom Link</p>
                <input
                  type="text"
                  className="inputs  w-full"
                  name="customLink"
                  value={storeData.customLink}
                  onChange={handleChange}
                />

                <button
                  className="bg-black px-3 mt-2 py-2 mb-10  text-white"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </section>
  );
};

export default Settings;
