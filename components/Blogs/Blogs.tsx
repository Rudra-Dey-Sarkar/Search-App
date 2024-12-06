"use client"
import React, { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation';

type Blog = {
    _id: string;
    title: string;
    content: string;
    author: string;
    date: string;
    tags: string[];
}

function Blogs() {
    const router = useRouter();
    const [datas, setDatas] = useState<Blog>();
    async function GetStoreData() {
        try {
            const cookie = await getCookie("datas");
            if (cookie) {
                setDatas(JSON.parse(cookie));
            }

        } catch (error) {
            console.log(error);
        }
    }


    function Back() {
        router.push("/");
    }

    useEffect(() => {
        GetStoreData();
    }, [])
    return (
        <div className='p-9'>
            <button 
            className='flex gap-x-2 mb-2'
            onClick={() => Back()}>
                <svg
                    fill="#000000"
                    width="25px"
                    height="25px"
                    viewBox="0 0 524 524"
                    style={{
                        shapeRendering: 'geometricPrecision',
                        textRendering: 'geometricPrecision',
                        // Type assertion applied here for "optimizeQuality"
                        imageRendering: 'optimizeQuality' as React.CSSProperties['imageRendering'],
                        fillRule: 'evenodd',
                        clipRule: 'evenodd',
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                    <defs>
                        <style>
                            {`.fil0 {fill:black;fill-rule:nonzero}`}
                        </style>
                    </defs>
                    <g id="Layer_x0020_1">
                        <path
                            className="fil0"
                            d="M262 0c72,0 138,29 185,77 48,47 77,113 77,185 0,72 -29,138 -77,185 -47,48 -113,77 -185,77 -72,0 -138,-29 -185,-77 -48,-47 -77,-113 -77,-185 0,-72 29,-138 77,-185 47,-48 113,-77 185,-77zm177 85c-45,-45 -108,-73 -177,-73 -69,0 -132,28 -177,73 -45,45 -73,108 -73,177 0,69 28,132 73,177 45,45 108,73 177,73 69,0 132,-28 177,-73 45,-45 73,-108 73,-177 0,-69 -28,-132 -73,-177z"
                            id="Curve_x0020_767"
                        />
                        <path
                            className="fil0"
                            d="M208 368c2,3 2,7 0,9 -3,2 -6,2 -9,0l-110 -111c-3,-2 -3,-6 0,-8l110 -111c3,-2 6,-2 9,0 2,2 2,6 0,9l-107 106 107 106z"
                            id="Curve_x0020_456"
                        />
                        <path
                            className="fil0"
                            d="M93 268c-3,0 -6,-3 -6,-6 0,-3 3,-6 6,-6l338 0c3,0 6,3 6,6 0,3 -3,6 -6,6l-338 0z"
                            id="Curve_x0020_45"
                        />
                    </g>
                </svg>
                <p>Back</p>
            </button>
            <div className='border-2 border-gray-500 p-2 rounded-[5px]'>
                <div className='sm:flex sm:justify-between mb-9'>
                    <p className='font-semibold text-[30px]'>{datas?.title}</p>
                    <p>Date :- {datas?.date}</p>
                </div>
                <p className='font-[600] text-[15px]'>{datas?.content}</p>
                <p>Author :- {datas?.author}</p>
            </div>
        </div>
    )
}

export default Blogs