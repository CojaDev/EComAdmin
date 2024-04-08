import axios from 'axios';
import { useState } from 'react';

const FirstTime = () => {
  const [steps, setSteps] = useState(0);
  const [storeDetails, setStoreDetails] = useState({
    name: '',
    description: '',
    address: '',
    currency: '',
    admins: [],
    fb: '',
    ig: '',
    yt: '',
    customLink: '',
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name.includes('admin')) {
      const updatedAdmins = [...storeDetails.admins];
      updatedAdmins[index][name.split('_')[1]] = value;
      setStoreDetails({ ...storeDetails, admins: updatedAdmins });
    } else {
      setStoreDetails({ ...storeDetails, [name]: value });
    }
    console.log(storeDetails);
  };
  const handleEnd = async () => {
    try {
      await axios.post('/api/store', storeDetails);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const addAdmin = () => {
    setStoreDetails({
      ...storeDetails,
      admins: [...storeDetails.admins, { name: '', email: '', img: '' }],
    });
  };

  const removeAdmin = (index) => {
    const updatedAdmins = [...storeDetails.admins];
    updatedAdmins.splice(index, 1);
    setStoreDetails({ ...storeDetails, admins: updatedAdmins });
  };

  const handleNext = () => {
    setSteps(steps + 1);
    // Other logic here...
  };

  const handleBack = () => {
    setSteps(steps - 1);
  };

  return (
    <div className="w-screen h-screen -m-4  flex items-center justify-center">
      <div
        className="flex flex-col overflow-hidden bg-black max-w-[58rem] w-[58rem] h-full lg:h-[35rem] lg:max-h-[35rem] max-h-full px-7 py-7 text-white lg:rounded-3xl rounded-none bg-right-bottom"
        style={{
          backgroundImage: `url(/bgBlack.jpg)`,
          backgroundRepeat: 'no-repeat',
        }}
      >
        {steps === 0 && (
          <>
            <h1 className="text-lg">Welcome.</h1>
            <div className="flex sm:flex-row flex-col  h-full">
              <div className="flex flex-col flex-1 sm:mx-4 m-0 ">
                <div className="flex flex-col mt-32">
                  <h3 className="text-3xl font-medium">
                    What is name for your store?
                  </h3>
                  <p className="opacity-80">
                    You can always change name later.
                  </p>
                  <input
                    type="text"
                    name="name"
                    value={storeDetails.name}
                    onChange={handleChange}
                    placeholder="Your Store Name"
                    required
                    className="bg-white text-black inputs mt-4 sm:!p-1.5 !p-2  sm:w-96 w-full"
                  />
                </div>
                <p className="sm:mt-auto mt-2 text-sm opacity-95">
                  ©2024{' '}
                  <a href="https://github.com/CojaDev" target="blank">
                    CojaDev.
                  </a>
                </p>
              </div>
              <div className="flex flex-col flex-1 justify-center items-center">
                <button
                  onClick={handleNext}
                  className="hover:bg-slate-200 transition-all active:scale-95 text-xl bg-white text-black rounded-3xl px-7 p-5 font-medium"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
        {steps === 1 && (
          <>
            <div className="flex items-center justify-between">
              <h1 className="text-lg">Welcome.</h1>
              <button onClick={handleBack}>Back</button>
            </div>
            <div className="flex sm:flex-row flex-col h-full">
              <div className="flex flex-col flex-1 sm:mx-4 ">
                <div className="flex flex-col mt-14">
                  <h3 className="text-3xl font-medium">
                    Say something about your store.
                  </h3>
                  <div className="flex flex-col gap-1.5 mt-2">
                    <p>Address:</p>
                    <input
                      type="text"
                      name="address"
                      value={storeDetails.address}
                      onChange={handleChange}
                      placeholder="Address"
                      required
                      className="bg-white text-black inputs  sm:!p-1.5 !p-2  sm:w-96 w-full"
                    />
                    <p>Currency:</p>
                    <input
                      type="text"
                      name="currency"
                      value={storeDetails.currency}
                      onChange={handleChange}
                      placeholder="Currency"
                      required
                      className="bg-white text-black inputs  sm:!p-1.5 !p-2  sm:w-96 w-full"
                    />
                    <p>Description:</p>
                    <textarea
                      type="text"
                      name="description"
                      value={storeDetails.description}
                      onChange={handleChange}
                      placeholder="Description..."
                      required
                      className="bg-white text-black inputs min-h-[5.5rem] max-h-[6.5rem]  sm:!p-1.5 !p-2  sm:w-96 w-full"
                    />
                  </div>
                </div>
                <p className="sm:mt-auto mt-2 text-sm opacity-95">
                  ©2024{' '}
                  <a href="https://github.com/CojaDev" target="blank">
                    CojaDev.
                  </a>
                </p>
              </div>
              <div className="flex flex-col flex-1 justify-center items-center">
                <button
                  onClick={handleNext}
                  className="hover:bg-slate-200 transition-all active:scale-95 text-xl bg-white text-black rounded-3xl px-7 p-5 font-medium"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}

        {steps === 2 && (
          <>
            <div className="flex items-center justify-between">
              <h1 className="text-lg">Welcome.</h1>
              <button onClick={handleBack}>Back</button>
            </div>
            <div className="flex sm:flex-row flex-col h-full">
              <div className="flex flex-col gap-2 flex-1 max-w-[50%] sm:mx-4 ">
                <h3 className="text-3xl mt-14 font-medium">Add more users.</h3>
                <div className="flex gap-2 h-[40%] mt-10 min-w-[25%] max-w-[100%] overflow-x-scroll black-scroll ">
                  {storeDetails.admins.map((admin, index) => (
                    <div key={index} className="flex flex-col gap-4 mt-2">
                      <input
                        type="text"
                        name={`admin_name_${index}`}
                        value={admin.name}
                        onChange={(e) => handleChange(e, index)}
                        placeholder="Name"
                      />
                      <input
                        type="text"
                        name={`admin_email_${index}`}
                        value={admin.email}
                        onChange={(e) => handleChange(e, index)}
                        placeholder="Email"
                      />
                      <input
                        type="text"
                        name={`admin_img_${index}`}
                        value={admin.img}
                        onChange={(e) => handleChange(e, index)}
                        placeholder="Image URL"
                      />
                      <button onClick={() => removeAdmin(index)}>Remove</button>
                    </div>
                  ))}
                  <button onClick={addAdmin} className="mx-auto my-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-16 h-16"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                </div>
                <p className="sm:mt-auto mt-2 text-sm opacity-95">
                  ©2024{' '}
                  <a href="https://github.com/CojaDev" target="blank">
                    CojaDev.
                  </a>
                </p>
              </div>
              <div className="flex flex-col flex-1 justify-center items-center">
                <button
                  onClick={handleNext}
                  className="hover:bg-slate-200 transition-all active:scale-95 text-xl bg-white text-black rounded-3xl px-7 p-5 font-medium"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
        {steps === 3 && (
          <>
            <div className="flex items-center justify-between">
              <h1 className="text-lg">Welcome.</h1>
              <button onClick={handleBack}>Back</button>
            </div>
            <div className="flex sm:flex-row flex-col h-full">
              <div className="flex flex-col flex-1 sm:mx-4 ">
                <div className="flex flex-col mt-14">
                  <h3 className="text-3xl font-medium">
                    Add links to your socials.
                  </h3>
                  <div className="flex flex-col gap-1.5 mt-2">
                    <p>Facebook:</p>
                    <input
                      type="text"
                      name="fb"
                      value={storeDetails.fb}
                      onChange={handleChange}
                      placeholder="Facebook"
                      required
                      className="bg-white text-black inputs  sm:!p-1.5 !p-2  sm:w-96 w-full"
                    />
                    <p>Instagram:</p>
                    <input
                      type="text"
                      name="ig"
                      value={storeDetails.ig}
                      onChange={handleChange}
                      placeholder="Instagram"
                      required
                      className="bg-white text-black inputs  sm:!p-1.5 !p-2  sm:w-96 w-full"
                    />
                    <p>Youtube:</p>
                    <input
                      type="link"
                      name="yt"
                      value={storeDetails.yt}
                      onChange={handleChange}
                      placeholder="Youtube"
                      required
                      className="bg-white text-black inputs   sm:!p-1.5 !p-2  sm:w-96 w-full"
                    />
                    <p>Custom Link:</p>
                    <input
                      type="text"
                      name="customLink"
                      value={storeDetails.customLink}
                      onChange={handleChange}
                      placeholder="CustomLink..."
                      required
                      className="bg-white text-black inputs   sm:!p-1.5 !p-2  sm:w-96 w-full"
                    />
                  </div>
                </div>
                <p className="sm:mt-auto mt-2 text-sm opacity-95">
                  ©2024{' '}
                  <a href="https://github.com/CojaDev" target="blank">
                    CojaDev.
                  </a>
                </p>
              </div>
              <div className="flex flex-col flex-1 justify-center items-center">
                <button
                  onClick={handleNext}
                  className="hover:bg-slate-200 transition-all active:scale-95 text-xl bg-white text-black rounded-3xl px-7 p-5 font-medium"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
        {steps === 4 && (
          <>
            <div className="flex items-center justify-between">
              <h1 className="text-lg">Welcome.</h1>
              <button onClick={handleBack}>Back</button>
            </div>
            <div className="flex sm:flex-row flex-col h-full">
              <div className="flex flex-col justify-center items-center flex-1 sm:mx-4 ">
                <div className="flex flex-col gap-4 mt-32">
                  <h3 className="text-3xl font-medium">
                    Your store is all setup.
                  </h3>
                  <button
                    onClick={handleEnd}
                    className="hover:bg-slate-200 transition-all active:scale-95 text-xl bg-white text-black rounded-3xl px-5 p-3 font-medium "
                  >
                    Continue
                  </button>
                </div>
                <p className="sm:mt-auto mt-2 text-sm opacity-95">
                  ©2024{' '}
                  <a href="https://github.com/CojaDev" target="blank">
                    CojaDev.
                  </a>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FirstTime;
