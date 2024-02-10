"use client";

import React, { useEffect, useState, useRef } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";
// import Chatbot from "./chatbox";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
import { Viewer, Worker, PageLayout } from "@react-pdf-viewer/core";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
//pdf viewer
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { AiFillFolderOpen } from "react-icons/ai";
import { MdArrowDropDown } from "react-icons/md";

const Summarize = () => {
  const [selectedText, setSelectedText] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [dragging, setDragging] = useState(false);
  const [isList, setIsList] = useState(false);
  const [question, setquestion] = useState("");
  const [output, setoutput] = useState("");
  const [highlight, sethighlight] = useState(false);
  const [type, setType] = useState("qna");
  const [arziveTopic, setArzive] = useState(null);
  const [arziveQuestion, setArziveQuestion] = useState(null);
  const [showArziveQuestion, setShowArziveQuestion] = useState(false);
  const [webLink, setwebLink] = useState(null);
  const [webQuestion, setwebQuestion] = useState(null);
  const [showWebQuestion, setShowWebQuestion] = useState(false);
  const show = useRef(null);

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

  // save highlighted text.
  const handleSelection = () => {
    const selection = window.getSelection();
    setSelectedText(selection.toString());
  };

  // const handleScrollClick = (item) => {
  //   show.current.scrollIntoView({
  //     behavior: 'smooth'
  //   });
  // };

  const handleAskedQuestion = async () => {
    if (pdfFile) {
      const formData2 = new FormData();
      formData2.append("query", question);

      setoutput("Asking AI the question you asked....");

      try {
        const response = await fetch("http://localhost:8000/queryqna", {
          method: "POST",
          body: formData2,
        });
        const data = await response.json();
        console.log(data.response);
        setoutput(data.response);
      } catch (error) {
        console.error(error);
        setoutput("Error answering the query");
        return;
      }
    } else {
      setoutput("Ask some question first!");
    }
  };

  const handleHighlightQuestion = async () => {
    if (selectedText) {
      const formData2 = new FormData();
      formData2.append("query", selectedText);
      formData2.append("context", "jkwdbciwb");

      setoutput("Asking AI the question you asked....");

      try {
        const response = await fetch("http://localhost:8000/queryhighlight", {
          method: "POST",
          body: formData2,
        });
        const data = await response.json();
        console.log(data.response);
        setoutput(data.response);
      } catch (error) {
        console.error(error);
        setoutput("Error answering the query");
        return;
      }
    } else {
      setoutput("Select some text first!");
    }
  };

  const handleArziveClicked = async () => {
    if (arziveTopic) {
      const formData = new FormData();
      formData.append("topic", arziveTopic);

      setoutput("Processing the Topic....");
      try {
        console.log("hello Arzive");
        const response = await fetch("http://localhost:8000/arxiv", {
          method: "POST",
          body: formData,
        });
        console.log("bye Arzive");
        const data = await response.json();
        console.log(data.response);
        setoutput(data.response);
        setShowArziveQuestion(true);
      } catch (error) {
        console.error(error);
        setoutput("Error Proccessing the Topic!");
        return;
      }
    } else {
      setoutput("Add an Arzive Topic!");
    }
  };

  const handleArziveOutput = async () => {
    if (arziveQuestion) {
      const formData = new FormData();
      formData.append("question", arziveQuestion);
      setoutput("Asking AI the question you asked....");

      try {
        const response = await fetch("http://localhost:8000/arxiv_query", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        console.log(data.response);
        setoutput(data.response);
      } catch (error) {
        console.error(error);
        setoutput("Error answering the Arzive Question :-(");
        return;
      }
    } else {
      setoutput("Ask an Arzive Question First!");
    }
  };

  const handleWebClicked = async () => {
    if (webLink) {
      const formData = new FormData();
      formData.append("link", webLink);

      setoutput("Processing the Link....");
      try {
        console.log("hello Link");
        const response = await fetch("http://localhost:8000/url", {
          method: "POST",
          body: formData,
        });
        console.log("bye Link");
        const data = await response.json();
        console.log(data.response);
        setoutput(data.response);
        setShowWebQuestion(true);
      } catch (error) {
        console.error(error);
        setoutput("Error Proccessing the Link!");
        return;
      }
    } else {
      setoutput("Add a Web Link!");
    }
  };

  const handleWebOutput = async () => {
    if (webQuestion) {
      const formData = new FormData();
      formData.append("question", webQuestion);
      setoutput("Asking AI the question you asked....");

      try {
        const response = await fetch("http://localhost:8000/url_query", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        console.log(data.response);
        setoutput(data.response);
      } catch (error) {
        console.error(error);
        setoutput("Error answering the Web Link Question :-(");
        return;
      }
    } else {
      setoutput("Ask a Web Link Question First!");
    }
  };
  ///////////// pdf viewer ///////////

  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // for onchange event
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");

  // for submit event
  const [viewPdf, setViewPdf] = useState(null);
  const [filename, setFileName] = useState(null);

  // onchange event
  const fileType = ["application/pdf"];
  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setFileName(selectedFile.name);
      setIsList(!isList);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError("");
        };
      } else {
        setPdfFile(null);
        setPdfFileError("Please select valid pdf file");
      }
    } else {
      console.log("select your file");
    }
  };

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
        setPdfFileError("");
      };
    } else {
      setPdfFile(null);
      alert("Try Again");
    }
  };

  // form submit
  const handlePdfFileSubmit = async (e) => {
    e.preventDefault();
    // handleScrollClick();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
      console.log(file);
      const formData = new FormData();
      formData.append("filetype", "pdf");
      formData.append("files", file);
      // formData.append("embed_model", "HF")
      formData.append("embed_model", "Openai");
      formData.append("llm_model", "Openai");
      formData.append("ocr", "false");

      setoutput("Proccessing the Document....");
      try {
        console.log("hello");
        console.log(formData);
        const response = await fetch("http://localhost:8000/process", {
          method: "POST",
          body: formData,
        });
        console.log("bye");
        const data = await response.json();
        console.log(data.response);
        setoutput(data.response);
      } catch (error) {
        console.error(error);
        setoutput("Error Proccessing the pdf");
        return;
      }
      setFile(null);
      // setPdfFile(null);
    } else {
      setViewPdf(null);
      setFile(null);
      setPdfFile(null);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Summarize Documents" description="" />

      <section className="pt-[120px] pb-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div>
              <div>
                <div>
                  <div className="bg-slate-950 mx-auto w-[70rem] rounded-lg border p-2">
                    <div
                      className={`${
                        dragging ? "bg-gray-700" : "bg-slate-950"
                      } h-[20rem] rounded-md border-2 border-dashed border-black p-4`}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <form onSubmit={handlePdfFileSubmit}>
                        <div className="mt-20 items-center">
                          <div className="flex flex-col place-items-center items-center justify-center space-y-2">
                            {/* <img src="/folders.png" className="h-[3rem] w-[3rem] my-5" /> */}
                            <AiFillFolderOpen className="h-8 w-8 text-indigo dark:text-white" />
                            <div>
                              <div
                                onClick={() => setIsList(!isList)}
                                className="hover:bg-gray-700
                       flex cursor-pointer items-center justify-between rounded border p-4 text-sm font-medium leading-none text-indigo dark:text-white"
                              >
                                {filename ? `${filename}` : `CHOOSE FILE`}
                                <div className="ml-2">
                                  {isList ? (
                                    <div>
                                      <MdArrowDropDown className="text-indigo dark:text-white" />
                                      {/* <svg
                              width={10}
                              height={6}
                              viewBox="0 0 10 6"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              // style={{ fill: 'indigo' }}
                              className="text-indigo dark:text-white"
                            >
                              <path
                                d="M5.00016 0.666664L9.66683 5.33333L0.333496 5.33333L5.00016 0.666664Z"
                                fill="#1e1b4b"
                              />
                            </svg> */}
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
                                          fill="#FFFFFF"
                                        />
                                      </svg>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            {isList && (
                              <div className="dark:border-gray-300 dark:bg-#121416 mt-2 w-44 rounded border bg-[#f2f6fafb] p-2 shadow">
                                {/* <label> */}
                                {/* <input type="file" className='hidden' /> */}
                                <label htmlFor="file-input">
                                  <input
                                    id="file-input"
                                    type="file"
                                    className="hidden"
                                    onChange={handlePdfFileChange}
                                  />
                                  <div className="hover:bg-gray-700 border-gray-300 my-1 w-full rounded-md py-3 pl-9 text-sm font-medium leading-3 dark:border">
                                    From Device
                                  </div>
                                </label>
                                <button className="hover:bg-gray-700 border-gray-300 my-1 w-full rounded-md border py-3 text-sm font-medium leading-3">
                                  From Google Drive
                                </button>
                              </div>
                            )}
                            {pdfFile && !isList && (
                              <button
                                onClick={handlePdfFileSubmit}
                                type="button"
                                className="from-green-400 to-blue-600 focus:ring-green-200 dark:focus:ring-green-800 ml-4 mt-5 mr-2 mb-2 w-[9rem] rounded-lg bg-gradient-to-br px-5 py-2.5 text-center text-sm font-medium text-indigo hover:bg-gradient-to-bl focus:outline-none focus:ring-4 dark:text-white"
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

              {/* ################# qna section ################# */}
              {type === "qna" && filename && (
                <div className=" flex">
                  <div className="w-[50%] pt-20 pl-16 pr-10">
                    <h1 className="p-3 text-2xl">Selected Document</h1>
                    <div className="rounded border p-5">
                      <div
                        style={{
                          border: "1px solid rgba(0, 0, 0, 0.3)",
                          height: "750px",
                        }}
                        onMouseUp={handleSelection}
                      >
                        {viewPdf && (
                          <>
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js">
                              <Viewer
                                fileUrl={viewPdf}
                                plugins={[defaultLayoutPluginInstance]}
                              />
                            </Worker>
                          </>
                        )}
                      </div>
                    </div>
                    <button></button>
                  </div>
                  <div className="w-[50%] pt-[5rem] pr-20 pl-10">
                    {/* <div class="flex items-center mt-14 ml-3">
            <input onChange={(e) => sethighlight(!highlight)} id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label for="default-checkbox" class="ml-2 text-sm font-medium text-white">Ask Question from selected part of document ?</label>
          </div> */}
                    {highlight && filename && (
                      <>
                        <h1 className="p-3 text-2xl">Selected Text</h1>
                        <div className="mb-5 rounded border">
                          <div className="m-3 bg-[#121416]">
                            <div className="bg-slate-800 max-h-[10rem] overflow-y-scroll p-7">
                              {selectedText
                                ? selectedText
                                : "Select Some texts to asks questions to AI."}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {}
                    {!highlight && filename && (
                      <h1 className="p-3 text-2xl">Ask a Question:</h1>
                    )}
                    <div className="mb-3 flex justify-between p-3">
                      {!highlight && (
                        <div className="w-[92%] rounded border p-2">
                          <input
                            placeholder="Ask a question here..."
                            className="bg-slate-800 h-[2.5rem] w-full p-3 "
                            onChange={(e) => setquestion(e.target.value)}
                          />
                        </div>
                      )}
                      <button
                        onClick={
                          highlight
                            ? handleHighlightQuestion
                            : handleAskedQuestion
                        }
                        type="button"
                        className="from-green-400 to-blue-600 focus:ring-green-200 dark:focus:ring-green-800 mr-2 mb-2 rounded-lg bg-gradient-to-br px-7 py-2.5 text-center text-sm font-medium text-indigo hover:bg-gradient-to-bl focus:outline-none focus:ring-4 dark:text-white"
                      >
                        Ask
                      </button>
                    </div>

                    <h1 className="p-3 text-2xl">AI Output: </h1>
                    
                  </div>
                </div>
              )}
              {/* ################# qna section done ################# */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Summarize;
