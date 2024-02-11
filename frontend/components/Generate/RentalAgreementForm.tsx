"use client";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RentalAgreementForm = () => {
  const { push } = useRouter();

  const handleSubmit = async (values) => {
    console.log("submitted");
    console.log(values);
  };

  const formData = useFormik({
    initialValues: {
      value:"type1",
      agreementCity: "",
      agreementState: "",
      agreementDate: "",
      landlordName: "",
      landlordAddress: "",
      tenantName: "",
      tenantAddress: "",
      propertyAddress: "",
      propertyType: "",
      noOfBedrooms: "",
      noOfBathrooms: "",
      noOfCarparks: "",
      propertyArea: "",
      leaseTerm: "",
      leaseStartDate: "",
      rent: "",
      rentDueDate: "",
      startingMeterReading: "",
      rentalDeposit: "",
      witnessOneName: "",
      witnessOneAddress: "",
      witnessTwoName: "",
      witnessTwoAddress: "",
    },
    onSubmit: handleSubmit,
  });
  return (
    <>
      <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto rounded-md bg-primary bg-opacity-5 py-10 px-6 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Enter your details
                </h3>
                <br></br>
                <form onSubmit={formData.handleSubmit}>
                  <div className="-mx-6 flex flex-wrap">
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="tenantName"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Tenant Name
                        </label>
                        <input
                          id="tenantName"
                          name="tenantName"
                          onChange={formData.handleChange}
                          value={formData.values.tenantName}
                          type="text"
                          placeholder="Enter your name"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="tenantAddress"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Tenant's Address
                        </label>
                        <input
                          id="tenantAddress"
                          name="tenantAddress"
                          onChange={formData.handleChange}
                          value={formData.values.tenantAddress}
                          type="text"
                          placeholder="Address"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="landlordName"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Landlord Name
                        </label>
                        <input
                          id="landlordName"
                          name="landlordName"
                          onChange={formData.handleChange}
                          value={formData.values.landlordName}
                          type="text"
                          placeholder="Enter your name"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="landlordAddress"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Landlord's Address
                        </label>
                        <input
                          id="landlordAddress"
                          name="landlordAddress"
                          onChange={formData.handleChange}
                          value={formData.values.landlordAddress}
                          type="text"
                          placeholder="Address"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="agreementDate"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Date of Aggreement
                        </label>
                        <input
                          id="agreementDate"
                          name="agreementDate"
                          onChange={formData.handleChange}
                          value={formData.values.agreementDate}
                          type="date"
                          placeholder="Agreement Date"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="agreementCity"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          City
                        </label>
                        <input
                          id="agreementCity"
                          name="agreementCity"
                          onChange={formData.handleChange}
                          value={formData.values.agreementCity}
                          type="text"
                          placeholder="City"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="agreementState"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          State
                        </label>
                        <input
                          id="agreementState"
                          name="agreementState"
                          onChange={formData.handleChange}
                          value={formData.values.agreementState}
                          type="text"
                          placeholder="State"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="propertyAddress"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Lease Property Address
                        </label>
                        <input
                          id="propertyAddress"
                          name="propertyAddress"
                          onChange={formData.handleChange}
                          value={formData.values.propertyAddress}
                          type="text"
                          placeholder="Address"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="propertyType"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Property type
                        </label>
                        <select
                          id="propertyType"
                          name="propertyType"
                          onChange={formData.handleChange}
                          value={formData.values.propertyType}
                          className="border-body-color mt-2 w-full rounded-md border p-2 shadow-sm focus:border-primary focus:ring-primary"
                        >
                          <option
                            value="select type"
                            className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                          >
                            Select a type
                          </option>
                          <option
                            value="independent"
                            className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0"
                          >
                            Independent House
                          </option>
                          <option
                            value="apartment"
                            className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0"
                          >
                            Apartment
                          </option>
                          {/* <option value="type3">Type 3</option> */}
                          <option
                            value="farmhouse"
                            className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0"
                          >
                            Farm House
                          </option>
                          <option
                            value="Residential Property"
                            className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0"
                          >
                            Residential Property
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="noOfBedrooms"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Number Of Bedrooms
                        </label>
                        <input
                          id="noOfBedrooms"
                          name="noOfBedrooms"
                          onChange={formData.handleChange}
                          value={formData.values.noOfBedrooms}
                          type="number"
                          placeholder="Bedrooms"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="noOfBathrooms"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Number Of Bathrooms
                        </label>
                        <input
                          id="noOfBathrooms"
                          name="noOfBathrooms"
                          onChange={formData.handleChange}
                          value={formData.values.noOfBathrooms}
                          type="number"
                          placeholder="Bathrooms"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="noOfCarparks"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Number Of Car Parks
                        </label>
                        <input
                          id="noOfCarparks"
                          name="noOfCarparks"
                          onChange={formData.handleChange}
                          value={formData.values.noOfCarparks}
                          type="number"
                          placeholder="Cars"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="propertyArea"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Area(in sqft)
                        </label>
                        <input
                          id="propertyArea"
                          name="propertyArea"
                          onChange={formData.handleChange}
                          value={formData.values.propertyArea}
                          type="text"
                          placeholder="Area"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="leaseTerm"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Lease Term in Months
                        </label>
                        <input
                          id="leaseTerm"
                          name="leaseTerm"
                          onChange={formData.handleChange}
                          value={formData.values.leaseTerm}
                          type="number"
                          placeholder="Period"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="leaseStartDate"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Lease Start Date
                        </label>
                        <input
                          id="leaseStartDate"
                          name="leaseStartDate"
                          onChange={formData.handleChange}
                          value={formData.values.leaseStartDate}
                          type="date"
                          placeholder="Date"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="rentDueDate"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Rent Due Date
                        </label>
                        <input
                          id="rentDueDate"
                          name="rentDueDate"
                          onChange={formData.handleChange}
                          value={formData.values.rentDueDate}
                          type="date"
                          placeholder="Date"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="rent"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Rent
                        </label>
                        <input
                          id="rent"
                          name="rent"
                          onChange={formData.handleChange}
                          value={formData.values.rent}
                          type="number"
                          placeholder="Rent in Rs."
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="rentalDeposit"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Deposit
                        </label>
                        <input
                          id="rentalDeposit"
                          name="rentalDeposit"
                          onChange={formData.handleChange}
                          value={formData.values.rentalDeposit}
                          type="number"
                          placeholder="Deposit in Rs."
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="number"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Meter Start Reading
                        </label>
                        <input
                          id="startingMeterReading"
                          name="startingMeterReading"
                          onChange={formData.handleChange}
                          value={formData.values.startingMeterReading}
                          type="number"
                          placeholder="Reading"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="witnessOneName"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Witness 1 Name
                        </label>
                        <input
                          id="witnessOneName"
                          name="witnessOneName"
                          onChange={formData.handleChange}
                          value={formData.values.witnessOneName}
                          type="text"
                          placeholder="Enter your name"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="witnessOneAddress"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Witness 1 Address
                        </label>
                        <input
                          id="witnessOneAddress"
                          name="witnessOneAddress"
                          onChange={formData.handleChange}
                          value={formData.values.witnessOneAddress}
                          type="text"
                          placeholder="Address"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="witnessTwoName"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Witness 2 Name
                        </label>
                        <input
                          id="witnessTwoName"
                          name="witnessTwoName"
                          onChange={formData.handleChange}
                          value={formData.values.witnessTwoName}
                          type="text"
                          placeholder="Enter your name"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="witnessTwoAddress"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Witness 2 Address
                        </label>
                        <input
                          id="witnessTwoAddress"
                          name="witnessTwoAddress"
                          onChange={formData.handleChange}
                          value={formData.values.witnessTwoAddress}
                          type="text"
                          placeholder="Address"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    <div className="w-full px-4">
                      <Link
                        href={{ pathname: "/editor", query: formData.values }}
                        className="rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                      >
                        Submit
                      </Link>
                    </div>
                  </div>
                </form>
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
    </>
  );
};

export default RentalAgreementForm;
