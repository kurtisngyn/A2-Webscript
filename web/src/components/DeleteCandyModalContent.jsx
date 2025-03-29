// Importing styling
import ACM from '../pages/AllCandies.module.css';

function DeleteCandyModalContent({ candy, onClose, onCandyDeleted }) {
    const handleDeleteCandy = (event) => {
        event.preventDefault();
        // Fetching our backend API candies
        fetch(`http://localhost:3000/candies/${candy.id}`, {
            // DELETE method here
            method: "DELETE"
        })
            // Converting it into readable JSON
            .then((response) => response.json())
            .then((data) => {
                // Console logging the data
                console.log(data);
                // Notifying the parent component that the candy was deleted
                onCandyDeleted();
                // Closing the modal after deletion
                onClose();
            })
            .catch((error) => console.error('Error deleting candy:', error));
    };

    return (
        // Modal container with custom styling
        <div className={`${ACM["delete-modal-prompt"]}`}>
            <div>
                {/* Confirmation message with the candy name and category */}
                <h3>Are you sure you want to delete {candy.name} ({candy.category})?</h3>
                {/* Form that triggers the delete function when submitted */}
                <form onSubmit={handleDeleteCandy}>
                    <button
                        className={`${ACM["delete-candy-btn"]}`}
                        type="submit"
                    >
                        Yes, delete this candy.
                    </button>
                </form>
                {/* Button to close the modal without deleting the candy */}
                <button onClick={onClose}
                    className={`${ACM["exit-btn"]}`}
                >x</button>
            </div>
        </div>
    );
}

// Exporting it to be used elsewhere
export default DeleteCandyModalContent;
