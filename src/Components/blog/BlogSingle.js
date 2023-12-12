import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import TechExp from "../common/Technical-experties";
import {Helmet} from "react-helmet";

function BlogSingle() {
  const [page, setPage] = useState(null);
  const { slug } = useParams();

  console.log(slug);

  useEffect(() => {
    fetch(`https://dev.yasglobal.com/wp-json/wp/v2/posts?slug=${slug}&_embed&custom-meta`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          setPage(data[0]); // Get the first page with matching slug
        }
      })
      .catch(error => {
        console.error(error);
      });
      console.log(`https://dev.yasglobal.com/wp-json/wp/v2/posts?slug=${slug}&_embed&custom-meta`);
  }, [slug]);

  if (BlogSingle) {
    return (
      <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{page.title.rendered}</title>
        <link rel="stylesheet" type="text/css" href="/assets/css/style.css" />
      </Helmet>
      <div className="site-inner">
          <div id="content" className="site-content">
            <section id="banener" className="new-page">
              <div className="container">
                <div className="title">
                  <h1>{page.title.rendered}</h1>
                </div>
              </div>
            </section>

            <section className="ContentPage ">              
              <div className="container">                
                <div id="primary" className="content-area1">                  
                  <main id="main" className="site-main">                    
                    <div className="description-sec" dangerouslySetInnerHTML={{ __html: page.content.rendered }}></div>
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
  } else {
    return <div>Loading...</div>;
  }
}


export default BlogSingle;
