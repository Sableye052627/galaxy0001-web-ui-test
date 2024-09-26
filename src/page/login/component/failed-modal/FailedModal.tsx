import { Modal } from "antd";
import { Dispatch, SetStateAction } from "react";
import { useSuccessModal } from "./hook/useFailedModal";
import "./failed-modal.scss";

interface ISuccessModalProps {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}

export const SuccessModal = ({ show, setShow }: ISuccessModalProps) => {
    const { t, navigate, playerInfo, platformInfo } = useSuccessModal();

    const modalSetting = {
        className: "login-modal",
        title: t("loginFailed"),
        open: show,
        centered: true,
        closable: false,
        footer: null,
        onCancel: () => handleClose(),
        destroyOnClose: true,
    };

    function handleClose() {
        setShow(false);
    }

    return (
        <Modal {...modalSetting}>
            {`${t("loginSuccessMsg", { domainName: platformInfo?.platformName }) + " " + playerInfo?.playerID}.`}
            <div className="btn-close-red">
                <button onClick={() => handleClose()}>{t("close")}</button>
            </div>
        </Modal>
    );
};
