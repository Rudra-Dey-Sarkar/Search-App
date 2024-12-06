"use client"
import { useState } from "react";
import SearcBox from "../../components/SearchBox/SearcBox";

export default function SearchButton() {
  const [searchActive, setSearchActive] = useState<boolean>(false)
  return (
    <div>
      {searchActive === true && <div
        onClick={() => setSearchActive(false)}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div
          className=" rounded-md shadow-lg "
          onClick={(e) => e.stopPropagation()}>
          <SearcBox />
        </div>
      </div>}

      <button
        onClick={() => setSearchActive(true)}
        className="btn  bg-white flex justify-center items-center gap-x-2 px-14 py-1 rounded-full border-2 border-gray-400">
        <p className="text-[24px] ">Search</p>
        <svg
          fill="#000000"
          width="25px"
          height="25px"
          viewBox="0 0 488.4 488.4"
          xmlns="http://www.w3.org/2000/svg">
          <g>
            <g>
              <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6
            s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2
            S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7
            S381.9,104.65,381.9,203.25z"/>
            </g>
          </g>
        </svg>
      </button>
    </div>

  );
}
