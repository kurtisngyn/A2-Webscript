// Importing tools
import { useState } from "react";
import { createPortal } from "react-dom";

// Importing the delete candy modal content
import DeleteCandyModalContent from "./DeleteCandyModalContent";

// Importing CSS styling for buttons
import ACM from '../pages/AllCandies.module.css';

function DeleteCandyModal({ candy, onCandyDeleted }) {
    // State to control whether the modal is shown or not
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {/* Adding a button with CSS styling */}
            {/* When clicked, setShowModal becomes true */}
            <button className={ACM["delete-btn"]} onClick={() => { setShowModal(true) }}>
                Delete
            </button>
            {/* If showModal is true, display the DeleteCandyModalContent component inside a portal */}
            {showModal && createPortal(
                <DeleteCandyModalContent
                    candy={candy}
                    onCandyDeleted={onCandyDeleted}
                    onClose={() => { setShowModal(false) }}
                />,
                document.body
            )}
        </>
    );
}

// Exporting the component so it can be used in other parts of the application
export default DeleteCandyModal;
