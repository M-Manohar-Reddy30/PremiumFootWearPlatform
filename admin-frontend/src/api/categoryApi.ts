import axios from "./axios";

export const getCategories = async () => {
  const { data } = await axios.get("/categories");
  return data;
};

export const createCategory = async (
  categoryData: any
) => {
  const { data } = await axios.post(
    "/categories",
    categoryData
  );

  return data;
};

export const updateCategory = async (
  id: string,
  categoryData: any
) => {
  const { data } = await axios.put(
    `/categories/${id}`,
    categoryData
  );

  return data;
};

export const deleteCategory = async (
  id: string
) => {
  const { data } = await axios.delete(
    `/categories/${id}`
  );

  return data;
};