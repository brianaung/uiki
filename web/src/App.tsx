import { useEffect, useState } from "react";

type Page = {
  title: string;
  body: string;
};

function App() {
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
      <h1>Hello World!</h1>
      <ul>{pages && pages.map((v, idx) => <li key={idx}>{v.title}</li>)}</ul>
    </>
  );
}

export default App;
