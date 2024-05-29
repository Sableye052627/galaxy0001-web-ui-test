import Swal from "sweetalert2";
import { Upload } from "antd";

export function getFile(e: any) {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
}

export function getBase64(file: any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

export function checkImage(file: any) {
    const validType = ["jpg", "jpeg", "png"];

    const isValidSize = file.size < 5000000;
    const isValidType = validType.includes(file.type.split("/")[1]);

    if (!isValidSize || !isValidType) {
        Swal.fire({
            html: `<p>Image format <strong>jpg</strong> or <strong>png</strong>, max size <strong>5MB</strong></p>`,
            icon: "warning",
        });
        return Upload.LIST_IGNORE;
    }
    return false;
}

export async function previewImage(file: any) {
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
    }
    return file.url || file.preview;
}
