import { useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { postData, updateData } from "../utils/apiHandlers";
import { queryClient } from "../libs/queryClient";
import type { UseFormProps } from "../types/types";

export function useForm<T extends { _id?: string }>({
  endpoint,
  queryKey,
  initialData,
  onSuccess,
}: UseFormProps<T>) {
  const [formData, setFormData] = useState<T>(initialData);

  const handleInputChange = useCallback(
    (field: string, value: string | number) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const resetForm = useCallback(() => {
    setFormData(initialData);
  }, [initialData]);

  const createMutation = useMutation({
    mutationFn: async (data: T) => await postData(`${endpoint}/register`, data),
    onSuccess: (res) => {
      console.log("update response", res);
      toast.success(res.message || "Successfully created");
      queryClient.invalidateQueries({ queryKey });
      resetForm();
      onSuccess?.();
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to create");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: T) =>
      await updateData(`${endpoint}/${data._id}`, data),
    onSuccess: (res) => {
      toast.success(res.message || "Successfully updated");
      queryClient.invalidateQueries({ queryKey });
      resetForm();
      onSuccess?.();
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to update");
    },
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent, isEditMode: boolean) => {
      e.preventDefault();

      console.log("here is the seleted data", formData);

      if (isEditMode) {
        updateMutation.mutate(formData);
      } else {
        createMutation.mutate(formData);
      }
    },
    [formData, createMutation, updateMutation]
  );

  return {
    formData,
    setFormData,
    handleInputChange,
    resetForm,
    handleSubmit,
    isLoading: createMutation.isPending || updateMutation.isPending,
  };
}
