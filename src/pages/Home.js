import React from "react";

import Layout from "../components/Layout";
import Link from "../components/Link";

import "./Home.css";

function Home() {
  return (
    <Layout>
      <div className="home">
        <p className="home__paragraph">
          Hi. Welcome to "Learn Linux". This is a tutorial for beginners
          so that they can start leraning Linux. It is 100% free and you can
          even copy and share it elsewhere because first, I don't intend to make
          money out of this and second, the whole purpose of this is to be a
          help to the newcomers. You can take a look at the license if you want.
        </p>
        <p className="home__paragraph">
          The tutorial consists of a number of chapters, carefully organized so
          that you learn the fundamentals first and the composite stuff last.
          That is why I (the original author) suggest that you better start at
          the very beginning and work your way through the end one step at a
          time. If you think you really know the fundamentals, then by all
          means, head over to where you think you need to learn. For example, if
          you already have a Linux system installed, you may skip the
          installation chapters.
        </p>
        <p className="home__paragraph">
          The source consists of markdown files, so anyone can easily change it
          to make it better. If you think you need to make it better, just
          create a new branch and make that god damn pull request :) So let's
          begin, shall we?
        </p>
        <Link to="/chapters">Chapter List</Link>
      </div>
    </Layout>
  );
}

export default Home;
