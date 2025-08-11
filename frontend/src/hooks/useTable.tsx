import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteData, getData } from "../utils/apiHandlers";
import toast from "react-hot-toast";
import { queryClient } from "../libs/queryClient";
import { useState } from "react";
import type { UseTableProps } from "../types/types";

export function useTable({ queryKey, endpoint }: UseTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isError, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const { data, error } = await getData(endpoint);
      if (error) toast.error(error);
      return data || [];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { response, error } = await deleteData(`${endpoint}/${id}`);
      if (error) throw new Error(error);
      return response;
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey });
      toast.success(res?.message || " Successfully deleted");
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
    data: data || [],
    isLoading,
    isError,
    deleteId,
    setDeleteId,
    handleDelete,
    isDeleting: deleteMutation.isPending,
  };
}
