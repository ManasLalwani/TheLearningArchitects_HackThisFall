"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";
import DocEditor from "@/components/DocEditor";

const ContactPage = ({ params, searchParams }) => {
  console.log(searchParams);
  return (
    <>
      <Breadcrumb
        pageName="Edit Document"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />

      <div className="container">
        <DocEditor doc={searchParams} />
      </div>
    </>
  );
};

export default ContactPage;
