type ApplyCancelButtonsProps = {
    width: number;
    height: number;
    handleCancel: () => void;
    handleApply: () => void;
};

function ApplyCancelButtons({width, height, handleCancel, handleApply}: ApplyCancelButtonsProps) {
    const buttonStyle = {borderRadius: 6, width: width, height: height};

    return (
        <div className="flex justify-end gap-3 mr-10 mb-10">
            <button onClick={handleCancel} className="bg-cancel-gray" style={buttonStyle}>cancel</button>
            <button onClick={handleApply} className="text-white bg-button-pink hover:scale-105 focus:ring font-bold" style={buttonStyle}>Apply</button>
        </div>
    )
}

export default ApplyCancelButtons;