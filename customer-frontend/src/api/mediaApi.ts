import api from "./axios";

export const uploadImage =
async (
  file: File,
  token: string,
  folder = "footwear/reviews"
) => {

  const formData =
  new FormData();

  formData.append(
    "image",
    file
  );

  formData.append(
    "folder",
    folder
  );

  const res =
  await api.post(
    "/media/review-upload",
    formData,
    {
      headers:{
        Authorization:
        `Bearer ${token}`,
        "Content-Type":
        "multipart/form-data"
      }
    }
  );

  return res.data;

};