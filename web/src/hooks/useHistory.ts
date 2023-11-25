import { useLocation } from "wouter";

export const useHistory = () => {
  const [location] = useLocation();

  const setLocation = (path: string, data?: any) => {
    history.pushState(data, "", path);
  };

  return [location, setLocation, history.state];
};
