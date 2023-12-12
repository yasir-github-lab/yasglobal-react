import React, { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";

function Home() {
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    fetch('https://dev.yasglobal.com/wp-json/wp/v2/pages/21?_embed&custom-meta')
      .then(response => response.json())
      .then(data => setPageData(data))
      .catch(error => console.error(error)); 
  }, []);

  if (!pageData) {
    return <div>Loading...</div>;
  }
  
  const linkProps = {};

  if (pageData.acf.about_cta.target && pageData.acf.about_cta.target !== '') {
    linkProps.target = pageData.acf.about_cta.target;
    linkProps.rel = 'noopener noreferrer';
  }

  return (
    <>
     <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <link rel="stylesheet" type="text/css" href="/assets/css/homepage.css" />
      </Helmet>
    <section className="section hero-section">
      <div className="container">
        <div className="section-left">
          <h1>{pageData.title.rendered}</h1>
          <div className="hero-short-desc" dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} />
          <div className="btn hero-btn">
            <a href={pageData.acf.header_cta.url} title={pageData.acf.header_cta.title}>{pageData.acf.header_cta.title}</a>
          </div>
        </div>
        <div className="section-right">
          <img alt={pageData._embedded['wp:featuredmedia'][0].alt_text} className="lazy" data-src={pageData._embedded['wp:featuredmedia'][0].source_url} height="555" src={pageData._embedded['wp:featuredmedia'][0].source_url} title={pageData._embedded['wp:featuredmedia'][0].title.rendered} width="555" />

        </div>
      </div>
    </section>
    <section className="section business-section">
      <div className="container">
        <div className="business-sec-left">
        <img width="664" height="500" data-org-src={pageData.acf.aout_aimated_svg.url} data-src={pageData.acf.aout_aimated_svg.url} className="lazy" alt={pageData.acf.aout_aimated_svg.alt} title={pageData.acf.aout_aimated_svg.title} src={pageData.acf.aout_aimated_svg.url} />
        </div>
        <div className="business-sec-right">
          <div className="sub-title">{pageData.acf.about_section_title}</div>
          <h2>{pageData.acf.about_heading}</h2>
          <div className="about-company">{pageData.acf.about_short_text}</div>
          <div className="main-services">
          {pageData.acf.about_features.map((feature, index) => (
            <div className="service" key={index}>
              <div className="service-icon">
                <img
                  width="52"
                  height="52"
                  data-org-src={feature.icon.url}
                  data-src={feature.icon.url}
                  className="lazy"
                  alt={feature.icon.alt}
                  title={feature.icon.title}
                  src={feature.icon.url}
                />
              </div>
              <h3>{feature.title}</h3>
            </div>
          ))}
          </div>
          <div className="about-company">
            {pageData.acf.about_short_text_2}
          </div>
          <div className="btn business-btn">
            <a href={pageData.acf.about_cta.url} title={pageData.acf.about_cta.title} {...linkProps}>{pageData.acf.about_cta.title}</a>
          </div>
        </div>
      </div>
    </section>
    <section className="section services-section">
      <div className="container">
        <div className="business-details fl">
          <div className="left-side">
             <div className="sub-title">{pageData.acf.service_section_title}</div>
             <h2>{pageData.acf.service_heading}</h2>
          </div>
          <div className="right-side">{pageData.acf.service_short_text}</div>
        </div>
        <div className="services fl">
          {pageData.acf.services.map(service => {
            const replaced = service.title.toLowerCase().replace(/\s+/g, '-');
            return (
              <div className="single-service" key={service.title}>
                <div className="service-img">
                  <img
                    width="640"
                    height="490"
                    data-org-src={service.image.url}
                    data-src={service.image.url}
                    className="lazy"
                    alt={service.image.alt}
                    title={service.image.title}
                    src={service.image.url}
                  />
                  <div className="services-icon">
                    <i className={`icon-${replaced}`}></i>
                  </div>
                </div>
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <div className="content-detail">{service.description}</div>
                </div>
                <div className="service-btn">
                  <a className="box-anchor" href={service.link.url} title={service.link.title}>
                    <span className="anchor-text">{service.link.title}</span>
                    <span className="anchor-arrow"></span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        <div className="btn center">
          <a href={pageData.acf.service_link.url} title={pageData.acf.service_link.title}>{pageData.acf.service_link.title}</a>
        </div>
      </div>
    </section>
    <section className="section cms-section">
      <span id="plugins-sec" className="hidden-id"></span>
      <div className="container fl">
        <div className="cms-image">
          <img width="694" height="693" data-org-src={pageData.acf.mp_short_bg_image.url} data-src={pageData.acf.mp_short_bg_image.url} className="lazy" alt={pageData.acf.mp_short_bg_image.alt} src={pageData.acf.mp_short_bg_image.url} title={pageData.acf.mp_short_bg_image.title} />
        </div>
        <div className="cms-detail">
          <div className="sub-title">{pageData.acf.mp_section_title}</div>
          <h2>{pageData.acf.mp_heading}</h2>
          <div className="cms-description">{pageData.acf.mp_short_text}</div>
          <div className="cms-contributions fl">
            <div className="single-contributions wordpress">
              <h3>Wordpress</h3>
              <ul>
              {pageData.acf.mp_wordpress.map(wordpress => {
                return (
                  <li key={wordpress.list_item.title}>
                    <a href={wordpress.list_item.url} title={wordpress.list_item.title}>{wordpress.list_item.title}</a>
                  </li>
                );
              })}
              </ul>
            </div>
            <div className="single-contributions drupal">
              <h3>Drupal</h3>
              <ul>
              {pageData.acf.mp_drupal.map(drupal => {
                return (
                  <li key={drupal.list_item.title}>
                    <a href={drupal.list_item.url} title={drupal.list_item.title}>{drupal.list_item.title}</a>
                  </li>
                );
              })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="section portfolio-section">
      <div className="container">
        <div className="our-details fl">
          <div className="left-side">
            <div className="sub-title">{pageData.acf.portfolio_section_title}</div>
            <h2>{pageData.acf.portfolio_heading}</h2>
          </div>
          <div className="right-side">
            {pageData.acf.portfolio_short_text}
          </div>
        </div>
        <div className="portfolios fl">
          {pageData.acf.portfolios.map(portfolios => {
            return (
              <div className="single-portfolio" key={portfolios.title}>
                <div className="portfolio-img">                                                        
                  <img width="570" height="573" data-org-src={portfolios.image.url} data-src={portfolios.image.url} className="lazy" alt={portfolios.image.alt} title={portfolios.image.title} src={portfolios.image.url} />                            
                  <div className="portfolio-icon">                                                                
                    <img width="150" height="163" data-org-src={portfolios.icon.url} data-src={portfolios.icon.url} className="lazy" alt={portfolios.icon.alt} title={portfolios.icon.title} src={portfolios.icon.url} />                            
                  </div>                      
                </div>
                <div className="portfolio-content">                            
                  <h3>{portfolios.title}</h3>                            
                  <div className="content-detail">{portfolios.description}</div>                        
                </div>
              </div>
            );
          })}
        </div>
        <div className="btn center">              
          <a href={pageData.acf.portfolio_link.url} title={pageData.acf.portfolio_link.title}>{pageData.acf.portfolio_link.title}</a>           
        </div>
      </div>
    </section>
    <section className="section contact-section">
      <div className="container fl">
        <span className="hidden-id" id="contact-us"></span>
        <div className="contact-img">                                
          <img width="665" height="775" data-org-src={pageData.acf.contact_background_image.url} data-src={pageData.acf.contact_background_image.url} className="lazy" alt={pageData.acf.contact_background_image.alt} title={pageData.acf.contact_background_image.title} src={pageData.acf.contact_background_image.url} />            
        </div>
        <div className="contact-form">
          <h2>{pageData.acf.contact_heading}</h2>
          <div className="request-form">
            <form action="?success=true" method="post" id="contact_form">
              <div className="field-row">
                  <div className="input-field">
                      <input type="text" name="full_name" size="40" required="" aria-label="Full Name" placeholder="Full Name *" />
                      <i className="icon-user"></i>
                  </div>
                  <div className="input-field">
                      <input type="tel" name="phone_number" size="40" required="" aria-label="Phone Number" placeholder="Phone Number *" />
                      <i className="icon-phone"></i>
                  </div>
              </div>
              <div className="field-row">
                  <div className="input-field">
                      <input type="email" name="email" size="40" required="" aria-label="Email Address" placeholder="Email Address *" />
                      <i className="icon-email"></i>
                  </div>
                  <div className="input-field">
                      <input type="text" name="position" size="40" required="" aria-label="Position" placeholder="Position *" />
                      <i className="icon-position"></i>
                  </div>
              </div>
              <div className="field-row">
                  <div className="input-field">
                      <input type="text" name="company" size="40" required="" aria-label="Company" placeholder="Company *" />
                      <i className="icon-company"></i>
                  </div>
              </div>
              <div className="field-row">
                  <div className="input-field">
                      <textarea name="describe" cols="40" rows="10" required="" aria-label="Description" placeholder="Your Message"></textarea>
                      <i className="icon-msg"></i>
                  </div>
              </div>

              <input type="submit" value="SEND" />
            </form>
          </div>
        </div>
      </div>
    </section>

    </>
  );
}

export default Home;
