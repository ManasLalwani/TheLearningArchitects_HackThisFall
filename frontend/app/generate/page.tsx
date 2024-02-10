import Breadcrumb from "@/components/Common/Breadcrumb";
import GenerateSectionOne from "@/components/Generate/GenerateSectionOne";

const GeneratePage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Generate New Documents"
        description="Create and edit your legal documents with efficiency and ease while adhering to the format approved by the Indian Government. Edit the format as per requirement."
      />
      <GenerateSectionOne />
    </>
  );
};

export default GeneratePage;
