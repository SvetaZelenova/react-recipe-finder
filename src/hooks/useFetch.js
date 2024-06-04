import { useQuery } from "@tanstack/react-query";

const useFetch = (getFnc, prm, query) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: [query],
    queryFn: () => getFnc(prm),
    staleTime: 10000,
  });

  return { data, error, isPending, isError };
};

export default useFetch;
