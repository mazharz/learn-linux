import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import marked from "marked";

import Layout from "../components/Layout";
import Link from "../components/Link";

import "./Chapter.css";

import data from "../data";

function Chapter() {
  const [chapterHtml, setChapterHtml] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const urlName = location.pathname.split("/")[2];
    console.log(urlName);
    const chapterName = data.filter((chapter) => chapter.url === urlName);
    console.log(chapterName)
    const chapterMarkdown = require("../markdown/" + chapterName[0].file);

    fetch(chapterMarkdown)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        setChapterHtml({ markdown: marked(text) });
      });
  }, []);

  return (
    <Layout>
      <div className="chapter">
        {chapterHtml ? (
          <article
            dangerouslySetInnerHTML={{ __html: chapterHtml.markdown }}
          ></article>
        ) : null}
      </div>
    </Layout>
  );
}

export default Chapter;
