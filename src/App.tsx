import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./page/home-page/HomePage";
import MainLayout from "./component/main-layout/MainLayout";
import GameLobby from "./page/game-lobby/GameLobby";
import Profile from "./page/profile/Profile";

function App() {
    const router = createBrowserRouter([
        {
            element: <MainLayout />,
            children: [
                {
                    path: "/",
                    element: <HomePage />,
                },
                // {
                //   path: "/login",
                //   element: ,
                // },
                {
                    path: "/play-game/:category",
                    element: <GameLobby />,
                },
                // {
                //   path: "/play-game/:category/:gameCode",
                //   element: GameMenu,
                //   hidden: !playerInfo,
                // },
                // {
                //   path: "/suggestion",
                //   element: Suggestion,
                //   hidden: !playerInfo,
                // },
                {
                    path: "/player-info/:key",
                    element: <Profile />,
                    //   hidden: !playerInfo,
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
