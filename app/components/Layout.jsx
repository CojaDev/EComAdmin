'use client';
import { useSession, signIn } from 'next-auth/react';
import Nav from './Nav';
import FirstTime from './FirstTime';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { usePathname } from 'next/navigation';
export default function Layout({ children }) {
  const pathName = usePathname();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [Firsttime, setFirsttime] = useState(true);
  useEffect(() => {
    axios.get('/api/store').then((response) => {
      if (response?.data) {
        setFirsttime(true);
        console.log('true' + response.data);
      } else {
        setFirsttime(false);
        console.log('false' + response.data);
      }
      setTimeout(() => setLoading(false), 200);
      console.log(response.data);
    });
  }, []);

  if (session) {
    return (
      <>
        {loading ? (
          <Spinner
            message={` ${pathName === '/' ? 'Profits' : ''} ${
              pathName.split('/')[1].charAt(0).toUpperCase() +
              pathName.split('/')[1].slice(1)
            }... `}
          />
        ) : (
          <>
            {Firsttime === true ? (
              <main className="font-sans sm:pl-[15rem] pl-[3.55rem] w-screen h-screen  bg-slate-200/10 overflow-x-hidden flex">
                <Nav />
                {children}
              </main>
            ) : (
              <main
                className="font-sans w-screen h-screen overflow-x-hidden flex"
                style={{
                  backgroundImage: `url(/bg.jpg)`,
                  backgroundRepeat: 'repeat',
                }}
              >
                <FirstTime />
              </main>
            )}
          </>
        )}
      </>
    );
  } else {
    // Handle non-logged-in state
  }
  return (
    <>
      <main
        className="font-sans w-screen h-screen  flex items-center relative"
        style={{
          backgroundImage: `url(/bg.jpg)`,
          backgroundRepeat: 'repeat',
        }}
      >
        <div className="mx-auto rounded-2xl flex flex-col items-center justify-center">
          <p className="sm:text-9xl text-6xl font-semibold">Ecommerce</p>
          <p className="sm:text-8xl text-5xl font-semibold sm:-mt-2">Admin</p>
          <div className="mb-14 mt-4 sm:scale-125 scale-110">
            <button
              onClick={() => signIn('google')}
              className="py-1.5 px-3 rounded-3xl font-medium border border-black cursor-pointer bg-black text-white select-none active:scale-95 hover:bg-white hover:text-black transition-all hover:shadow-md shadow-black"
            >
              Login With Google
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
