'use client';

import Link from 'next/link';
import React from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';
const Lists = ({ list = [], headers, type, editCategory }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState('');
  const [store, setStore] = useState([]);

  useEffect(() => {
    axios.get('/api/store').then((response) => {
      setStore(response.data);
    });
  }, []);
  useEffect(() => {
    if (window.innerWidth > 1210) setProductsPerPage(10);
    if (window.innerWidth < 1210) setProductsPerPage(9);
    if (window.innerWidth < 1150) setProductsPerPage(14);
    if (window.innerWidth < 768) setProductsPerPage(8);
  }, [productsPerPage]);
  const totalPages = Math.ceil(list.length / productsPerPage);

  // Calculate index of the first and last product to display on current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentList = list.slice(indexOfFirstProduct, indexOfLastProduct);
  let filteredList = [];
  if (type !== 'Orders') {
    filteredList = currentList.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  } else {
    filteredList = currentList.filter((product) =>
      product._id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  const deleteCategory = async (_id) => {
    try {
      await axios.delete('/api/categories/' + _id);
      toast.success('Category Deleted!');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };
  return (
    <div className="px-3 sm:px-0 w-full">
      <div className="mx-auto my-2 w-full md:w-[98.48%] border border-black ">
        <div className="flex gap-2 p-2 text-center justify-between items-center bg-slate-200/60">
          {headers.map((title, index) => (
            <p key={index} className={`${title.style}`}>
              {title.text}
            </p>
          ))}

          <div className="flex mt-2 sm:mt-0 ml-[-150px] gap-1 select-none p-2 sm:py-0.5 py-1.5">
            <input
              type="text"
              className="inputs  ml-auto w-[80%]"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="border-b border-black"></div>

        {!filteredList.length ? (
          <div className="flex bg-white gap-2 p-2 text-center justify-between items-center">
            <p className="my-auto text-left flex-1 sm:block hidden  sm:p-2 p-3 px-2">
              {type === 'Product' && 'No Products'}
              {type === 'Category' && 'No Categories'}
              {type === 'Orders' && 'No Orders'}
            </p>
            {type === 'Product' && (
              <Link
                className="bg-green-400 border border-black select-none hover:opacity-85 transition-opacity sm:p-2 p-3 px-2"
                draggable={false}
                href={'/products/new'}
              >
                New Product
              </Link>
            )}
          </div>
        ) : (
          filteredList.map((list, index) => (
            <div key={index}>
              <div className="flex  bg-white gap-2 p-2 text-center justify-between items-center">
                {type !== 'Category' &&
                  list.images &&
                  list.images.length > 0 &&
                  list.images[0] !== '' && (
                    <img
                      src={list.images[0]}
                      alt={'img' + index}
                      draggable={false}
                      className="w-10 h-10 object-cover border border-black"
                    />
                  )}
                {type !== 'Category' &&
                  list.images &&
                  list.images.length > 0 &&
                  list.images[0] === '' &&
                  list.images[1] &&
                  list.images[1] !== '' && (
                    <img
                      src={list.images[1]}
                      alt={'img' + index}
                      draggable={false}
                      className="w-10 h-10 object-cover border border-black"
                    />
                  )}
                {type === 'Category' && list.images && list.images !== '' && (
                  <img
                    src={list.images}
                    alt={'img' + index}
                    draggable={false}
                    className="w-10 h-10 object-cover border border-black"
                  />
                )}
                <p
                  className={`my-auto text-left flex-1 overflow-hidden whitespace-nowrap text-ellipsis ${
                    list.images &&
                    list.images.length > 0 &&
                    list.images[0] !== ''
                      ? '-mr-[3.2rem]'
                      : ''
                  }
                  ${
                    list.images &&
                    list.images.length > 0 &&
                    list.images[0] === '' &&
                    list.images[1] &&
                    list.images[1] !== ''
                      ? '-mr-[3.2rem]'
                      : ''
                  }`}
                >
                  {list.index ? list.index + 1 + '. ' : ''}
                  {list.index === 0 ? list.index + 1 + '.  ' : ''}
                  {type !== 'Orders' ? list.name : list._id}
                </p>
                <p
                  className={`my-auto text-left flex-1 lg:block hidden overflow-hidden whitespace  -nowrap text-ellipsis max-w-[32rem] ${
                    type === 'Orders' && 'text-sm'
                  }`}
                >
                  {!list?.description ? '' : list.description}
                  {!list?.recipient
                    ? ''
                    : list.recipient.map((data, index) => (
                        <span key={index}>
                          {data.name}, {data.email},<br /> {data.address.street}
                          , {data.address.city}, {data.address.postalCode},{' '}
                          <br />
                          {data.address.state}, {data.address.country}
                        </span>
                      ))}
                </p>

                <p className="my-auto text-left flex-1 sm:block hidden">
                  {!list?.price
                    ? ''
                    : list.price + ' ' + (store ? store.currency : '')}

                  {list.products && list.products.length > 0 && (
                    <>
                      {list.products.map((product, index) => (
                        <span key={index}>
                          {product.productName} -{' '}
                          {product.price + ' ' + (store ? store.currency : '')}
                          {index !== list.products.length - 1 && <br />}{' '}
                        </span>
                      ))}
                    </>
                  )}
                </p>
                <p className="my-auto text-left flex-1 lg:block hidden">
                  {type === 'Product' && list?.category ? list.category : ''}
                  {type === 'Orders' && list?.created ? list.created : ''}
                </p>
                {type === 'Orders' && list?.status ? (
                  <p
                    className={`my-auto text-left flex-1 lg:block hidden font-medium ${
                      list.status === 'Paid'
                        ? 'text-orange-400'
                        : list.status === 'Shipped'
                        ? 'text-green-500'
                        : list.status === 'Canceled'
                        ? 'text-red-500'
                        : ''
                    }`}
                  >
                    {list.status}
                  </p>
                ) : null}

                {type === 'Product' && (
                  <Link
                    className="bg-green-400 border flex gap-1 border-black select-none hover:opacity-85 p-2 sm:py-1.5 py-2.5 transition-all active:scale-95"
                    draggable={false}
                    href={`/products/[product]`}
                    as={'/products/' + list._id}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                    Edit
                  </Link>
                )}
                {type === 'Orders' && (
                  <Link
                    className="bg-green-400 border flex gap-1 border-black select-none hover:opacity-85 p-2 sm:py-1.5 py-2.5 transition-all active:scale-95"
                    draggable={false}
                    href={`/products/[product]`}
                    as={'/products/' + list._id}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                    Edit
                  </Link>
                )}
                {type === 'Category' && (
                  <>
                    <button
                      className=" bg-green-400 border flex gap-1 border-black select-none hover:opacity-85  transition-opacity  sm:p-2 p-3 px-2"
                      draggable={false}
                      onClick={() => {
                        editCategory(list._id, list.name, list.images);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      className=" bg-red-500 border flex gap-1 border-black select-none hover:opacity-85  transition-opacity  sm:p-2 p-3 px-2"
                      draggable={false}
                      onClick={() => {
                        deleteCategory(list._id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-[1.45rem] h-[1.45rem]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              {index !== filteredList.length - 1 && (
                <div className="border-b border-black"></div>
              )}
            </div>
          ))
        )}
      </div>
      {/* Pagination */}
      <div
        className={`flex justify-center w-full 2xl:pl-[15rem] pl-0 2xl:absolute relative  2xl:bottom-16 bottom-3 left-0 right-0 mt-6  ${
          totalPages < 2 && 'hidden'
        }`}
      >
        <button
          onClick={() => {
            if (currentPage === 1) return;
            setCurrentPage(currentPage - 1);
          }}
          className={`
             
          bg-black text-white
          
         px-3.5 py-2.5 select-none mx-1 m rounded-md transition-all min-w-[2.6rem]`}
        >
          {'<'}
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`${
              currentPage === i + 1
                ? 'bg-black text-white'
                : 'bg-slate-200 hover:bg-gray-300 text-gray-800'
            } px-3.5 py-2.5 select-none mx-1 m rounded-md transition-all min-w-[2.6rem]`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => {
            if (currentPage === totalPages) return;
            setCurrentPage(currentPage + 1);
          }}
          className={`
             
          bg-black text-white
          
         px-3.5 py-2.5 select-none mx-1 m rounded-md transition-all min-w-[2.6rem]`}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default Lists;
