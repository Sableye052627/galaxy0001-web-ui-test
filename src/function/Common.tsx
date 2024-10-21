import Swal from "sweetalert2";
import { theOneApi } from "../service/CallApi";

export const domainName =
    window.location.hostname === "localhost"
        ? "win22"
        : window.location.hostname === "staging.win22.asia"
        ? "win22"
        : window.location.hostname.split(".")[0];

export function formatNumber(value: any) {
    return Number(value).toLocaleString(undefined, {
        minimumFractionDigits: 2,
    });
}

export function confirmWithdrawAll(setPlayerInfo: any, text: string) {

    Swal.fire({
        text: text,
        icon: "info",
        showCancelButton: true,
        color: "#fff",
        background: "#434343",
    }).then((result) => {
        if (result.isConfirmed) {
            withdrawAllBalance(setPlayerInfo);
        }
    });
}

export async function withdrawAllBalance(setPlayerInfo: any) {
    Swal.fire({
        text: "Withdrawal In Progress",
        didOpen: () => Swal.showLoading(),
        allowEscapeKey: false,
        allowEnterKey: false,
        allowOutsideClick: false,
        color: "#fff",
        background: "#434343",
    });
    try {
        const object = {
            DomainName: domainName,
            PlayerID: localStorage.getItem("PlayerID"),
            PlayerToken: localStorage.getItem("PlayerToken"),
        };
        const result = await theOneApi("/withdraw-balance", object);
        if (result.status) {
            setPlayerInfo(result.data);
            Swal.close();
        }
    } catch (error: any) {}
}

export function isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
}
