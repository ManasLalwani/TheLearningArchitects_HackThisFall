"use client"


import Link from "next/link";
import React,{ useState, useRef } from "react";
import { Viewer, Worker, PageLayout } from "@react-pdf-viewer/core";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
//pdf viewer
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const summarizePage = () => {
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

  const handleScrollClick = (item) => {
    show.current.scrollIntoView({
      behavior: "smooth",
    });
  };

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
    handleScrollClick();
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
    <div>
      <section className="relative z-10 overflow-hidden pt-3 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div>
                <div className="bg-[#121416]">
                  <div>
                    <div className="bg-slate-950 mx-auto w-[70rem] rounded-lg border p-2">
                      <div
                        className={`${
                          dragging ? "bg-gray-700" : "bg-slate-950"
                        } h-[20rem] rounded-md border-2 border-dashed border-white p-4`}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      >
                        <form onSubmit={handlePdfFileSubmit}>
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <img
                              src="/folders.png"
                              className="my-5 h-[3rem] w-[3rem]"
                            />
                            <div>
                              <div
                                onClick={() => setIsList(!isList)}
                                className="hover:bg-gray-700 flex cursor-pointer items-center justify-between rounded border p-4 text-sm font-medium leading-none text-white"
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
                                          fill="#FFFFFF"
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
                                          fill="#FFFFFF"
                                        />
                                      </svg>
                                    </div>
                                  )}
                                </div>
                              </div>
                              {isList && (
                                <div className="border-gray-300 mt-2 w-44 rounded border bg-[#121416] p-2 shadow">
                                  {/* <label> */}
                                  {/* <input type="file" className='hidden' /> */}
                                  <label htmlFor="file-input">
                                    <input
                                      id="file-input"
                                      type="file"
                                      className="hidden"
                                      onChange={handlePdfFileChange}
                                    />
                                    <div className="hover:bg-gray-700 border-gray-300 my-1 w-full rounded-md border py-3 pl-9 text-sm font-medium leading-3">
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
                                  class="from-green-400 to-blue-600 focus:ring-green-200 dark:focus:ring-green-800 ml-4 mt-5 mr-2 mb-2 w-[9rem] rounded-lg bg-gradient-to-br px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4"
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

                {/* ################# feature section ################# */}
                <section class="bg-[#121416] pt-32 pb-10 text-white" ref={show}>
                  <div class="mx-10 px-4 py-8">
                    <div class="mx-auto max-w-lg text-center">
                      <h2 class="text-3xl font-bold sm:text-4xl">
                        Select a Tool
                      </h2>

                      {/* <p class="mt-4 text-gray-300">
              Our website is designed with a wide range of features which are intended to make the user experience more intuitive, efficient, and enjoyable. Here are some of the key features:
            </p> */}
                    </div>

                    <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                      <div
                        onClick={() => {
                          setType("qna");
                          sethighlight(false);
                        }}
                        class="border-gray-800 hover:border-cyan-500/10 hover:shadow-cyan-500/10 block rounded-xl border p-8 shadow-xl transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="text-cyan-500 h-10 w-10"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                          />
                        </svg>

                        <h2 class="mt-4 text-xl font-bold text-white">
                          Ask QnA
                        </h2>

                        <p class="text-gray-300 mt-1 text-sm">
                          This tool allows user to generate better insights on a
                          given topic by analyzing the content. Thus allowing
                          user to have better understanding and improve
                          understanding by asking ample of questions to AI.
                        </p>
                      </div>

                      <div
                        onClick={(e) => {
                          setType("qna");
                          sethighlight(true);
                        }}
                        class="border-gray-800 hover:border-cyan-500/10 hover:shadow-cyan-500/10 block rounded-xl border p-8 shadow-xl transition"
                        href="/services/digital-campaigns"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="text-cyan-500 h-10 w-10"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                          />
                        </svg>

                        <h2 class="mt-4 text-xl font-bold text-white">
                          Explain Highligthed Code
                        </h2>

                        <p class="text-gray-300 mt-1 text-sm">
                          This tool allows user to generate better insights on a
                          given topic by analyzing the content. Thus allowing
                          user to have better understanding and improve
                          understanding by asking ample of questions to AI.
                        </p>
                      </div>

                      <div
                        onClick={() => setType("arzive")}
                        class="border-gray-800 hover:border-cyan-500/10 hover:shadow-cyan-500/10 block rounded-xl border p-8 shadow-xl transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="text-cyan-500 h-10 w-10"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                          />
                        </svg>

                        <h2 class="mt-4 text-xl font-bold text-white">
                          Arzive
                        </h2>
                        <p class="text-gray-300 mt-1 text-sm">
                          Understanding and reading research articles, paper has
                          been a headache for user. This tool increase
                          readablity and understandability of research article
                          thus providing a boon to researchers.
                        </p>
                      </div>
                      <div
                        onClick={() => setType("web")}
                        class="border-gray-800 hover:border-cyan-500/10 hover:shadow-cyan-500/10 block rounded-xl border p-8 shadow-xl transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="text-cyan-500 h-10 w-10"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                          />
                        </svg>

                        <h2 class="mt-4 text-xl font-bold text-white">Web</h2>
                        <p class="text-gray-300 mt-1 text-sm">
                          Understanding and reading research articles, paper has
                          been a headache for user. This tool increase
                          readablity and understandability of research article
                          thus providing a boon to researchers.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
                {/* ################# feature section done ################# */}
                {/* ################# qna section ################# */}
                {type === "qna" && filename && (
                  <div className="flex bg-[#121416]">
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
                              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
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
                          <div className="w-[82%] rounded border p-2">
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
                          class="from-green-400 to-blue-600 focus:ring-green-200 dark:focus:ring-green-800 mr-2 mb-2 rounded-lg bg-gradient-to-br px-7 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4"
                        >
                          Ask
                        </button>
                      </div>

                      <h1 className="p-3 text-2xl">AI Output: </h1>
                      <div className="rounded border">
                        <Chatbox
                          text={output ? output : "Hello! Ask Me Anything ?"}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/* ################# qna section done ################# */}
                {/* ################# arzive section ################# */}
                {type === "arzive" && filename && (
                  <div className="bg-[#121416] px-[20rem]">
                    <h1 className="p-3 text-2xl">Add a Arzive Topic:</h1>
                    <div className="flex">
                      <div className="w-[85%] rounded border p-2">
                        <input
                          placeholder="Add a topic here..."
                          className="bg-slate-800 h-[2rem] w-full p-3 "
                          onChange={(e) => setArzive(e.target.value)}
                        />
                      </div>
                      <button
                        onClick={handleArziveClicked}
                        type="button"
                        class="from-green-400 to-blue-600 focus:ring-green-200 dark:focus:ring-green-800 mx-4 mr-2 mb-2 rounded-lg bg-gradient-to-br px-7 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4"
                      >
                        {" "}
                        Add
                      </button>
                    </div>
                    {showArziveQuestion && (
                      <>
                        <h1 className="p-3 text-2xl">Ask Question :</h1>
                        <div className="flex">
                          <div className="w-[85%] rounded border p-2">
                            <input
                              placeholder="Ask a question here..."
                              className="bg-slate-800 h-[2rem] w-full p-3 "
                              onChange={(e) =>
                                setArziveQuestion(e.target.value)
                              }
                            />
                          </div>
                          <button
                            onClick={handleArziveOutput}
                            type="button"
                            class="from-green-400 to-blue-600 focus:ring-green-200 dark:focus:ring-green-800 mx-4 mr-2 mb-2 rounded-lg bg-gradient-to-br px-7 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4"
                          >
                            Ask
                          </button>
                        </div>
                      </>
                    )}
                    <h1 className="p-3 text-2xl">AI Output: </h1>
                    <div className="rounded border">
                      <Chatbox
                        text={output ? output : "Hello! Ask Me Anything ?"}
                      />
                    </div>
                  </div>
                )}
                {/* ################# arvize section done ################# */}
                {/* ################# web section ################# */}
                {type === "web" && filename && (
                  <div className="bg-[#121416] px-[20rem]">
                    <h1 className="p-3 text-2xl">Add a Web Topic:</h1>
                    <div className="flex">
                      <div className="w-[85%] rounded border p-2">
                        <input
                          placeholder="Add a Link here..."
                          className="bg-slate-800 h-[2rem] w-full p-3 "
                          onChange={(e) => setwebLink(e.target.value)}
                        />
                      </div>
                      <button
                        onClick={handleWebClicked}
                        type="button"
                        class="from-green-400 to-blue-600 focus:ring-green-200 dark:focus:ring-green-800 mx-4 mr-2 mb-2 rounded-lg bg-gradient-to-br px-7 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4"
                      >
                        {" "}
                        Add
                      </button>
                    </div>
                    {showWebQuestion && (
                      <>
                        <h1 className="p-3 text-2xl">Ask Question :</h1>
                        <div className="flex">
                          <div className="w-[85%] rounded border p-2">
                            <input
                              placeholder="Ask a question here..."
                              className="bg-slate-800 h-[2rem] w-full p-3 "
                              onChange={(e) => setwebQuestion(e.target.value)}
                            />
                          </div>
                          <button
                            onClick={handleWebOutput}
                            type="button"
                            class="from-green-400 to-blue-600 focus:ring-green-200 dark:focus:ring-green-800 mx-4 mr-2 mb-2 rounded-lg bg-gradient-to-br px-7 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4"
                          >
                            {" "}
                            Ask
                          </button>
                        </div>
                      </>
                    )}
                    <h1 className="p-3 text-2xl">AI Output: </h1>
                    <div className="rounded border">
                      <Chatbox
                        text={output ? output : "Hello! Ask Me Anything ?"}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </div>
  );
};

export default summarizePage;
