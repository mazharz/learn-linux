import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import marked from "marked";

import Layout from "../components/Layout";

import "./Chapter.css";

import data from "../data";

function Chapter() {
  const [chapterHtml, setChapterHtml] = useState(null);
  const [chapterTitle, setChapterTitle] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const urlName = location.pathname.split("/")[2];
    const chapterName = data.filter((chapter) => chapter.url === urlName);
    setChapterTitle(chapterName[0]);
    const chapterMarkdown = require("../markdown/" + chapterName[0].file);

    fetch(chapterMarkdown)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        marked.setOptions({ gfm: true });
        setChapterHtml({ markdown: marked(text) });
      });
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });

  return (
    <Layout>
      <div className="chapter">
        {chapterTitle ? (
          <div className="chapter__title">{chapterTitle.name}</div>
        ) : null}
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
