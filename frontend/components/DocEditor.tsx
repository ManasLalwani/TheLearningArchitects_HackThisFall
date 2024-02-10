import React, { useState, useRef , useEffect} from "react";
import JoditEditor from "jodit-react";
import { rentalAgreementFormat } from "../templates/rental";
import {freelanceContractFormat} from "../templates/freelance";
import {powerOfAttorneyFormat} from "../templates/attorney";
import {divorceAgreementFormat} from "../templates/divorce";
import {houseSaleAgreementFormat} from "../templates/housesale";
import {loanAgreementFormat} from "../templates/loan";

import jsPDF from "jspdf";

const DocEditor = ({ selectedOption, formData }) => {
  const [content, setContent] = useState("");

  // Function to render different templates based on selected option
  const renderContent = () => {
    switch (selectedOption) {
      case "type1":
        return renderAgreement(rentalAgreementFormat);
        // console.log(rentalAgreementFormat);

      case "type2":
        return renderAgreement(powerOfAttorneyFormat);
        // return <PowerOfAttorneyForm />;
        
      case "type3":
        return renderAgreement(divorceAgreementFormat);
        // return <DivorceAgreementForm />;        
      case "type4":
        return renderAgreement(loanAgreementFormat);
        // return <LoanAgreementForm />;
      case "type5":
        return renderAgreement(houseSaleAgreementFormat);
        // return <HouseSaleAgreementForm />;
      case "type6":
        return renderAgreement(freelanceContractFormat);
      

        // console.log(freelanceContractFormat);
      // Add cases for other template formats
      default:
        return ""; // Render nothing if no option is selected
    }
  };

  // Function to replace placeholders with actual data
  const renderAgreement = (agreementFormat) => {
    let agreementText = agreementFormat;
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const placeholder = `{${key}}`;
        agreementText = agreementText.replace(
          new RegExp(placeholder, "g"),
          formData[key]
        );
      }
    }
    return agreementText;
  };

  // Initialize content with the rendered template
  useEffect(() => {
    setContent(renderContent());
  }, [selectedOption, formData]);

  const generatePdf = () => {
    const doc = new jsPDF("p", "pt", "a4");
    doc.html(content, {
      callback: function (doc) {
        doc.save("generated.pdf");
      },
      x: 10,
      y: 10,
      margin: [10, 10, 10, 10],
    });
  };

  return (
    <div>
      <JoditEditor
        value={content}
        onChange={(newContent) => setContent(newContent)}
      />
      <button onClick={() => generatePdf()}>Download PDF</button>
    </div>
  );
};

export default DocEditor;


// "use client";
// import React, { useState, useRef, useMemo } from "react";
// import JoditEditor from "jodit-react";
// import { rentalAgreementFormat } from "../templates/rental";
// import {freelanceContractFormat} from "../templates/freelance";
// import jsPDF from "jspdf";
// import axios from "axios";

// const DocEditor = ({ doc }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [showModal2, setShowModal2] = useState(false);
//   // const [showModal3, setShowModal3] = useState(false);
//   const [query, setQuery] = useState("");
//   const [queryResponse, setQueryResponse] = useState("");

//   const [formData, setFormData] = useState(doc);
//   const [selectedOption, setSelectedOption] = useState("hi");

//   const handleSelectChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   // Function to replace placeholders with actual data
//   const renderAgreement = () => {
//     let agreementText = rentalAgreementFormat;
//     for (const key in formData) {
//       if (formData.hasOwnProperty(key)) {
//         const placeholder = `{${key}}`;
//         agreementText = agreementText.replace(
//           new RegExp(placeholder, "g"),
//           formData[key]
//         );
//       }
//     }
//     return agreementText;
//   };

//   const editor = useRef(null);
//   const [content, setContent] = useState(renderAgreement());

//   const generatePdf = () => {
//     // const pdf = new jsPDF();
//     // pdf.html(content);
//     // pdf.save("generated.pdf");

//     // console.log(content);

//     var doc = new jsPDF("p", "pt", "a4");

