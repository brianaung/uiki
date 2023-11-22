import { useEffect, useState } from "react";

type Page = {
  title: string;
  body: string;
};

function App() {
  const [pages, setPages] = useState<Page[]>();
  const [page, setPage] = useState<Page>();

  const handleView = async (title: string) => {
    try {
      const res = await fetch(`http://localhost:4000/view/${title}`, {
        method: "POST",
      });
      const data = await res.json();
      setPage(data);
    } catch (error) {
      console.log(error);
      // setError(...
    }
  };

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
      <ul>
        {pages &&
          pages.map((v, idx) => (
            <li onClick={() => handleView(v.title)} key={idx}>
              {v.title}
            </li>
          ))}
      </ul>
      {page && <div style={{ border: "solid 1px red" }}>{page.title}</div>}
    </>
  );
}

export default App;
