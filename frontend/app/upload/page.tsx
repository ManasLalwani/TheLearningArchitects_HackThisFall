"use client";

import React, { useEffect, useState } from "react";
import { storage } from "./firebaseConfig.js";
import { ref, uploadBytes, getDownloadURL, listAll, getMetadata } from "firebase/storage";
import { v4 } from "uuid";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";


const Upload = () => {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [urlList, setUrlList] = useState([]);
  const [isList, setIsList] = useState(false);
  const [message, setMessage] = useState("");



  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  // for onchange event
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState('');

  // for submit event
  const [viewPdf, setViewPdf] = useState(null);
  const [filename, setFileName] = useState(null);

  // onchange event
  const fileType=['application/pdf'];
  const handlePdfFileChange=(e)=>{
    let selectedFile=e.target.files[0];
    setFile(selectedFile);

    if(selectedFile){
      setFileName(selectedFile.name);
      setIsList(!isList);
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = (e) =>{
              setPdfFile(e.target.result);
              setPdfFileError('');
            }
      }
      else{
        setPdfFile(null);
        setPdfFileError('Please select valid pdf file');
      }
    }
    else{
      console.log('select your file');
    }
  }



  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    setFile(null);
    setPdfFile(null);
    setFile(e.dataTransfer.files[0]);

    console.log(file);
    if (file) {
      setFileName(file.name);
      setIsList(!isList);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (e) => {
        setPdfFile(e.target.result);
        setPdfFileError('');
      }
    }else{
      setPdfFile(null);
      alert('Try Again')
    }

  };



  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   setFile(selectedFile);
  // };

  const handleUpload = async () => {
    if (!file) return;

    const imageRef = ref(storage, `/images/${file.name + v4()}`);

    try {
      uploadBytes(imageRef, file)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((downloadURL) => {
          console.log("Download URL", downloadURL);
          setFileUrl(downloadURL);
          setMessage("Uploaded Url 👉🏼 :"+ downloadURL);
        });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const imageListRef = ref(storage, "images/");

  useEffect(() => {
    listAll(imageListRef).then((res) => {
      const promises = res.items.map((item) => {
        return getMetadata(item).then((metadata) => {
          return getDownloadURL(ref(storage, metadata.fullPath)).then((url) => {
            return {
              url: url,
              createdAt: metadata.timeCreated,
              updatedAt: metadata.updated,
              filename: metadata.name.substring(0, metadata.name.length - 36),
            };
          });
        });
      });

      Promise.all(promises)
        .then((dataList) => {
          setUrlList(dataList);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    });
  }, []);

  const tableRows = urlList.map((item) => {
    return (
      <tr
        key={item.filename}
        className="bg-grey border-b dark:bg-gray-200 text-black dark:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-300"
      >
        <td className="py-4 px-6">{item.filename}</td>
        <th
          scope="row"
          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black"
        >
          <Link href={item.url}>Download ⬇️</Link>
          {/* <button
            onClick={() => {
              handleClick(item.url, item.projectName);
            }}
          >
            {item.projectName}
          </button> */}
        </th>

        <td className="py-4 px-6">{item.createdAt.substring(0, 10)}</td>
        <td className="py-4 px-6">{item.updatedAt.substring(0, 10)}</td>

      </tr>
    );
  });





  return (
    <>
      <Breadcrumb
        pageName="Upload Documents"
        description =""
      />

      <section className="pt-[120px] pb-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div>
              {/* <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload File</button> */}
              <div>
                <div className="bg-slate-950 mx-auto w-[70rem] rounded-lg border p-2">
                  <div
                    className={`${
                      dragging ? "bg-gray-200" : "bg-slate-200"
                    } h-[20rem] rounded-md border-2 border-dashed border-white p-4`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <form>
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <img
                          src="/folder3.png"
                          className="my-2 h-[5rem] "
                        />
                        <div>
                          <div
                            onClick={() => setIsList(!isList)}
                            className="hover:bg-gray-200 flex cursor-pointer items-center justify-between rounded border p-4 text-sm font-medium leading-none text-dark dark:text-white"
                          >
                            {filename ? `${filename}` : `CHOOSE FILE`}
                            <div className="ml-2">
                              {isList ? (
                                <div>
                                  <svg
                                    width={10}
                                    height={6}
                                    viewBox="0 0 10 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M5.00016 0.666664L9.66683 5.33333L0.333496 5.33333L5.00016 0.666664Z"
                                      fill="#1D2144"
                                    />
                                  </svg>
                                </div>
                              ) : (
                                <div>
                                  <svg
                                    width={10}
                                    height={6}
                                    viewBox="0 0 10 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M5.00016 5.33333L0.333496 0.666664H9.66683L5.00016 5.33333Z"
                                      fill="#1D2144"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </div>
                          {isList && (
                            <div className="border-grey mt-2 w-44 rounded border bg-gray300 p-2 shadow">
                              {/* <label> */}
                              {/* <input type="file" className='hidden' /> */}
                              <label htmlFor="file-input">
                                <input
                                  id="file-input"
                                  type="file"
                                  className="hidden"
                                  onChange={handlePdfFileChange}
                                />
                                <div className="bg-gray300 hover:bg-gray400 border-2 border-gray400 my-1 w-full rounded-md  py-3 pl-9 text-sm font-medium leading-3">
                                  From Device
                                </div>
                              </label>
                              <button className="bg-gray300 hover:bg-gray400 border-2 border-gray400  my-1 w-full rounded-md  py-3 text-sm font-medium leading-3">
                                From Google Drive
                              </button>
                            </div>
                          )}
                          {pdfFile && !isList && (
                            <button
                              onClick={handleUpload}
                              type="button"
                              className="rounded-lg border from-green-400 to-blue-600 focus:ring-green-200 dark:focus:ring-green-800 ml-4 mt-5 mr-2 mb-2 w-[9rem] bg-gradient-to-br px-5 py-2.5 text-center text-sm font-medium text-dark hover:bg-slate-600 focus:outline-none focus:ring-4"
                            >
                              Upload
                            </button>
                          )}
                          <style>
                            {` .checkbox:checked + .check-icon {
                display: flex;
            }`}
                          </style>
                        </div>
                      </div>
                    </form>
                    <p className="mt-4">{message}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>



          <div>
      {urlList.length ? (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mx-20 my-20">
          <h1 className="mb-8 text-lg text-center">Previously uploaded documents</h1>
          <table className="w-full text-sm text-left text-black dark:text-gray-400">
            <thead className="text-xs text-dark dark:border-gray-400 uppercase bg-white dark:bg-gray-200 dark:text-black">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Document
                </th>
                <th scope="col" className="py-3 px-6">
                  Download Link
                </th>

                <th scope="col" className="py-3 px-6">
                  Created Date
                </th>

                <th scope="col" className="py-3 px-6">
                  Date modified
                </th>
                {/* <th scope="col" className="py-3 px-6"></th> */}
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center">
          <img
            src="https://res.cloudinary.com/sarveshp46/image/upload/v1673158646/nothing-here_w38mzj.webp"
            width={300}
            height={300}
          />
        </div>
      )}
    </div>
        </div>
      </section>
    </>
  );
};

export default Upload;
