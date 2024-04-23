'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { usePathname } from 'next/navigation';
import Topbar from '../../components/Topbar';
import EditProductsForm from '../../components/EditProductsForm';
import Link from 'next/link';
import Spinner from '../../components/Spinner';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState(null);
  const [exists, setExist] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const pathname = usePathname();
  const productId = pathname.split('/')[2];

  useEffect(() => {
    axios
      .get('/api/products')
      .then((response) => {
        setProducts(response.data);
        setLoading(false); // Data fetched, loading complete
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false); // Error occurred, loading complete
      });
  }, []);

  useEffect(() => {
    if (productId && products.length > 0) {
      const foundProduct = products.find(
        (product) => product._id === productId
      );
      if (foundProduct) {
        setProductData(foundProduct);
        setExist(true);
      } else {
        setExist(false);
      }
    }
  }, [productId, products]);

  if (loading) {
    return (
      <Spinner
        message={` ${pathname === '/' ? 'Profits' : ''} ${
          pathname.split('/')[1].charAt(0).toUpperCase() +
          pathname.split('/')[1].slice(1)
        }... `}
      />
    );
  }

  return (
    <Layout>
      <div className="w-full min-h-screen flex flex-col">
        <Topbar
          title={`Edit Product - ${productData ? productData.name : 'Product'}`}
        />
        <div className="sm:p-4 p-2 py-1 w-full h-full">
          {exists ? (
            <>
              <EditProductsForm {...productData} />
            </>
          ) : (
            <div className="flex flex-col h-full justify-center items-center transition-opacity">
              <p className="text-5xl text-center -mt-28">
                404 - Product not found
              </p>
              <Link
                href="/products"
                className="text-2xl  mt-5 border-black hover:bg-black hover:text-white transition-all px-2.5 py-1.5 mx-auto border"
              >
                Go Back
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
