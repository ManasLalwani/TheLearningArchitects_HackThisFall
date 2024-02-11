"use client";
import SectionTitle from "../Common/SectionTitle";
import { useState } from "react";
import RentalAgreementForm from "./RentalAgreementForm";
import PowerOfAttorneyForm from "./PowerOfAttorneyForm";
import DivorceAgreementForm from "./DivorceAgreementForm";
import LoanAgreementForm from "./LoanAgreementForm";
import HouseSaleAgreementForm from "./HouseSaleAgreementForm";
import FreelanceContractForm from "./FreelanceContract";


// import { useState } from "react";
// import { useClient } from 'react-server-dom-webpack';
// import React, { useState, useClientEffect,useRef } from 'react';

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const GenerateSectionOne = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const renderSelectedForm = () => {
    switch (selectedOption) {
      case "type1":
        return <RentalAgreementForm />;
      case "type2":
        return <PowerOfAttorneyForm />;
      case "type3":
        return <DivorceAgreementForm />;
      case "type4":
        return <LoanAgreementForm />;
      case "type5":
        return <HouseSaleAgreementForm />;
      case "type6":
        return <FreelanceContractForm />;
      default:
        return null; // Render nothing if no option is selected
    }
  };

  return (
    <section id="about" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="border-body-color/[.15] border-b pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4">
            <div className="w-full px-4">
              <SectionTitle
                title="Choose the type of Document to be generated"
                paragraph=""
                mb="44px"
              />
              <div
                className="wow fadeInUp mb-12 max-w-[570px] lg:mb-0"
                data-wow-delay=".15s"
              >
                <div className="w-full px-4 ">
                  <div className="mb-6">
                    <label
                      htmlFor="documentType"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      Choose the document type:
                    </label>
                    <select
                      id="documentType"
                      value={selectedOption}
                      onChange={handleSelectChange}
                      className="border-body-color mt-2 w-full rounded-md border p-2 shadow-sm focus:border-primary focus:ring-primary"
                    >
                      <option
                        value=""
                        className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      >
                        Select a type
                      </option>
                      <option
                        value="type1"
                        className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0"
                      >
                        Rental Agreement
                      </option>
                      <option
                        value="type2"
                        className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0"
                      >
                        Power of Attorney Agreement
                      </option>
                      <option
                        value="type3"
                        className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0"
                      >
                        Divorce Agreement
                      </option>
                      <option
                        value="type4"
                        className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0"
                      >
                        Loan Agreement
                      </option>
                      <option
                        value="type5"
                        className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0"
                      >
                        House Sale Agreement
                      </option>
                      <option
                        value="type6"
                        className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0"
                      >
                        Freelance Contract
                      </option>
                      {/* <option value="type3">Type 3</option> */}
                    </select>
                  </div>
                  {/* <p className="text-lg font-medium text-body-color">
                    Selected document type: {selectedOption}
                  </p> */}
                </div>
              </div>
            </div>

            {renderSelectedForm()}
            {/* <div className="w-full px-4 lg:w-1/2">
              <div
                className="wow fadeInUp relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0"
                data-wow-delay=".2s"
              >
                <Image
                  src="/images/about/about-image.svg"
                  alt="about-image"
                  fill
                  className="mx-auto max-w-full lg:mr-0"
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenerateSectionOne;
