import { useMutation } from "react-query";
import { useLocation } from "wouter";

// TODO:
// setLoading(true) when mutation starts
// setLoading(false) either on success or error
// then return success or error state? the caller can display a message
export const usePageFormMutation = () => {
  const [_, setLocation] = useLocation();

  /* handle edit and save form */
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      await fetch(`${import.meta.env.VITE_UIKI_SERVER_URL}/save`, {
        method: "POST",
        body: formData,
      });
      // return title here so it can be accessed inside onSuccess
      return formData.get("title") as string;
    },
    onSuccess: (title) => {
      setLocation(`/view/${encodeURIComponent(title)}`);
    },
  });

  return mutation;
};
