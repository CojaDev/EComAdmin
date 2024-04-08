'use client';
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
const DashCards = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [data, setData] = useState({
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'Jun',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'Profit',
        data: [0, 20, 60, 40, 80, 100, 95, 70, 30, 10, 40, 75],
        borderColor: '#30C55E',
      },
    ],
  });
  const [revenue, setRevenue] = useState(0);
  const [countProd, setCountProd] = useState(0);
  const [countRev, setCountRev] = useState(0);
  useEffect(() => {
    axios.get('/api/products').then((response) => {
      setProducts(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get('/api/orders').then((response) => {
      setOrders(response.data);
    });
  }, []);
  useEffect(() => {
    // Calculate total revenue when orders change
    const totalRevenue = orders.reduce((acc, order) => {
      // Assuming each order has a products property which is an array
      const orderTotal = order.products.reduce((orderAcc, product) => {
        // Assuming each product has price and expenses properties
        return Number(product.price) - Number(product.expenses);
      }, 0);
      return acc + orderTotal;
    }, 0);
    setRevenue(totalRevenue);
  }, [orders]);

  useEffect(() => {
    const targetProducts = products.length;
    let currentCount = 0;
    const maxDuration = 4000; // Maximum duration in milliseconds
    const steps = 80; // Number of steps to reach the target duration

    const intervalDuration = Math.min(
      maxDuration / steps,
      maxDuration / targetProducts
    );

    const interval = setInterval(() => {
      if (currentCount <= targetProducts) {
        setCountProd(currentCount);
        currentCount += Math.ceil(targetProducts / steps);
      } else {
        clearInterval(interval);
      }
    }, intervalDuration);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [products]);

  useEffect(() => {
    const targetRevenue = revenue;
    let currentCount = 0;
    const maxDuration = 4000; // Maximum duration in milliseconds
    const steps = 80; // Number of steps to reach the target duration

    const intervalDuration = Math.min(
      maxDuration / steps,
      maxDuration / targetRevenue
    );

    const interval = setInterval(() => {
      if (currentCount <= targetRevenue) {
        setCountRev(currentCount);
        currentCount += Math.ceil(targetRevenue / steps);
      } else {
        clearInterval(interval);
      }
    }, intervalDuration);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [revenue]);

  return (
    <>
      <div className=" flex sm:flex-row flex-col items-center justify-center gap-4 my-5 max-w-[95.2%] w-full bg-white ">
        <div className="card flex flex-col sm:p-9 p-5 px-1 w-full items-center justify-center  flex-1 border border-black h-full">
          <h5 className="text-center text-lg opacity-90 -mt-2">Revenue</h5>
          <h2 className="sm:text-5xl text-3xl text-center">
            <span className="text-green-500">{countRev}</span> RSD
          </h2>
        </div>

        <div className="card flex flex-col sm:p-9 p-5 px-1 w-full items-center justify-center  flex-1 border border-black h-full">
          <h5 className="text-center text-lg opacity-90 -mt-2">
            Total Products
          </h5>
          <h2 className="sm:text-5xl text-3xl text-center">
            <span className="text-green-500">{countProd}</span>
          </h2>
        </div>

        <div className="card flex flex-col sm:p-9 p-5 px-1 w-full items-center justify-center  flex-1 border border-black h-full">
          <h5 className="text-center text-lg opacity-90 -mt-2">Total Orders</h5>
          <h2 className="sm:text-5xl text-3xl text-center">
            <span className="text-green-500">{orders.length}</span>
          </h2>
        </div>
        <div className="card flex flex-col sm:p-9 p-5 px-1 w-full items-center justify-center  flex-1 border border-black h-full">
          <h5 className="text-center text-lg opacity-90 -mt-2">
            Today's Orders
          </h5>
          <h2 className="sm:text-5xl text-3xl text-center">
            <span className="text-green-500">0</span>
          </h2>
        </div>
      </div>
      <div className="w-full flex max-w-[95.2%] ">
        <div className=" w-full border border-black mb-16 ">
          <Line
            data={data}
            options={{
              maintainAspectRatio: true, // Make the chart responsive
              scales: {
                x: {
                  ticks: {
                    display: window.innerWidth > 768, // Hide X-axis ticks on smaller screens
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default DashCards;
