import { Outlet } from "react-router-dom";
import { PhoneOutlined } from "@ant-design/icons";

import "./language-modal.scss";
import { playerApi } from "../../service/CallApi";
import { Modal, message } from "antd";
import { useLanguageModal } from "./hook/useLanguageModal";
import { Dispatch, SetStateAction } from "react";
import Cookies from "js-cookie";

interface ILanguageModalProps {
    lang: boolean;
    setLang: Dispatch<SetStateAction<boolean>>;
}

const LanguageModal = ({ lang, setLang }: ILanguageModalProps) => {
    const { t, i18n, navigate, platformInfo, windowWidth, playerInfo, hostname } = useLanguageModal();

    const currentLng = i18n.language;
    let language = currentLng === "EN" || currentLng === "en-US" ? "english" : currentLng === "ZH" || currentLng === "zh-CN" ? "mandarin" : "bahasa";

    const modalSetting = {
        className: "language-modal",
        open: lang,
        centered: true,
        footer: null,
        width: 330,
        closable: false,
        onCancel: () => setLang(false),
        destroyOnClose: true,
    };

    async function handleLang(lang: string) {
        if (!playerInfo) {
            i18n.changeLanguage(lang);
            setLang(false);
            return;
        }

        try {
            const object = {
                Hostname: hostname,
                PlayerID: Cookies.get("PlayerID"),
                PlayerToken: Cookies.get("PlayerToken"),
                Language: lang,
            };
            const result = await playerApi("/update-language", object);
            if (result.status) {
                message.success(result.message);
            }
        } catch (error) {
            console.log(error);
            // message.error({ content: error?.response?.data?.message, key: error?.response?.data?.message });
        }
        i18n.changeLanguage(lang);
        setLang(false);
    }

    return (
        <Modal {...modalSetting}>
            <div className={`item ${language === "english"}`} onClick={() => handleLang("EN")}>
                {t("english")}
            </div>

            <div className={`item ${language === "mandarin"}`} onClick={() => handleLang("ZH")}>
                {t("mandarin")}
            </div>

            <div className={`item ${language === "bahasa"}`} onClick={() => handleLang("BM")}>
                {t("bahasa")}
            </div>
        </Modal>
    );
};

export default LanguageModal;
