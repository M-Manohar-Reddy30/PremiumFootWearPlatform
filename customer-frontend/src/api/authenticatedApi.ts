import axios from "axios";

const authenticatedApi =
axios.create({
  baseURL:
    import.meta.env.VITE_API_URL,
});

export default authenticatedApi;