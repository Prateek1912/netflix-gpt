import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import MovieDetails from "./MovieDetails";
import GptSearch from "./GptSearch";


const Body = () => {
    const appRouter = createBrowserRouter([
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/browse",
        element: <Browse />,
      },
      {
        path: "/movie",
        element: <MovieDetails />,
      },
      {
        path: "/search",
        element: <GptSearch/>
      }
    ]);
    
    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}

export default Body;