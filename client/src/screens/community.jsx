import { useEffect, useState } from "react";
import styles from "../styles/community.module.css";
import * as Contentstack from "contentstack";
import Header from "./Header";

const CommunityPage = () => {
  const stack = Contentstack.Stack(
    "blta9eaaf90aa1f0b99",
    "cs75ac97f792cd9581f678aaea",
    "website"
  );
  const [communityImage, setCommunityImage] = useState([]);
  const [communityDescription, setCommunityDescription] = useState([]);

  useEffect(() => {
    const getAllEntries = async () => {
      try {
        const query = stack.ContentType("community").Query();
        const response = await query.toJSON().find();
        // console.log(response);
        setCommunityDescription(response[0][0].long_description);
        setCommunityImage(response[0][0].image.url);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    getAllEntries();
  }, []);
  return (
    <div>
      <Header />
      <div className={styles.mainContainer}>
        <section className={styles.communityContainer}>
          <h2 className={styles.aboutCommunity}>About Our Community</h2>
          {communityImage && (
            <img
              style={{ width: "70vw" }}
              src={communityImage}
              alt="Community"
            />
          )}
          {communityDescription && (
            <div
              className={styles.communityDescription}
              dangerouslySetInnerHTML={{
                __html: communityDescription,
              }}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default CommunityPage;
