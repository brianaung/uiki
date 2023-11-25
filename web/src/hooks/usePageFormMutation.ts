import { useMutation } from "react-query";
import { useLocation } from "wouter";

export const usePageFormMutation = () => {
  const [_, setLocation] = useLocation();

  /* handle edit and save form */
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      await fetch(`${import.meta.env.VITE_UIKI_SERVER_URL}/save`, {
        method: "POST",
        body: formData,
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error(await res.text());
        }
      });
      // return title here so it can be accessed inside onSuccess
      return formData.get("title") as string;
    },
    onSuccess: (title) => {
      setLocation(`/view/${encodeURIComponent(title)}`);
    },
    onError: (error) => {
      alert(error);
    },
  });

  return mutation;
};
