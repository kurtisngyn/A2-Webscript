import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './UpdateCandyModalContent'; // Updated to reference the candy modal content

import ACM from '../pages/AllCandies.module.css'; // Updated to reference the candies CSS file

// Defining the UpdateCandyModal component
function UpdateCandyModal({ onCandyUpdated, candy }) {
    // State to manage modal visibility
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {/* Edit Button */}
            {/* Triggers modal */}
            <button className={ACM['edit-button']} onClick={() => setShowModal(true)}>
                Edit
            </button>

            {/* Modal */}
            {showModal &&
                createPortal(
                    <>
                        {/* Background Overlay */}
                        {/* Closes modal on click */}
                        <div className={ACM['UCM-overlay']} onClick={() => setShowModal(false)}></div>

                        {/* Modal Popup */}
                        <div className={ACM['UCM-popup']}>
                            {/* Close Button with unique CSS styling */}
                            <button
                                className={ACM['close-button']}
                                onClick={() => setShowModal(false)}
                                aria-label="Close Modal"
                            >
                                &times;
                            </button>
                            {/* Rendering the form inside the modal */}
                            <ModalContent
                                onCandyUpdated={onCandyUpdated}
                                candy={candy}
                                onClose={() => setShowModal(false)}
                            />
                        </div>
                    </>,
                    document.body
                )}
        </>
    );
}

// Exporting the component to be used elsewhere
export default UpdateCandyModal;
