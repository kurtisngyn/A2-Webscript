// Importing tools
import { useState } from "react";
import { createPortal } from "react-dom";

// Importing CSS and content for modal manipulation
import ModalContent from "./AddCandyModalContent"; // Updated to reference the candy modal content
import ACM from '../pages/AllCandies.module.css'; // Updated to reference the candies CSS file

function AddCandyModal({ onCandyAdded }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {/* Adding a button with attributes from the ACM CSS file */}
            {/* When clicked, setShowModal becomes true */}
            <button className={ACM["add-candy-btn"]} onClick={() => { setShowModal(true) }}>
                Add Candy
            </button>

            {showModal && createPortal(
                // If 'showModal' is true, render the modal content using 'createPortal'
                <ModalContent onCandyAdded={onCandyAdded} onClose={() => { setShowModal(false) }} />,
                document.body
            )}
        </>
    );
}

export default AddCandyModal;
