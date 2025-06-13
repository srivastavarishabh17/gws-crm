import BlankPageLayer from "@/components/BlankPageLayer";
import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";

export const metadata = {
  title: "Genex CRM – Smart Customer Management by Genex Web Services",
  description:
    "Genex CRM is a powerful, user-friendly customer relationship management system designed to streamline operations, boost productivity, and help businesses build stronger client relationships. Crafted by Genex Web Services for modern teams.",
};
const Page = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Blank Page' />

        {/* BlankPageLayer */}
        <BlankPageLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
