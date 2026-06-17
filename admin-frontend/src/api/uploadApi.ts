import axios from "./axios";

export const uploadImage =
async(file:File)=>{

const formData =
new FormData();

formData.append(
"image",
file
);

const {data} =
await axios.post(
"/media/upload",
formData,
{
headers:{
"Content-Type":
"multipart/form-data"
}
}
);

return data;

};