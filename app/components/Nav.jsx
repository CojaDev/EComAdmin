import Link from 'next/link';
import { LINKS } from '../constants/nav';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
const Nav = () => {
  const pathname = usePathname();
  const [store, setStore] = useState([]);
  useEffect(() => {
    axios.get('/api/store').then((response) => {
      setStore(response.data);
    });
  }, []);

  return (
    <aside className="absolute top-0 left-0 h-screen flex select-none">
      <div className="md:w-[15rem] md:min-w-[15rem] h-full bg-black text-white p-2 pr-0  flex-col gap-2 pb-4  overflow-hidden sm:flex hidden ">
        <div className="logo flex items-center gap-2 p-2 border-b-2 mb-3 border-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.6}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          <p className="font-medium select-none text-lg poppins-semibold">
            {store && store.name} Admin
          </p>
        </div>

        {LINKS.map((link) => (
          <Link
            href={link.link}
            key={link.key}
            draggable={false}
            className={`${
              link.key === 5 && 'mt-auto'
            } link transition-all flex rounded-l-3xl gap-1 items-center p-2 pl-3 ${
              pathname === link.link
                ? 'bg-white text-black '
                : 'bg-black text-white hover:bg-white hover:text-black'
            } active:text-black/80 active:scale-[0.98] origin-right`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={link.img} />
              {link.key === 3 && (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h.008v.008H6V6Z"
                />
              )}
              {link.key === 5 && (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              )}
            </svg>
            <p>{link.text}</p>
          </Link>
        ))}
      </div>

      <div className="w-auto h-full bg-black text-white p-2 pr-0  flex-col gap-2 pb-4  overflow-hidden sm:hidden flex">
        <div className="logo flex items-center p-2 border-b-2 mb-3 border-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.6}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </div>

        {LINKS.map((link) => (
          <Link
            href={link.link}
            key={link.key}
            className={`${
              link.key === 5 && 'mt-auto'
            } link transition-all flex rounded-l-3xl gap-1 items-center p-2 pl-3 ${
              pathname === link.link
                ? 'bg-white text-black '
                : 'bg-black text-white hover:bg-white hover:text-black'
            } active:text-black/80 active:scale-[0.98] origin-right`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={link.img} />
              {link.key === 3 && (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h.008v.008H6V6Z"
                />
              )}
              {link.key === 5 && (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              )}
            </svg>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Nav;
