import { useState, useEffect } from 'react';
import TechExp from "../common/Technical-experties";
import {Helmet} from "react-helmet";

function Blog() {
  const [PostData, setPostData] = useState(null);

  useEffect(() => {
    fetch('https://dev.yasglobal.com/wp-json/wp/v2/posts?order=desc&_embed=true')
      .then(response => response.json())
      .then(data => setPostData(data))
      .catch(error => console.error(error)); 
  }, []);

  if (!PostData) {
    return <div>Loading...</div>;
  }


    return (
      <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{PostData.title.rendered}</title>
        <link rel="stylesheet" type="text/css" href="/assets/css/style.css" />
      </Helmet>
      <div className="site-inner">
          <div id="content" className="site-content">
            <section id="banener" className="new-page">
              <div className="container">
                <div className="title">
                  <h1>{PostData.title.rendered}</h1>
                </div>
              </div>
            </section>

            <section className="ContentPage ">              
              <div className="container">                
                <div id="primary" className="content-area1">                  
                  <main id="main" className="site-main">                    
                    <div className="description-sec" dangerouslySetInnerHTML={{ __html: PostData.content.rendered }}></div>
                    <div className="side-bar-sec">
                    <TechExp/>
                    </div>
                    <div style={{ clear: "both" }} />
                  </main>
                </div>
              </div>
            </section>
         </div>
       </div>
       </>
    );
}


export default Blog;
