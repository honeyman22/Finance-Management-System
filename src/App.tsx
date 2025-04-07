import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
