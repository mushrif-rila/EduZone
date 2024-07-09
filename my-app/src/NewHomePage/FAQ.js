import React from "react";
import { Typography } from "@material-tailwind/react";

const faqs = [
  {
    title: "What is the mission of your educational website?",
    desc: "Our mission is to provide accessible, high-quality education to students of all ages and backgrounds. We aim to foster a love for learning and help each student achieve their full potential.",
  },
  {
    title: "Are the courses aligned with any specific educational standards?",
    desc: "Yes, our courses are developed in alignment with national and international educational standards to ensure quality and relevance.",
  },
  {
    title: "Are there any prerequisites for enrolling in your courses?",
    desc: "Some advanced courses may have prerequisites. These are listed on the course description page. For most introductory courses, no prior knowledge or prerequisites are required.",
  },
  {
    title: "Are there any discounts or financial aid options available?",
    desc: "Yes, we offer discounts for group enrollments, early bird registrations, and financial aid for eligible students. Please check our financial aid page or contact support for more information.",
  },

  

];

export function Faqs4() {
  return (
    <section className="px-8 py-20">
      <div className="container mx-auto">
        <div className="mb-14 text-center ">
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-4 text-4xl !leading-snug lg:text-[40px]"
          >
            Frequently Asked Questions
          </Typography>
          
        </div>
        <div className="max-w-3xl mx-auto grid gap-10">
          {faqs.map(({ title, desc }) => (
            <div key={title}>
            <Typography color="blue-gray" className="pb-6 text-[20px] font-bold">
            {title}
          </Typography>
              <div className="border-t border-gray-200 pt-4">
                <Typography className="font-normal !text-gray-500">
                  {desc}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faqs4;