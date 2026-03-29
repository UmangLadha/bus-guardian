import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getData, deleteData } from "../utils/apiHandlers";
import { queryClient } from "../libs/queryClient";
import { useAppDispatch } from "../redux/reduxHooks/reduxHooks";
import type { UseFetchDataProps } from "../types/types";

export function useFetchData<T>({
  endpoint,
  queryKey,
  sliceAction,
}: UseFetchDataProps<T>) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useQuery<T>({
    queryKey,
    queryFn: async () => {
      const { error, data } = await getData(endpoint);
      if (error) {
        toast.error(error);
        throw new Error(error);
      }
      if (data && sliceAction) {
        dispatch(sliceAction(data));
      }
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteData(`${endpoint}/${id}`);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.response || {};
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey });
      toast.success(res?.message || "Successfully deleted");
      setDeleteId(null);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete");
    },
  });

  const handleDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId);
    }
  };

  return {
    data: data,
    isLoading,
    isError,
    deleteId,
    setDeleteId,
    handleDelete,
    isDeleting: deleteMutation.isPending,
  };
}
