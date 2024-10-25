import { Modal } from "antd";
import { Dispatch, SetStateAction } from "react";
import { useSuccessModal } from "./hook/useSuccessModal";
import "./success-modal.scss";
import { websiteName } from "../../../../function/Common";

interface ISuccessModalProps {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}

export const SuccessModal = ({ show, setShow }: ISuccessModalProps) => {
    const { t, navigate, playerInfo, platformInfo } = useSuccessModal();

    const modalSetting = {
        className: "login-modal",
        title: t("loginSuccess"),
        open: show,
        centered: true,
        closable: false,
        footer: null,
        onCancel: () => handleClose(),
        destroyOnClose: true,
    };

    function handleClose() {
        setShow(false);
        navigate("/select-game/live");
    }

    return (
        <Modal {...modalSetting}>
            {`${t("loginSuccessMsg", { domainName: platformInfo?.platformName, websiteName: websiteName }) + " " + playerInfo?.playerID}.`}
            <div className="btn-close-red">
                <button onClick={() => handleClose()}>{t("close")}</button>
            </div>
        </Modal>
    );
};
