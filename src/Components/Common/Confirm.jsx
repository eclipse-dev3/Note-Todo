import { motion, AnimatePresence } from "framer-motion";

function ConfirmModal({ isOpen, title, message, onCancel, onConfirm, classes, confirmText }) {

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-100"
                    onClick={onCancel}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-xl shadow-2xl w-80 text-center p-5"
                    >
                        <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
                        <p className="text-gray-600 text-sm mb-5">{message}</p>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={onCancel}
                                className="px-4 py-2 rounded-md border cursor-pointer border-gray-300 bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className={`px-4 py-2 rounded-md cursor-pointer text-white font-medium  transition ${classes}`}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )
            }
        </AnimatePresence >
    );
}

export default ConfirmModal;
