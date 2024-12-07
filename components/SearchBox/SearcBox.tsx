"use client";
import React, { useEffect, useState } from 'react';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

type Blog = {
  _id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
}

function SearchBox() {
  const router = useRouter();
  const [data, setData] = useState<Blog[]>([]); // Default to an empty array
  const [searchData, setSearchData] = useState<string>("");

  function searchBlogs(datas: Blog[], search: string) {
    if (!search) {
      return datas; // Return all blogs if search term is empty
    } else {
      return datas.map((blog) => {
        // Filter matched fields
        const matchedFields: Partial<Blog> = {};
        if (blog.title.toLowerCase().includes(search.toLowerCase())) {
          matchedFields.title = blog.title;
        }
        if (blog.content.toLowerCase().includes(search.toLowerCase())) {
          matchedFields.content = blog.content;
        }
        if (blog.author.toLowerCase().includes(search.toLowerCase())) {
          matchedFields.author = blog.author;
        }
        if (blog.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))) {
          matchedFields.tags = blog.tags.filter((tag) =>
            tag.toLowerCase().includes(search.toLowerCase())
          );
        }

        // Return only the matched fields
        return { ...blog, matchedFields };
      });
    }
  }

  const filteredBlogs = searchBlogs(data, searchData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/blogs'); // Adjusted to the correct API route
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }else{
          const result = await response.json(); // Parse the JSON from the response
          setData(result); // Set the data in the state
        }
      } catch (error) {
        console.log('Error fetching data:', error); // Log errors if any
      }
    };

    fetchData();
  }, []);

  function StoreData(datas: Blog[]) {
    setCookie("datas", datas);
    router.push("/blogs");
  }

  return (
    <div className=' sm:w-[60vw] w-[90vw] rounded-[5px]'>
      <div className=' bg-gray-100 w-full h-12 pr-2 py-[2px] gap-x-2 flex items-center rounded-[5px]'>
        <input
          type="text"
          value={searchData}
          placeholder='Search Tech Blogs. Eg:- C++, C'
          onChange={(e) => setSearchData(e.target.value)}
          className='w-full h-full bg-gray-100 rounded-[5px] px-2'
        />
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
      </div>

      <div className=' w-full h-[195px] overflow-y-auto bg-white rounded-[5px] mt-1'>
        {searchData !== "" ?
          <div>
            {filteredBlogs?.map((blog: any, index: number) => {
              const { matchedFields } = blog;

              const Matched = matchedFields && Object.keys(matchedFields).length > 0;

              return (
                Matched ? (
                  <div key={index} className="border-b font-semibold hover:bg-gray-200 hover:cursor-pointer"
                  onClick={() =>{ 
                    StoreData(blog);
                    }}>
                    {matchedFields?.author || matchedFields?.tags && matchedFields?.tags?.length > 0 ? (
                      <div className='bg-green-200 p-2'>
                        <p>Title:- {blog?.title}</p>
                        <p>Content:- {blog?.content}</p>
                      </div>
                    ) : (
                      <div>
                        {matchedFields?.title && (
                          <div className='bg-green-200 p-2'>
                            <p>Title:- {matchedFields?.title}</p>
                          </div>
                        )}
                        {matchedFields?.content && (
                          <div className='bg-green-200 p-2'>
                            <p>Content:- {matchedFields?.content}</p>
                          </div>
                        )}

                      </div>
                    )}
                  </div>
                ) : null
              );
            })}
          </div> :
          <div>
            {filteredBlogs?.map((blog: any, index: number) => {
              return (
                <div key={index} className=" border-b font-semibold hover:bg-gray-200 hover:cursor-pointer" onClick={() => StoreData(blog)}>
                  {blog?.title && (
                    <div className='p-2'>
                      <p>Title:- {blog?.title}</p>
                    </div>
                  )}
                  {blog?.content && (
                    <div className='p-2'>
                      <p>Content:- {blog?.content}</p>
                    </div>
                  )}
                </div>

              );
            })}
          </div>
        }
      </div>

    </div>
  );
}

export default SearchBox;
