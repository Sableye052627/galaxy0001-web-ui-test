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
  const { t, i18n, navigate, playerInfo, platformInfo } = useSuccessModal();

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
    //navigate("/select-game/slot");
    //
    if(window.location.hostname.split('.')[0] == "ui-test" && playerInfo?.contactPermissionAsked == 0){
      window.location.href = `${window.location.protocol}//${window.location.host}/permission?srno=${playerInfo?.srno}&lang=${i18n.language}`
    }
    else{
      //navigate("/select-game/slot");
      
      fetch('https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/apk/version.json')
      .then(response => response.json())
      .then(data => {
        const telegramLink = data[0].telegramLink;
        window.location.href = `${window.location.protocol}//${window.location.host}/telegram?url=${telegramLink}`
      })
      .catch(error => console.error('Error fetching data:', error));
    }
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
