import { useState } from "react";
import InterestsInput from "../utils/InterestsInput";

type EditInterestsOverlayProps = {
    userInterests: Set<string>;
    handleInterestsOverlayClose: (newSelectedInterests: Set<string>) => void;
};

function EditInterestsOverlay({userInterests, handleInterestsOverlayClose}: EditInterestsOverlayProps) {
    let [selectedInterests, setSelectedInterests] = useState(userInterests);

    function handleClose() {
        handleInterestsOverlayClose(selectedInterests);
    }

    function handleInterestsApply(newSelectedInterests: Set<string>) {
        // handle submit...

        setSelectedInterests(newSelectedInterests);
        handleInterestsOverlayClose(newSelectedInterests);
    }

    function handleBackgroundClick(e: React.MouseEvent<HTMLDivElement>) {
        const classes = (e.target as HTMLElement).classList;
        if (classes.contains('bg-black') && classes.contains('bg-opacity-40')) {
            handleInterestsOverlayClose(selectedInterests);
        }
    }

    return (
        <div onClick={handleBackgroundClick} className="fixed z-10 flex justify-center items-center inset-0 bg-black bg-opacity-40">
            <div className="bg-white overflow-y-auto scollbar rounded-18px flex flex-col h-full w-550px overlay-slide" style={{maxHeight: 813}}>
                <div className="flex justify-between items-center w-full mt-4">
                    <h2 style={{ fontSize: '30px' }} className="ml-5">Edit Interests</h2>
                    <img
                        src="/icons/overlay-cross-icon.svg"
                        alt="cross icon"
                        className="cursor-pointer mr-5"
                        width={44}
                        height={44}
                        onClick={handleClose}
                    />
                </div>
                <div className="mt-3">
                    <img src="/icons/overlay-divider.svg" className="w-full" alt="overlay divider"/>
                </div>
                
                <div className="ml-4 flex flex-col gap-10 mt-20">
                    <InterestsInput initialySelectedInterests={userInterests} handleInterestsSave={handleInterestsApply}/>
                </div>
            </div>
        </div>
    )
}

export default EditInterestsOverlay;