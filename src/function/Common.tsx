import Swal from "sweetalert2";

export function formatNumber(value: any) {
    return Number(value).toLocaleString(undefined, {
        minimumFractionDigits: 2,
    });
}

export function confirmWithdrawAll(setPlayerInfo: any) {
    Swal.fire({
        text: "Confirm withdraw all balance",
        icon: "info",
        showCancelButton: true,
        color: "#fff",
        background: "#434343",
    }).then((result) => {
        if (result.isConfirmed) {
            // withdrawAllBalance(setPlayerInfo);
        }
    });
}

export function isMobile() {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
}