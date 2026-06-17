import api from "./axios";

export const uploadImage =
  async (
    file: File,
    folder: string
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
        "/media/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return res.data;
  };