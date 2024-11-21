import { useNavigate } from "react-router-dom";

export const useTelegramAccess = () => {
    const navigate = useNavigate();

    return { navigate };
};
