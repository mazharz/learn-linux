import React from "react";

import Layout from "../components/Layout";
import Link from "../components/Link";

import "./Chapters.css";

import data from "../data";

function Chapters() {
  return (
    <Layout>
      <div className="chapters">
        {data.map((chapter, index) => (
          <Link to={"/chapter/" + chapter.url} key={index}>
            {chapter.name}
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export default Chapters;
