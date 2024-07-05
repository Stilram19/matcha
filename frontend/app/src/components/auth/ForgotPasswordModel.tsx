import { useState } from "react";

type ForgotPasswordModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (email: string) => void;
};

const ForgotPasswordModal = ({ isOpen, onClose, onSubmit }: ForgotPasswordModalProps) => {
    const [email, setEmail] = useState("");

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(email);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl mb-4">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className="block mb-2">Enter your email address:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="p-2 border border-gray-300 rounded-lg w-full mb-4"
                        required
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Submit</button>
                    <button type="button" onClick={onClose} className="ml-4 text-gray-600">Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordModal;