//     doc.html(
//       `<div style='font-size:11px; border:1px solid; background-color: rgb(239 240 240); padding: 50px 45px; width:28vw;'>${content}</div>`,
//       {
//         callback: function (doc) {
//           doc.save("generated.pdf");
//         },
//         x: 10,
//         y: 10,
//         margin: [10, 10, 10, 10],
//       }
//     );
//   };

//   const generateTranslatedPdf = async () => {
//     // const formData = new FormData();
//     // formData.append("text", content.substring(1, content.length-1));
//     // formData.append("lang", "hi");
//     //   for (const value of formData.values()) {
//     //   console.log(value);
//     // }
//     //   return;
//     const requestData = {
//       text: content.substring(1, content.length - 1),
//       lang: "hi",
//     };
//     try {
//       // const response = await fetch("http://localhost:8000/convert-text", {
//       //   method: "POST",
//       //   headers: {
//       //     "Content-Type": "application/x-www-form-urlencoded",
//       //   },
//       //   body: JSON.stringify(requestData),
//       // });
//       // const data = await response.json();
//       // console.log(data.response);

//       await axios({
//         method: "post",
//         url: "http://localhost:8000/convert-text",
//         data: requestData,
//         headers: { "Content-Type": "multipart/form-data" },
//       })
//         .then(function (response) {
//           //handle success
//           console.log(response);
//         })
//         .catch(function (response) {
//           //handle error
//           console.log(response);
//         });

//       var doc = new jsPDF("p", "pt", "a4");

//       doc.html(
//         `<div style='font-size:11px; border:1px solid; background-color: rgb(239 240 240); padding: 50px 45px; width:28vw;'>${content}</div>`,
//         {
//           callback: function (doc) {
//             doc.save("generated.pdf");
//           },
//           x: 10,
//           y: 10,
//           margin: [10, 10, 10, 10],
//         }
//       );
//     } catch (error) {
//       console.error(error);
//       return;
//     }
//   };

//   const [prompt, setPrompt] = useState("");
//   const handleChange = (e) => {
//     setPrompt(e.target.value);
//   };

//   const [customizedDoc, setCustomizedDoc] = useState("");

//   const customize = async () => {
//     await axios
//       .post("http://127.0.0.1:5000/customize", {
//         user_prompt: prompt,
//         doc: content,
//       })
//       .then(function (response) {
//         console.log(response);
//         setCustomizedDoc(response["data"]["choices"][0]["message"]["content"]);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };

//   const getQueryResponse = async (query) => {
//     await axios
//       .post("http://127.0.0.1:5000/query", {
//         user_prompt:
//           query == "suggestions"
//             ? "give suggestions to improve this rental agreement in bullet points"
//             : "find ambiguity in this rental agreement in bullet points",
//         doc: content,
//       })
//       .then(function (response) {
//         console.log(response);
//         setQueryResponse(response["data"]["choices"][0]["message"]["content"]);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };

//   return (
//     <div>
//       <JoditEditor
//         ref={editor}
//         value={content}
//         // config={config}
//         // tabIndex={1} // tabIndex of textarea
//         // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
//         onChange={(newContent) => {
//           setContent(newContent);
//           // console.log(newContent);
//         }}
//       />

//       <div className="flex gap-10 pb-10">
//         <button
//           onClick={() => generatePdf()}
//           className="mt-10 flex w-full items-center justify-center rounded-md bg-primary px-9 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
//         >
//           Download PDF
//         </button>

        

//         <button
//           onClick={() => setShowModal(true)}
//           className="mt-10 flex w-full items-center justify-center rounded-md bg-primary px-9 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
//         >
//           Customize Document
//         </button>

//         <button
//           onClick={async () => {
//             setShowModal2(true);
//             setQuery("suggestions");
//             await getQueryResponse("suggestions");
//           }}
//           className="mt-10 flex w-full items-center justify-center rounded-md bg-primary px-9 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
//         >
//           Get Suggestions
//         </button>

