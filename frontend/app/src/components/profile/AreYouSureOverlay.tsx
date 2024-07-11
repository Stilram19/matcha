type AreYouSureOverlayProps = {
    actionType: string;
    onContinue: () => void;
    onCancel: () => void;
};

function AreYouSureOverlay({ actionType, onContinue, onCancel }: AreYouSureOverlayProps) {
    return (
        <div className="fixed z-10 flex justify-center items-center inset-0 bg-black bg-opacity-40">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
                <div className="flex space-x-4">
                    <button
                        onClick={onCancel}
                        className="text-red-500 hover:underline flex items-center"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onContinue}
                        className="text-green-500 hover:underline flex items-center"
                    >
                        {actionType}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AreYouSureOverlay;
