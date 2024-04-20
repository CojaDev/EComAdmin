'use client';
import { CldUploadWidget } from 'next-cloudinary';
import { CldImage } from 'next-cloudinary';
import Topbar from '../components/Topbar';
import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Lists from '../components/Lists';
import { catTITLES } from '../constants/Headers';
import { toast } from 'react-hot-toast';
export default function Home() {
  const [Categories, setCategories] = useState([]);
  const [ID, setID] = useState('');
  const [name, setName] = useState('');

  const [AddingNew, setAddingNew] = useState(false);
  const [Image, setImage] = useState('');
  const [Editing, setEditing] = useState(false);

  useEffect(() => {
    axios
      .get('/api/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (Image === '') {
      toast.error('Add Image');
      return;
    }
    const name = e.target[0].value.toString();

    const images = Image;
    const data = { name, images };

    try {
      await axios.post('/api/categories', data).then((res) => {
        toast.success('Category Successfully Added!!! ');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value.toString();
    const _id = ID;
    const images = Image;
    const data = { name, images };

    try {
      await axios.put('/api/categories', { ...data, _id }).then((res) => {
        toast.success('Category Successfully Edited!!! ');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  const EditCategory = (id, catname, image) => {
    setID(id);
    setName(catname);
    setImage(image);
    setEditing(true);
  };
  const handleImageUpload = (result) => {
    setImage(result.info.secure_url);
  };
  return (
    <>
      <Layout>
        <div className="w-full h-screen flex flex-col ">
          <Topbar title={'Categories'} />
          <div className="sm:py-6 px-3.5 py-6 ">
            <button
              className=" bg-green-400 border border-black select-none hover:opacity-85  transition-opacity  sm:p-2 p-3 px-2"
              draggable={false}
              onClick={() => {
                setAddingNew(true);
              }}
            >
              New Category
            </button>
          </div>
          <Lists
            list={Categories}
            headers={catTITLES}
            type="Category"
            editCategory={EditCategory}
          />
        </div>
      </Layout>
      {AddingNew && (
        <div className="top-0 left-0 w-screen h-screen  absolute flex items-center justify-center">
          <div
            className="w-full h-full absolute top-0 left-0 bg-black/40 z-0"
            onClick={() => {
              setAddingNew(false);
            }}
          />
          <div className="flex flex-col gap-8 sm:w-[35%] w-[90%]  bg-white z-10 p-2 px-6 pb-6 transition-all border-2 border-black/80 ">
            <p className="text-center text-3xl font-medium mt-2">
              New Category
            </p>
            <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
              <input
                type="text"
                required
                className="w-full py-3 px-2 border border-black "
                placeholder="Name"
              />
              <div className="flex flex-col gap-1">
                <p>Image</p>
                <div className="flex gap-2">
                  <CldUploadWidget
                    uploadPreset="arytrzdd"
                    onUpload={handleImageUpload}
                  >
                    {({ open }) => {
                      return (
                        <button
                          className="flex flex-col gap-2 w-24 min-w-24 min-h-24 h-24 border cursor-pointer items-center justify-center border-black hover:bg-black/5 transition-colors"
                          onClick={() => open()}
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
                  {Image !== '' && (
                    <div className="relative">
                      <CldImage
                        width="96"
                        height="96"
                        src={Image}
                        sizes="100vw"
                        alt={'img'}
                        draggable={false}
                        className="w-24 h-24 min-w-24 min-h-24 object-cover z-20"
                      />
                      <div
                        className="flex items-center justify-center absolute w-6 h-6 bg-red-500 top-0 right-0 cursor-pointer z-0 hover:bg-red-600 transition-all"
                        onClick={() => setImage('')}
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
              <button
                type="submit"
                className="mx-auto px-3 bg-green py-2 border bg-green-400 w-full hover:opacity-90 transition-all active:scale-95 border-black "
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      {Editing && (
        <div className="top-0 left-0 w-screen h-screen absolute flex items-center justify-center">
          <div
            className="w-full h-full absolute top-0 left-0 bg-black/40 z-0"
            onClick={() => {
              setEditing(false);
            }}
          />
          <div className="flex flex-col gap-8 sm:w-[35%] w-[90%]  bg-white z-10 p-2 px-6 pb-6 transition-all border-2 border-black/80 ">
            <p className="text-center text-3xl font-medium mt-2">
              Edit Category
            </p>
            <form
              className="flex flex-col gap-3"
              onSubmit={handleEditFormSubmit}
            >
              <input
                type="text"
                required
                className="w-full py-3 px-2 border border-black "
                placeholder={name}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <div className="flex flex-col gap-1">
                <p>Image</p>
                <div className="flex gap-2">
                  <CldUploadWidget
                    uploadPreset="arytrzdd"
                    onUpload={handleImageUpload}
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
                  {Image !== '' && (
                    <div className="relative">
                      <CldImage
                        width="96"
                        height="96"
                        src={Image}
                        sizes="100vw"
                        alt={'img'}
                        draggable={false}
                        className="w-24 h-24 min-w-24 min-h-24 object-cover z-20"
                      />
                      <div
                        className="flex items-center justify-center absolute w-6 h-6 bg-red-500 top-0 right-0 cursor-pointer z-0 hover:bg-red-600 transition-all"
                        onClick={() => setImage('')}
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
              <button
                type="submit"
                className="mx-auto px-3 bg-green py-2 border bg-green-400 w-full hover:opacity-90 transition-all active:scale-95 border-black "
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
