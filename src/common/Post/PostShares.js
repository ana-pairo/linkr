import { useEffect } from "react";
import { useState } from "react";
import { FaShare } from "react-icons/fa";
import { getTotalPostShares } from "../../services/axiosService";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

export default function PostShares ({ obj, isDisable, setIsDisable }) {
    const shareStyle = { color: "#FFFFFF", fontSize: "20px", cursor: "pointer" };
    const [totalShares, setTotalShares] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        getTotalPostShares(obj.id)
            .then(res => setTotalShares(res.data))
            .catch(error => console.log(error));
    }, [isDisable]);

    function openModal() {
      setModalIsOpen(true);
    }

    return (
        <>
            <FaShare style={shareStyle} onClick={openModal}></FaShare>
            <p>{totalShares} re-post</p>
            <ConfirmationModal
                obj={obj}
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                isDisable={isDisable}
                setIsDisable={setIsDisable}
                action="share"
                message="Do you want to re-post this link?"
                cancelText="No, cancel"
                confirmText="Yes, share!"
            />
        </>
    )
}