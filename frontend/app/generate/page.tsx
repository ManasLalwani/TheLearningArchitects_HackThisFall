import Breadcrumb from "@/components/Common/Breadcrumb";
import GenerateSectionOne from "@/components/Generate/GenerateSectionOne";

const GeneratePage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Generate New Documents"
        description="Streamline legal paperwork with our instant document generator – Your legal documents, simplified."
      />
      <GenerateSectionOne />
    </>
  );
};

export default GeneratePage;
