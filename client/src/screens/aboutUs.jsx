import { useEffect, useState } from "react";
import styles from "../styles/aboutUs.module.css";
import * as Contentstack from "contentstack";
import Header from "./Header";

const AboutUs = () => {
  const stack = Contentstack.Stack(
    "blta9eaaf90aa1f0b99",
    "cs75ac97f792cd9581f678aaea",
    "website"
  );

  const [aboutUsImage, setAboutUsImage] = useState(null);
  const [aboutUsDescription, setAboutUsDescription] = useState(null);

  useEffect(() => {
    const getAllEntries = async () => {
      try {
        const query = stack.ContentType("base_page").Query();
        const response = await query.toJSON().find();

        // Find the entry with title "About Us"
        const aboutUsData = response[0].find(
          (data) => data.title === "About Us"
        );
        if (aboutUsData) {
          // Extract image and description from the "About Us" entry
          const { image, long_description } = aboutUsData;
          setAboutUsImage(image);
          setAboutUsDescription(long_description);
        } else {
          console.log("About Us data not found");
        }
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    getAllEntries();
  }, [stack]);

  return (
    <>
      <Header />
      <div className={styles.mainContainer}>
        <section className={styles.aboutUsContainer}>
          <h2 className={styles.aboutUs}>About Us</h2>
          {aboutUsImage && (
            <img
              style={{ width: "60vw" }}
              src={aboutUsImage.url}
              alt="About Us"
            />
          )}
          {aboutUsDescription && (
            <div
              className={styles.aboutUsDescription}
              dangerouslySetInnerHTML={{ __html: aboutUsDescription }}
            />
          )}
        </section>
      </div>
    </>
  );
};

export default AboutUs;
