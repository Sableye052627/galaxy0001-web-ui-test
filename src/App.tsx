import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./page/home-page/HomePage";
import MainLayout from "./component/main-layout/MainLayout";
import GameLobby from "./page/game-lobby/GameLobby";
import Profile from "./page/profile/Profile";
import Login from "./page/login/Login";
import SignUp from "./page/signup/SignUp";
import Suggestion from "./page/suggestion/Suggestion";
import GameMenu from "./page/game-menu/GameMenu";
import GameTransfer from "./page/game-transfer/GameTransfer";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    path: "",
                    element: <HomePage />,
                },
                {
                    path: "signup",
                    element: <SignUp />,
                },
                {
                    path: "play-game/:category",
                    element: <HomePage />,
                },
                {
                    path: "game-menu/:category/:srno",
                    element: <GameMenu />,
                },
                {
                    path: "game-transfer/:category/:srno/:gameID?",
                    element: <GameTransfer />,
                },
                {
                    path: "suggestion",
                    element: <Suggestion />,
                },
                {
                    path: "player-info/:key",
                    element: <Profile />,
                },
            ],
        },
        {
            path: "/login",
            element: <Login />,
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
