'use client';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Lists from '../components/Lists';
import Topbar from '../components/Topbar';
import Spinner from '../components/Spinner';
import { OrderTITLES } from '../constants/Headers';
import axios from 'axios';
export default function Home() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get('/api/orders').then((res) => {
      setOrders(res.data);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <Spinner message={`Orders... `} />;
  }
  return (
    <Layout>
      <div className="w-full h-screen flex flex-col">
        <Topbar title={'Orders'} />
        <Lists list={orders} headers={OrderTITLES} type="Orders" />
      </div>
    </Layout>
  );
}
