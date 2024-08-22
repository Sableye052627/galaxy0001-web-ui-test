import { Button, Col, Form, InputNumber, Row, Spin, message } from "antd";

import "./play-game.scss";
import { gridSetting } from "../../component/main-layout/MainLayout";
import { usePlayGame } from "./hook/usePlayGame";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { gameProviderApi, theOneApi } from "../../service/CallApi";
import Swal from "sweetalert2";
import { validateToken } from "../../function/ApiFunction";
import { formatNumber, isMobile } from "../../function/Common";

const PlayGame = () => {
    const { t, navigate, playerInfo, setPlayerInfo, setAgentInfo, hostname, windowWidth, windowHeight } = usePlayGame();
    const { category, srno, gameID } = useParams();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const initialValue = {
        amount: playerInfo?.wallet1,
    };

    const [showDownload, setShowDownload] = useState<boolean>(false);

    useEffect(() => {
        console.log(windowWidth)
    }, [category, srno]);

    return (
        <Row  justify="center">
            <iframe style={{width: windowWidth, height: windowHeight}} src="https://client.pplc001.net/desktop/spaceman/?tabletype=spaceman&casino_id=ppcds00000002422&web_server=https:%2F%2Fgs17.pplc001.net&config_url=%2Fcgibin%2Fappconfig%2Fxml%2Fconfigs%2Furls.xml&JSESSIONID=-ltQEuxKAZkjmUnt5S9shOXI0IDebWjZZau2SElNr_C3N1a9JuIO!-1958674880-9dd6fdc4&table_id=spacemanyxe123nh&socket_server=wss:%2F%2Fgs17.pplc001.net%2Fgame&token=-ltQEuxKAZkjmUnt5S9shOXI0IDebWjZZau2SElNr_C3N1a9JuIO!-1958674880-9dd6fdc4&stats_collector_uuid=0cb5068b-35ee-48fd-ac9d-8acae9cffd25&actual_web_server=https:%2F%2Fgs17.pplc001.net&socket_port=443&uiAddress=https:%2F%2Fclient.pplc001.net%2Fdesktop%2Fspaceman%2F&uiversion=1.15.2&gametype=spaceman&operator_theme=default%2Fsm1.1&game_mode=html5_desktop&lobby_version=2&lang=en&swf_lobby_path=%2Fmember%2Fgames%2Flobby.swf&meta_server=https:%2F%2Fgames.pplc001.net&lobbyGameSymbol=null"></iframe>
        </Row>
    );
};

export default PlayGame;
