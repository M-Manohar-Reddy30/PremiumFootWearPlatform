import { useDispatch } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";

export default function useTheme() {

  const dispatch = useDispatch();

  const handleToggleTheme = () => {

    document.documentElement.classList.toggle(
      "dark"
    );

    dispatch(
      toggleTheme()
    );

  };

  return {
    handleToggleTheme,
  };

}