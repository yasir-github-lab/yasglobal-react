import React, { useState, useEffect } from "react";
 import "../../Assets/css/sidebar.css";
import "../../Assets/css/about.css";
import TechExp from "../common/Technical-experties";



function About() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetch(
      "https://dev.yasglobal.com/wp-json/wp/v2/pages?slug=company&_embed&custom-meta"
    )
      .then((response) => response.json())
      .then((data) => setAboutData(data[0]))
      .catch((error) => console.error(error));
  }, []);

  if (!aboutData) {
    return <div>Loading...</div>;
  }

  //console.log(aboutData.acf.expertise);

  return (
    <div id="content" className="site-content">
      <section id="banener" className="new-page">
        <div className="container">
          <div className="title">
            <h1>{aboutData.title.rendered}</h1>
          </div>
        </div>
      </section>
      <section className="ContentPage ">
        <div className="container">
          <div id="primary" className="content-area1">
            <div className="parrt-boxes">

              {aboutData.acf && aboutData.acf.expertise.map((item, index) => {
                return (
                  <div key={`parrt-boxes-${index}-${item.ID}`} className="development-part">
                    <div className="image-part">
                      <img
                        src={item.image_te.url}
                        title={item.image_te.title}
                        alt={item.image_te.alt}
                      />
                    </div>
                    <div className="heading-part">
                      <span>{item.title_te}</span>
                      <br />
                      {item.sub_title_te}
                    </div>
                    <div className="content-part">
                      {item.languages_name}
                    </div>
                  </div>
                )
              }
              )}

            </div>
            <main id="main" className="site-main">

              <div className="description-sec" dangerouslySetInnerHTML={{ __html: aboutData.content.rendered }} />

              <div className="side-bar-sec" >
                <TechExp/>
              </div>

              <div style={{ clear: "both" }} />
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
