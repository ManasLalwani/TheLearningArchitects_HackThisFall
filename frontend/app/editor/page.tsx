"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";
import DocEditor from "@/components/DocEditor";

const ContactPage = ({ params, searchParams }) => {
  const { selectedOption, formData } = searchParams;
  console.log(searchParams.value);
  console.log(searchParams);

  return (
    <>
      <Breadcrumb
        pageName="Edit Document"
        description="Modify text, images, and formatting within a document, providing flexibility for revisions and updates without recreating the entire file. Offering in-place modifications directly within the document interface."
      />

      <div className="container">
        <DocEditor selectedOption={searchParams.value} formData={searchParams}/>
      </div>
    </>
  );
};

export default ContactPage;
