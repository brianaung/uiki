import { useEffect, useState } from "react";
import { Link } from "wouter";

type Page = {
  title: string;
  body: string;
};

const LandingPage = () => {
  const [pages, setPages] = useState<Page[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:4000/");
        const pages = await res.json();
        setPages(pages);
      } catch (error) {
        console.log(error);
        // todo: handle error gracefully
        // setError(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h2>This is the landing page.</h2>
      <ul>
        {pages &&
          pages.map((v, idx) => (
            <li key={idx}>
              <Link href={`/view/${v.title}`}>{v.title}</Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default LandingPage;
