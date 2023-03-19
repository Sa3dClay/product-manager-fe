const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
            <div
                className="absolute inset-0 bg-gray-900 opacity-50"
                onClick={onClose}
            ></div>
            <div className="relative bg-white rounded-md shadow-md w-1/2">
                {children}
            </div>
        </div>
    );
};

export default Modal;
