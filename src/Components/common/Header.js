import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function Header() {
  const [pageData, setPageData] = useState(null);
  const basePath = 'https://dev.yasglobal.com';

  useEffect(() => {
    fetch('https://dev.yasglobal.com/wp-json/wp-api-menus/v2/menus/2')
      .then(response => response.json())
      .then(data => setPageData(data))
      .catch(error => console.error(error)); 
  }, []);

  if (!pageData) {
    return <div>Loading...</div>;
  }

  //console.log(pageData.items);

  return (
    <div id="page" className="site">
      <div className="header-top">
        <div className="container">
          <div className="left-header">
            <Link to="mailto:info@yasglobal.com" title="info@yasglobal.com">
              <i className="icon-mail" />
              info@yasglobal.com
            </Link>
          </div>
          <div className="right-header">
            <ul id="time-right">
              <li>
                <a role="button">
                  <i className="icon-time" />
                  Mon – Fri: 8:00am – 7:00pm
                </a>
              </li>
            </ul>
            <ul className="rihgt-socials">
              <li className="twitter">
                <a href="https://twitter.com/yasglobal" target="_blank" rel="noopner">
                  <i className="icon-twitter" />
                  Twitter
                </a>
              </li>
              <li className="facebook">
                <a href="https://www.facebook.com/yasglobal/" target="_blank" rel="noopner">
                  <i className="icon-facebook" />
                  Facebook
                </a>
              </li>
              <li className="linkedin">
                <a
                  href="https://www.linkedin.com/company/yasglobal/"
                  target="_blank" rel="noopner">
                  <i className="icon-linkedin" />
                  Linkedin
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <header id="masthead" className="site-header">
        <div className="container">
          <div className="logo-wrapp">
            <Link to="/" aria-label="logo" title="YAS Global">
              <img
                width={217}
                height={55}
                src="https://dev.yasglobal.com/wp-content/uploads/2022/05/yasglobal-logo.svg"
                alt="YAS Global"
                title="YAS Global"
              />
            </Link>
          </div>
          <div className="header-menu-wrapp">
            <button className="menu-btn">
              <span>mobile menu</span>
            </button>
            <nav
              id="site-navigation"
              className="main-navigations"
              aria-label="Primary Menu">
              <div className="menu-main-menu-container">
                <span className="menu-cross">x</span>
                <ul id="menu-main-menu" className="primary-menu">
                  {pageData.items && pageData.items.map((item, index) => {
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
                                  {child.children && (
                                    <ul className="sub-menu">
                                      {child.children.map((child2, child2Index) => {
                                        const relativeChild2Url = child2.url.replace(basePath, '');
                                        return (
                                          <li key={`sub-menu-item-${index}-${child2Index}-${child2.ID}`} className="menu-item">
                                            <Link to={relativeChild2Url} title={child2.title}>{child2.title}</Link>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  )}
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
            </nav>
          </div>
          <div className="search-wrapp">
            <i className="icon-search" />
            <form
              role="search"
              method="get"
              className="search-form"
              action="https://dev.yasglobal.com/">
              <label>
                <span className="screen-reader-text">Search for:</span>
                <input
                  type="search"
                  autoComplete="off"
                  className="search-field"
                  placeholder="Search …"
                  defaultValue
                  name="s"
                  title="Search for:"
                />
              </label>
              <button type="submit" className="search-submit">
                <span className="screen-reader-text">Search</span>
              </button>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