//         <button
//           onClick={async () => {
//             setShowModal2(true);
//             setQuery("ambiguity");
//             await getQueryResponse("ambiguity");
//           }}
//           className="mt-10 flex w-full items-center justify-center rounded-md bg-primary px-9 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
//         >
//           Find Ambiguity
//         </button>
//       </div>

//       {showModal ? (
//         <>
//           <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
//             <div className="relative mx-auto my-6 w-11/12 max-w-3xl">
//               {/*content*/}
//               <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
//                 {/*header*/}
//                 <div className="border-slate-200 flex items-start justify-between rounded-t border-b border-solid p-5">
//                   <h3 className="text-3xl font-semibold">Customize Document</h3>
//                   <button
//                     className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
//                     onClick={() => setShowModal(false)}
//                   >
//                     <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
//                       x
//                     </span>
//                   </button>
//                 </div>
//                 {/*body*/}
//                 <div className="relative flex-auto px-6">
//                   <p className="text-slate-500 my-4 text-lg leading-relaxed">
//                     <label
//                       htmlFor="prompt"
//                       className="mb-3 block text-sm font-medium text-dark dark:text-white"
//                     >
//                       Enter the prompt
//                     </label>
//                     <div className="flex">
//                       <input
//                         id="prompt"
//                         name="prompt"
//                         onChange={handleChange}
//                         value={prompt}
//                         type="text"
//                         placeholder="Enter the prompt"
//                         className="text-body-color placeholder-body-color w-full rounded-md border border-transparent px-6 py-3 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
//                       />
//                       <button
//                         onClick={async () => {
//                           await customize();
//                         }}
//                         className="flex w-20 items-center justify-center rounded-md bg-primary px-9 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
//                       >
//                         Submit
//                       </button>
//                     </div>
//                   </p>
//                 </div>

//                 <div className="relative flex-auto px-6">
//                   <p
//                     className="text-slate-500 my-4 h-64 overflow-y-auto text-lg	leading-relaxed"
//                     dangerouslySetInnerHTML={{ __html: customizedDoc }}
//                   ></p>
//                 </div>
//                 {/*footer*/}
//                 <div className="border-slate-200 flex items-center justify-end gap-10 rounded-b border-t border-solid p-6">
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="flex w-full items-center justify-center rounded-md bg-red px-9 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
//                   >
//                     Discard
//                   </button>

//                   <button
//                     onClick={async () => {
//                       setContent(customizedDoc);
//                       setShowModal(false);
//                     }}
//                     className="flex w-full items-center justify-center rounded-md bg-primary px-9 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
//                   >
//                     Use this
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
//         </>
//       ) : null}

//       {showModal2 ? (
//         <>
//           <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
//             <div className="relative mx-auto my-6 w-11/12 max-w-3xl">
//               {/*content*/}
//               <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
//                 {/*header*/}
//                 <div className="border-slate-200 flex items-start justify-between rounded-t border-b border-solid p-5">
//                   <h3 className="text-3xl font-semibold">
//                     {query === "suggestions"
//                       ? "Get Suggestions"
//                       : "Find Ambiguity"}
//                   </h3>
//                   <button
//                     className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
//                     onClick={() => setShowModal2(false)}
//                   >
//                     <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
//                       x
//                     </span>
//                   </button>
//                 </div>
//                 {/*body*/}
//                 <div className="relative flex-auto px-6">
//                   <p
//                     className="text-slate-500 my-4 h-64 overflow-y-auto text-lg	leading-relaxed"
//                     dangerouslySetInnerHTML={{ __html: queryResponse }}
//                   ></p>
//                 </div>
//                 {/*footer*/}
//                 <div className="border-slate-200 flex items-center justify-end gap-10 rounded-b border-t border-solid p-6">
//                   <button
//                     onClick={async () => {
//                       setShowModal2(false);
//                       setQueryResponse("");
//                     }}
//                     className="flex w-full items-center justify-center rounded-md bg-primary px-9 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
//         </>
//       ) : null}

     
//     </div>
//   );
// };

// export default DocEditor;
