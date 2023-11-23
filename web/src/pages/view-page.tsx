import { useParams } from "wouter";

const ViewPage = () => {
  // const [page, setPage] = useState<Page>();
  //
  // const handleView = async (title: string) => {
  //   try {
  //     const res = await fetch(`http://localhost:4000/view/${title}`, {
  //       method: "POST",
  //     });
  //     const data = await res.json();
  //     setPage(data);
  //   } catch (error) {
  //     console.log(error);
  //     // setError(...
  //   }
  // };

  const params = useParams();
  console.log(params.title);

  return (
    <>
      <h2>This is the view page.</h2>
    </>
  );
};

export default ViewPage;
