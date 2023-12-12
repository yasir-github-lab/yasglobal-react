import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function TechExp() {
  const [pageData, setPageData] = useState(null);
  const basePath = "https://dev.yasglobal.com";

  useEffect(() => {
    fetch("https://dev.yasglobal.com/wp-json/wp-api-menus/v2/menus/6")
      .then((response) => response.json())
      .then((data) => setPageData(data))
      .catch((error) => console.error(error));
  }, []);

  if (!pageData) {
    return <div>Loading...</div>;
  }

  //console.log(pageData.items);

  return (
    <>
      <h2>Technical Expertise</h2>
      <div id="nav_menu-4" className="widget widget_nav_menu">
        <div className="menu-technical-expertise-container">
          <ul className="menu">
            {pageData.items &&
              pageData.items.map((item, index) => {
                const relativeUrl = item.url.replace(basePath, "");
                return (
                  <li
                    key={`menu-item-${index}-${item.ID}`}
                    className="menu-item">
                    <Link to={relativeUrl} title={item.title}>
                      {item.title}
                    </Link>
                    {item.children && (
                      <ul className="sub-menu">
                        {item.children.map((child, childIndex) => {
                          const relativeChildUrl = child.url.replace(
                            basePath,
                            ""
                          );
                          return (
                            <li
                              key={`sub-menu-item-${index}-${childIndex}-${child.ID}`}
                              className="menu-item">
                              <Link to={relativeChildUrl} title={child.title}>
                                {child.title}
                              </Link>
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
    </>
  );
}

export default TechExp;
