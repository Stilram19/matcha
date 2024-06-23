import { useState } from "react";
import FameRatingFilter from "./FameRatingFilter";
import InterestsInput from "../utils/InterestsInput";
import AgeGapFilter from "./age-gap-filter/AgeGapFilter";

type FilterOverlayProps = {
    handleFilterOverlayClose: () => void;
};

function FilterOverlay({handleFilterOverlayClose}: FilterOverlayProps) {
    let [minFameRating, setMinFameRating] = useState(0);
    let [maxFameRating, setMaxFameRating] = useState(5);
    let [minAge, setMinAge] = useState(18);
    let [maxAge, setMaxAge] = useState(30);
    let [selectedInterests, setSelectedInterests] = useState<Set<string>>(new Set([]));

    function handleBackgroundClick(e: React.MouseEvent<HTMLDivElement>) {
        const classes = (e.target as HTMLElement).classList;
        if (classes.contains('bg-black') && classes.contains('bg-opacity-40')) {
            handleFilterOverlayClose();
        }
    }

    function handleClose() {
        handleFilterOverlayClose();
    }

    // function handleSubmit() {
    //     // handle submit
    //     handleFilterOverlayClose();
    // }

    function handleFameRatingFilterApply(minFameRating: number, maxFameRating: number) {
        setMinFameRating(minFameRating);
        setMaxFameRating(maxFameRating);
    }

    function handleinterestsFilterApply(newSelectedInterests: Set<string>) {
        setSelectedInterests(new Set(newSelectedInterests));
        console.log('saved:')
        console.log(newSelectedInterests);
    }

    function handleAgeGapFilterApply(newMinAge: number, newMaxAge: number) {
        setMinAge(newMinAge);
        setMaxAge(newMaxAge);
    }

    return (
        <div onClick={handleBackgroundClick} className="fixed z-30 flex justify-center items-center inset-0 bg-black bg-opacity-40">
            <div className="bg-white overflow-y-auto rounded-18px flex flex-col h-full w-550px overlay-slide" style={{maxHeight: 813}}>
                <div className="flex justify-between items-center w-full mt-4">
                    <h2 style={{ fontSize: '30px' }} className="ml-5">Filters</h2>
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
                <div className="ml-4 flex flex-col gap-10 mt-4">
                    <div>
                        <h3 style={{fontSize: 23, fontWeight: 'bold'}} className="mb-2">Filter by Fame Rating:</h3>
                        <div className="flex flex-col gap-4 ml-4">
                            <FameRatingFilter minFameRatingProp={minFameRating} maxFameRatingProp={maxFameRating} handleFilterApply={handleFameRatingFilterApply}/>
                        </div>
                    </div>
                    <div>
                        <h3 style={{fontSize: 23, fontWeight: 'bold'}} className="mb-4">Filter by Interests:</h3>
                        <InterestsInput initialySelectedInterests={selectedInterests} handleInterestsSave={handleinterestsFilterApply}/>
                    </div>
                    <div>
                        <h3 style={{fontSize: 23, fontWeight: 'bold'}} className="mb-4">Filter by Age:</h3>
                        <AgeGapFilter initialMinAge={minAge} initialMaxAge={maxAge} handleAgeGapFilterApply={handleAgeGapFilterApply}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterOverlay;