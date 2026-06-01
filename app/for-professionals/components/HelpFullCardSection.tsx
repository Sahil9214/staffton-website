import React from "react";
import Reveal from "../../components/motion/Reveal";

const HelpFullCardSection = () => {
  return (
    <section className="w-full bg-[#0D9488] overflow-hidden">
      <div
        className="
          max-w-[1440px]
          mx-auto
          px-6
          sm:px-10
          lg:px-24
          py-20
          lg:py-24
        "
      >

        {/* Content Wrapper */}
        <Reveal
          className="
            max-w-[896px]
            mx-auto
            flex
            flex-col
            items-center
            text-center
            gap-6
          "
        >

          {/* Main Heading */}
          <h2
            className="
              text-white
              font-extrabold
              tracking-[-1.5px]
              leading-[100%]
              text-[40px]
              sm:text-[50px]
              lg:text-[60px]
            "
          >
            Ready to Transform Your
            <br />
            Medical Career?
          </h2>

          {/* Paragraph */}
          <p
            className="
              max-w-[672px]
              text-[#F7F9FB]
              font-normal
              text-[18px]
              lg:text-[20px]
              leading-[32px]
            "
          >
            Join the fastest growing medical recruitment network and
            experience the future of healthcare staffing.
          </p>

          {/* Small Text */}
          {/* <span
            className="
              text-[#AFC6FF80]
              text-[14px]
              leading-5
              font-medium
            "
          >
            Setup in &lt;2 minutes.
          </span> */}

        </Reveal>
      </div>
    </section>
  );
};

export default HelpFullCardSection;
