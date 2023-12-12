import React, { useState, useEffect } from 'react';
import '../../Assets/css/footer.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function Footer() {
  const basePath = 'https://dev.yasglobal.com';
  const [pageData, setPageData] = useState(null);
  const [servicesData, setServicesData] = useState(null);
  const [usefulData, setUsefulData] = useState(null);
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    fetch('https://dev.yasglobal.com/wp-json/myplugin/v1/sidebar/footer')
      .then(response => response.json())
      .then(data => setPageData(data))
      .catch(error => console.error(error)); 
  }, []);
 
  
  useEffect(() => {
    fetch('https://dev.yasglobal.com/wp-json/wp-api-menus/v2/menus/6')
      .then(response => response.json())
      .then(data => setServicesData(data))
      .catch(error => console.error(error)); 
  }, []);

 
  useEffect(() => {
    fetch('https://dev.yasglobal.com/wp-json/wp-api-menus/v2/menus/435')
      .then(response => response.json())
      .then(data => setUsefulData(data))
      .catch(error => console.error(error)); 
  }, []);

  useEffect(() => {
    fetch('https://dev.yasglobal.com/wp-json/wp/v2/posts?order=desc&per_page=2&_embed=true')
      .then(response => response.json())
      .then(data => setPostData(data))
      .catch(error => console.error(error)); 
  }, []);

 


  if (!servicesData || !usefulData || !postData) {
    return <div>Loading...</div>;
  }

  console.log(postData);
  return (
    <footer id="footer" className="section site-footer loaded">
      <div className="container">
        <div className="footer-top fl">
          <div className="sub-section sub-1">
            <div className="footer-logo-wrapp">
              <Link to="/" aria-label="logo" title="YAS Global">
                <img
                  width={217}
                  height={55}
                  className="loaded"
                  src="https://dev.yasglobal.com/wp-content/uploads/2022/06/yasglobal-logo-white.svg"
                  alt="YAS Global"
                  title="YAS Global"
                />
              </Link>
            </div>
            
           
            <div dangerouslySetInnerHTML={{ __html: pageData }} />

            <ul className="rihgt-socials">
              <li className="twitter">
              <Link to="https://twitter.com/yasglobal"
                  target="_blank"
                  title="Follow us on Twitter"
                >
                  <i className="icon-twitter" />
                  Twitter
                </Link>
              </li>
              <li className="facebook">
                <Link
                  to="https://www.facebook.com/yasglobal/"
                  target="_blank"
                  title="Follow us on Facebook"
                >
                  <i className="icon-facebook" />
                  Facebook
                </Link>
              </li>
              <li className="linkedin">
                <Link
                  to="https://www.linkedin.com/company/yasglobal/"
                  target="_blank"
                  title="Follow us on Linkedin"
                >
                  <i className="icon-linkedin" />
                  Linkedin
                </Link>
              </li>
            </ul>
          </div>
          <div className="sub-section sub-2">
          <div id="nav_menu-16" className="widget widget_nav_menu">
              <h3 className="widget-title">Our Services</h3>
              <div className="menu-technical-expertise-container">
                <ul id="menu-technical-expertise" className="menu">
                {servicesData.items && servicesData.items.map((item, index) => {
                    const relativeUrl = item.url.replace(basePath, '');
                    return (
                      <li key={`menu-item-${index}-${item.ID}`} className="menu-item">
                        <Link to={relativeUrl} title={item.title}>{item.title}</Link>
                        {item.children && (
                          <ul className="sub-menu">
                            {item.children.map((child, childIndex) => {
                              const relativeChildUrl = child.url.replace(basePath, '');
                              return (
                                <li key={`sub-menu-item-${index}-${childIndex}-${child.ID}`} className="menu-item">
                                  <Link to={relativeChildUrl} title={child.title}>{child.title}</Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          
          </div>
          <div className="sub-section sub-3">
            
            <h3>Recent Posts</h3>
              {postData.map((post, index) => {          
                const date = new Date(post.date); 
                const options = { year: 'numeric', month: 'short', day: '2-digit' };
                const formattedDate = date.toLocaleDateString('en-US', options);
                const post_link = post.link.replace("https://dev.yasglobal.com", "");
                return <div className="single-post" key={post.id}>
                  <div className="post-image">
                    <Link to={post_link}
                      title={post.title.rendered}
                    >
                      <img
                        width={post._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.width}
                        height={post._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.height}
                        src={post._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url}
                        className="lazy loaded"
                        alt={post.alt_text}
                        title={post.title.rendered}
                      />
                    </Link>
                  </div> 

                  <div className="post-content">
                    <Link to={post_link}
                      title={post.title.rendered}
                    >
                     {post.title.rendered}
                    </Link>
                    <div className="post-date">
                      <i className="icon-time" />
                      {formattedDate}
                    </div>
                  </div>           
              </div>;
            })}            
          </div>
          <div className="sub-section sub-4">
          <div id="nav_menu-16" className="widget widget_nav_menu">
              <h3 className="widget-title">Useful Links</h3>
              <div className="menu-technical-expertise-container">
                <ul id="menu-useful-links" className="menu">
                {usefulData.items && usefulData.items.map((item, index) => {
                    const relativeUrl = item.url.replace(basePath, '');
                    return (
                      <li key={`menu-item-${index}-${item.ID}`} className="menu-item">
                        <Link to={relativeUrl} title={item.title}>{item.title}</Link>
                        {item.children && (
                          <ul className="sub-menu">
                            {item.children.map((child, childIndex) => {
                              const relativeChildUrl = child.url.replace(basePath, '');
                              return (
                                <li key={`sub-menu-item-${index}-${childIndex}-${child.ID}`} className="menu-item">
                                  <Link to={relativeChildUrl} title={child.title}>{child.title}</Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-middle fl">
          <div className="address">
            <div className="ft-icon icon-location" />
            <div className="other-info">
              <span className="loaction">Al Shmookh Business Center</span>
              <span className="direction">Umm Al Quwain, U.A.E</span>
            </div>
          </div>
          <div className="address email">
            <div className="ft-icon icon-mail" />
            <div className="other-info">
              <span className="loaction">
                <Link to="mailto:info@yasglobal.com" title="info@yasglobal.com">
                  info@yasglobal.com
                </Link>
              </span>
              <span className="direction">Drop Us a Line</span>
            </div>
          </div>
          <div className="address">
            <div className="ft-icon icon-location" />
            <div className="other-info">
              <span className="loaction">Mashriq Centre Gulshan-e-Iqbal,</span>
              <span className="direction">Karachi 75300 Pakistan</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom fl">
          © 2010 - 2023 YAS Global, All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
