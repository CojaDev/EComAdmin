'use client';
import Link from 'next/link';
import Topbar from '../components/Topbar';
import Layout from '../components/Layout';
import Lists from '../components/Lists';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ProdTITLES } from '../constants/Headers';
export default function Home() {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <Layout>
      <div className="w-full h-screen flex flex-col">
        <Topbar title={'Products'} />
        <div className="sm:py-6 px-3.5 py-6">
          <Link
            className="bg-green-400 border border-black select-none hover:opacity-85 transition-opacity sm:p-2 p-3 px-2"
            draggable={false}
            href={'/products/new'}
          >
            New Product
          </Link>
        </div>
        <Lists list={Products} headers={ProdTITLES} type="Product" />
      </div>
    </Layout>
  );
}
