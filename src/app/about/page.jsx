import React from "react";
import "./About.css"; // Use regular CSS import instead of CSS modules
import aboutContent from "../../public/Strings/en_strings.json"; // Import the JSON file
import CustomizedQuotesForm from "../components/DIDQuotation";
import Footer from "../components/Footer";
import Header from "../components/Header";

const About = () => {
  return (
    <>
      <Header />
      <div>
        {/* Banner Image */}
        <div className="w-full mt-16">
          <img
            src={aboutContent["ABOUT_BANNER_IMAGE_SRC"]}
            alt={aboutContent["ABOUT_BANNER_IMAGE_ALT"]}
            layout="responsive"
            width={1920}
            height={1080}
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="servicesBody">
          {/* Section 1 */}
          <section className="services">
            <div className="content">
              <div className="illustration">
                <img
                  style={{ height: "400px", width: "800px" }}
                  src={aboutContent["ABOUT_SECTION_1_IMAGE_SRC"]}
                  alt={aboutContent["ABOUT_SECTION_1_IMAGE_ALT"]}
                  className="illustrationImage"
                  width={700}
                  height={500}
                />
              </div>

              <div className="textContent">
                <p className="serviceDescription">
                  {aboutContent["ABOUT_SECTION_1_DESCRIPTION"]}
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="services" style={{ paddingBottom: "3em" }}>
            <div className="content">
              <div className="textContent">
                <p className="serviceDescription">
                  {aboutContent["ABOUT_SECTION_2_DESCRIPTION"]}
                </p>
              </div>

              <div className="illustration">
                <img
                  src={aboutContent["ABOUT_SECTION_2_IMAGE_SRC"]}
                  alt={aboutContent["ABOUT_SECTION_2_IMAGE_ALT"]}
                  className="illustrationImage"
                  width={500}
                  height={300}
                />
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="services">
            <div className="content">
              <div className="illustration">
                <img
                  style={{ width: "450px" }}
                  src={aboutContent["ABOUT_SECTION_3_IMAGE_SRC"]}
                  alt={aboutContent["ABOUT_SECTION_3_IMAGE_ALT"]}
                  className="illustrationImage"
                  width={500}
                  height={300}
                />
              </div>

              <div className="textContent">
                <p className="serviceDescription">
                  {aboutContent["ABOUT_SECTION_3_DESCRIPTION"]}
                </p>
              </div>
            </div>
          </section>
        </div>
        <CustomizedQuotesForm />
      </div>
      <Footer />
    </>
  );
};

export default About;
