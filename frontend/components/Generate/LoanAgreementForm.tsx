"use client";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoanAgreementForm = () => {
  const { push } = useRouter();

  const handleSubmit = async (values) => {
    console.log("submitted");
    console.log(values);
  };

  const formData = useFormik({
    initialValues: {
      value:"type4",
        type: "loan",
        lenderName: "",
        borrowerName: "",
        agreementState: "",
        agreementDate: "",
        loanAmount: "",
        loanDuration: "",
        rateOfInterest: "",
        loanStartDate: "",
        loanEndDate: "",
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
                <form onSubmit={formData.handleSubmit} >
                  <div className="-mx-6 flex flex-wrap">
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="lenderName"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Lender's Name
                        </label>
                        <input
                          id="lenderName"
                          name="lenderName"
                          onChange={formData.handleChange}
                          value={formData.values.lenderName}
                          type="text"
                          placeholder="Enter your name"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="borrowerName"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Borrower's Name
                        </label>
                        <input
                          id="borrowerName"
                          name="borrowerName"
                          onChange={formData.handleChange}
                          value={formData.values.borrowerName}
                          type="text"
                          placeholder="Enter your name"
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
                          htmlFor="agreementDate"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Date of Agreement
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
                          htmlFor="loanAmount"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Loan Amount
                        </label>
                        <input
                          id="loanAmount"
                          name="loanAmount"
                          onChange={formData.handleChange}
                          value={formData.values.loanAmount}
                          type="number"
                          placeholder="Loan Amount in Rs."
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="loanDuration"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Loan Duration in Years
                        </label>
                        <input
                          id="loanDuration"
                          name="loanDuration"
                          onChange={formData.handleChange}
                          value={formData.values.loanDuration}
                          type="number"
                          placeholder="Period"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="rateOfInterest"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Interest rate in %
                        </label>
                        <input
                          id="rateOfInterest"
                          name="rateOfInterest"
                          onChange={formData.handleChange}
                          value={formData.values.rateOfInterest}
                          type="number"
                          placeholder="Rate"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="loanStartDate"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Loan Start Date
                        </label>
                        <input
                          id="loanStartDate"
                          name="loanStartDate"
                          onChange={formData.handleChange}
                          value={formData.values.loanStartDate}
                          type="date"
                          placeholder="Date"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent py-3 px-6 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="loanEndDate"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Loan End Date
                        </label>
                        <input
                          id="loanEndDate"
                          name="loanEndDate"
                          onChange={formData.handleChange}
                          value={formData.values.loanEndDate}
                          type="date"
                          placeholder="Date"
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

export default LoanAgreementForm;