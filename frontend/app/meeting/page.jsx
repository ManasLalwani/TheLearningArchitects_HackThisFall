import React from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Image from "next/image";
import Link from "next/link";
import dummyImage from "../../public/images/blog/blog-01.jpg";

const page = () => {
  return (
    <>
      <Breadcrumb
        pageName="Meeting "
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />

      <section className="pt-[120px] pb-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
              <div
                className="wow fadeInUp relative overflow-hidden rounded-md bg-white shadow-one dark:bg-dark"
                data-wow-delay=".1s"
              >
                <Link href="/meeting/scheduler" className="relative block h-[220px] w-full">
                  <span className="absolute top-6 right-6 z-20 inline-flex items-center justify-center rounded-full bg-primary py-2 px-4 text-sm font-semibold capitalize text-white">
                    Schedule
                  </span>
                  <Image src={dummyImage} alt="image" fill />
                </Link>
                <div className="p-6 sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8">
                  <h3>
                    <Link
                      href="/meeting/scheduler"
                      className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
                    >
                      Meeting Scheduler
                    </Link>
                  </h3>
                  <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
                    Schedule a meeting
                  </p>
                  
                </div>
              </div>

              
            </div>

            <div className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
              <div
                className="wow fadeInUp relative overflow-hidden rounded-md bg-white shadow-one dark:bg-dark"
                data-wow-delay=".1s"
              >
                <Link href="/meeting/lawyerFinder" className="relative block h-[220px] w-full">
                  <span className="absolute top-6 right-6 z-20 inline-flex items-center justify-center rounded-full bg-primary py-2 px-4 text-sm font-semibold capitalize text-white">
                    Locate
                  </span>
                  <Image src={dummyImage} alt="image" fill />
                </Link>
                <div className="p-6 sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8">
                  <h3>
                    <Link
                      href="/meeting/lawyerFinder"
                      className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
                    >
                      Lawyer Locator
                    </Link>
                  </h3>
                  <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
                    Find a lawyer nearby you 
                  </p>
                  
                </div>
              </div>

              
            </div>
          </div>

          
        </div>
      </section>
      
    </>
  );
};

export default page;
