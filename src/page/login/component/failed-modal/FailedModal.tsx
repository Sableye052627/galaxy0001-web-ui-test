import { Modal } from "antd";
import { Dispatch, SetStateAction } from "react";
import { useFailedModal } from "./hook/useFailedModal";
import "./failed-modal.scss";

interface IFailedModalProps {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    errorMsg: string;
}

export const FailedModal = ({ show, setShow, errorMsg }: IFailedModalProps) => {
    const { t, navigate, playerInfo, platformInfo } = useFailedModal();

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
            {errorMsg }
            <div className="btn-close-red">
                <button onClick={() => handleClose()}>{t("close")}</button>
            </div>
        </Modal>
    );
};
