import React, { useEffect, useState } from "react";
// import marked from "marked";

import Layout from "../components/Layout";
import Link from "../components/Link";

import "./Chapters.css";

import data from "../data";

function Chapters() {
  // const [chapterHtml, setChapterHtml] = useState(null);

  // useEffect(() => {
  //   const chaptersMarkdown = require("../markdown/chapters.md");

  //   fetch(chaptersMarkdown)
  //     .then((response) => {
  //       return response.text();
  //     })
  //     .then((text) => {
  //       setChapterHtml({ markdown: marked(text) });
  //     });
  // }, []);

  return (
    <Layout>
      <div className="chapters">
        {data.map((chapter, index) => (
          <Link to={"/chapter/" + chapter.name.replace(/\s/g, "")} key={index}>
            {chapter.name}
          </Link>
        ))}
      </div>
      {/* {chapterHtml ? 
      <article dangerouslySetInnerHTML={{ __html: chapterHtml.markdown }}></article>
      : null } */}
    </Layout>
  );
}

export default Chapters;
