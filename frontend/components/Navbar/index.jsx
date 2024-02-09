import React from 'react';
import { useState } from 'react';

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);

  return (
    <header className="text-gray-600 bg-yellow body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img
            src="https://res.cloudinary.com/dbqqvw3gf/image/upload/v1687105882/taste-mosaics/taste-mosaic-logo_dbgtiw.png"
            alt="logo"
            className="w-16 h-16 "
          />
          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg> */}
          <span className="font-serif text-xl font-bold leading-relaxed ml-3 mr-4 py-4 whitespace-nowrap">Taste Mosiac</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:cursor-pointer text-black font-medium hover:text-gray-600" href="/about">About Us</a>
          <a className="mr-5 hover:cursor-pointer text-black font-medium hover:text-gray-600" href="/publish">Publish Recipe</a>
          <a className="mr-5 hover:cursor-pointer text-black font-medium hover:text-gray-600" href="/recipe">Browse Recipes</a>
          <a className="mr-5 hover:cursor-pointer text-black font-medium hover:text-gray-600" href="/generate">Talk with AI</a>
          <a className="mr-5 hover:cursor-pointer text-black font-medium hover:text-gray-600" href="/diet">Diet plan</a>
        </nav>
        <button className="inline-flex items-center text-teal-500 font-medium bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          Button
          {/* <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg> */}
        </button>
      </div>
    </header>
  );
  // return (
  //   <div className='py-8 lg:pt-6 lg:pb-14 bg-violet'>
  //     <div className='container mx-auto lg:relative flex flex-col lg:flex-row lg:justify-between gap-y-4 lg:gap-y-0'>

  //       {/* Logo */}
  //       <div className='flex justify-center lg:justify-start'>
  //         <a href="#">
  //           <img
  //             src="https://res.cloudinary.com/dbqqvw3gf/image/upload/v1687105882/taste-mosaics/taste-mosaic-logo_dbgtiw.png"
  //             alt="Logo"
  //             className='w-32 h-auto'
  //           />
  //         </a>
  //       </div>

  //       {/* Features List */}
  //       <ul className='flex flex-col lg:flex-row gap-4 lg:gap-8'>
  //         <li>
  //           <a href="#" className='text-white hover:text-gray-300'>Feature 1</a>
  //         </li>
  //         <li>
  //           <a href="#" className='text-white hover:text-gray-300'>Feature 2</a>
  //         </li>
  //         <li>
  //           <a href="#" className='text-white hover:text-gray-300'>Feature 3</a>
  //         </li>
  //       </ul>

  //     </div>
  //   </div>
  // );
};

export default Navbar;


// import React from 'react'

// const Navbar = () => {
//   return (
//     <div className='py-8 lg:pt-6 lg:pb-14 bg-violet'>
//         <div className='container mx-auto lg:relative flex flex-col lg:flex-row lg:justify-between gap-y-4 lg:gap-y-0'>

//             {/* logo */}
//             <div className='flex justify-center  '>
//                 <a href="#">
//                     <img src="https://res.cloudinary.com/dbqqvw3gf/image/upload/v1687105882/taste-mosaics/taste-mosaic-logo_dbgtiw.png" alt="" />
//                 </a>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Navbar