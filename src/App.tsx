import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./page/home-page/HomePage";
import MainLayout from "./component/main-layout/MainLayout";
import GameLobby from "./page/game-lobby/GameLobby";
import Profile from "./page/profile/Profile";
import Login from "./page/login/Login";
import Suggestion from "./page/suggestion/Suggestion";
import GameMenu from "./page/game-menu/GameMenu";
import GameTransfer from "./page/game-transfer/GameTransfer";

function App() {
    const router = createBrowserRouter([
        {
            element: <MainLayout />,
            children: [
                {
                    path: "/",
                    element: <HomePage />,
                },
                {
                    path: "/login",
                    element: <Login />,
                },
                {
                    path: "/play-game/:category",
                    element: <GameLobby />,
                },
                {
                    path: "/game-menu/:category/:srno",
                    element: <GameMenu />,
                    //   hidden: !playerInfo,
                },
                {
                    path: "/game-transfer/:category/:srno/:gameID?",
                    element: <GameTransfer />,
                    //   hidden: !playerInfo,
                },
                {
                    path: "/suggestion",
                    element: <Suggestion />,
                    //   hidden: !playerInfo,
                },
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
