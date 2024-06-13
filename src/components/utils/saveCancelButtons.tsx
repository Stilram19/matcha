type SaveCancelButtonProps = {
    width: number;
    height: number;
    handleCancel: () => void;
    handleSave: () => void;
};

function SaveCancelButtons({width, height, handleCancel, handleSave}: SaveCancelButtonProps) {
    const buttonStyle = {borderRadius: 6, width: width, height: height};

    return (
        <div className="flex justify-end gap-3 mr-10 mb-10">
            <button onClick={handleCancel} className="bg-cancel-gray" style={buttonStyle}>cancel</button>
            <button onClick={handleSave} className="text-white bg-button-pink hover:scale-105 focus:ring font-bold" style={buttonStyle}>save</button>
        </div>
    )
}

export default SaveCancelButtons;