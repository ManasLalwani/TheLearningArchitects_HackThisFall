"use client";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";

const FreelanceContractForm = () => {
  const { push } = useRouter();

  const handleSubmit = async (values) => {
    console.log("submitted");
    // console.log(values);
  };


  const formData = useFormik({
    initialValues: {
        value: "type6",
      clientName: "",
      clientAddress: "",
      freelancerName: "",
      freelancerAddress: "",
      compensation: "",
      timeline: "",
      scopeOfWork: "",
      additionalServices: "",
      latePaymentClause: "",
      advancePayment: "",
      termination: "",
      confidentiality: "",
    //   privity: "",
      jurisdiction: "",
      disputeResolution: "",
    },
    onSubmit: handleSubmit,
  });

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto rounded-md bg-primary bg-opacity-10 px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Enter Contract Details
                </h3>
                <br></br>
                <form onSubmit={formData.handleSubmit}>
                  <div className="-mx-6 flex flex-wrap">
                    {/* repeting fields */}
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="clientName"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Client Name
                        </label>
                        <input
                          id="clientName"
                          name="clientName"
                          onChange={formData.handleChange}
                          value={formData.values.clientName}
                          type="text"
                          placeholder="Enter client's name"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent px-6 py-3 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    {/* Add similar input fields for clientAddress, freelancerName, freelancerAddress, compensation, timeline, scopeOfWork, additionalServices, latePaymentClause, advancePayment, termination, confidentiality, privity, jurisdiction, and disputeResolution */}

                    {/* client address */}
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="clientAddress"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Client Address
                        </label>
                        <input
                          id="clientAddress"
                          name="clientAddress"
                          onChange={formData.handleChange}
                          value={formData.values.clientAddress}
                          type="text"
                          placeholder="Enter client's address"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent px-6 py-3 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    {/* freelancer name */}
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="freelancerName"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Freelancer Name
                        </label>
                        <input
                          id="freelancerName"
                          name="freelancerName"
                          onChange={formData.handleChange}
                          value={formData.values.freelancerName}
                          type="text"
                          placeholder="Enter freelancer's name"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent px-6 py-3 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    {/* freelancer address */}
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="freelancerAddress"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Freelancer Address
                        </label>
                        <input
                          id="freelancerAddress"
                          name="freelancerAddress"
                          onChange={formData.handleChange}
                          value={formData.values.freelancerAddress}
                          type="text"
                          placeholder="Enter freelancer's address"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent px-6 py-3 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    {/* compensation */}
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="compensation"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Compensation
                        </label>
                        <input
                          id="compensation"
                          name="compensation"
                          onChange={formData.handleChange}
                          value={formData.values.compensation}
                          type="text"
                          placeholder="Enter the compensation amount"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent px-6 py-3 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    {/* timeline */}
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="timeline"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Timeline
                        </label>
                        <input
                          id="timeline"
                          name="timeline"
                          onChange={formData.handleChange}
                          value={formData.values.timeline}
                          type="text"
                          placeholder="Enter the project timeline"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent px-6 py-3 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    {/* scope of work */}
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="scopeOfWork"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Scope of Work
                        </label>
                        <textarea
                          id="scopeOfWork"
                          name="scopeOfWork"
                          onChange={formData.handleChange}
                          value={formData.values.scopeOfWork}
                          placeholder="Enter the scope of work"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent px-6 py-3 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    {/* additional services */}
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="additionalServices"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Additional Services
                        </label>
                        <textarea
                          id="additionalServices"
                          name="additionalServices"
                          onChange={formData.handleChange}
                          value={formData.values.additionalServices}
                          placeholder="Enter any additional services"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent px-6 py-3 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    {/* late payment clause */}
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="latePaymentClause"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Late Payment Clause
                        </label>
                        <textarea
                          id="latePaymentClause"
                          name="latePaymentClause"
                          onChange={formData.handleChange}
                          value={formData.values.latePaymentClause}
                          placeholder="Enter the late payment clause"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent px-6 py-3 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    {/* advance payment */}
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="advancePayment"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Advance Payment
                        </label>
                        <textarea
                          id="advancePayment"
                          name="advancePayment"
                          onChange={formData.handleChange}
                          value={formData.values.advancePayment}
                          placeholder="Enter the advance payment terms"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent px-6 py-3 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    {/* termination */}
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="termination"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Termination
                        </label>
                        <textarea
                          id="termination"
                          name="termination"
                          onChange={formData.handleChange}
                          value={formData.values.termination}
                          placeholder="Enter the termination terms"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent px-6 py-3 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    {/* confidentiality */}
                    {/* <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="confidentiality"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Confidentiality
                        </label>
                        <textarea
                          id="confidentiality"
                          name="confidentiality"
                          onChange={formData.handleChange}
                          value={formData.values.confidentiality}
                          placeholder="Enter the confidentiality terms"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent px-6 py-3 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div> */}

                    {/* privity */}
                    {/* <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="privity"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Privity
                        </label>
                        <textarea
                          id="privity"
                          name="privity"
                          onChange={formData.handleChange}
                          value={formData.values.privity}
                          placeholder="Enter the privity terms"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent px-6 py-3 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div> */}

                    {/* jurisdiction */}
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="jurisdiction"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Jurisdiction
                        </label>
                        <textarea
                          id="jurisdiction"
                          name="jurisdiction"
                          onChange={formData.handleChange}
                          value={formData.values.jurisdiction}
                          placeholder="Enter the jurisdiction terms"
                          className="text-body-color placeholder-body-color w-full rounded-md border border-transparent px-6 py-3 text-base shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    {/* form fields end */}
                    <div className="w-full px-4">
                      <Link
                        href={{ pathname: "/editor", query: formData.values }}
                        className="rounded-md bg-primary px-9 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
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
          {/* SVG background */}
        </div>
      </section>
    </>
  );
};

export default FreelanceContractForm;
