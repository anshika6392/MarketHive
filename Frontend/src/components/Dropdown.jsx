// import { useState } from "react";
// import React from "react";

// const Dropdown = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="relative">
//       {/* Button */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="flex items-center gap-1 text-sm font-medium hover:text-blue-600"
//       >
//         Menu
//         <svg
//           className={`w-4 h-4 transition-transform ${
//             open ? "rotate-180" : ""
//           }`}
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path d="m6 9 6 6 6-6" />
//         </svg>
//       </button>

//       {/* Dropdown */}
//       {open && (
//         <div className="absolute top-full mt-2 w-40 bg-white border rounded-md shadow-md">
//           <ul className="text-sm">
//             <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//               Option 1
//             </li>
//             <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//               Option 2
//             </li>
//             <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//               Option 3
//             </li>
//             <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//               Option 4
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dropdown;


import { useState } from "react";

const Dropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm font-medium hover:text-blue-600"
      >
        Menu
        <svg
          className={`w-4 h-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full mt-2 w-40 bg-white border rounded-md shadow-md z-50">
          <ul className="text-sm">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Option 1
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Option 2
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Option 3
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Option 4
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
