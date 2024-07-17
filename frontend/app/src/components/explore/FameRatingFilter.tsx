import { useState } from "react";
import ApplyCancelButtons from "../utils/ApplyCancelButtons";
import FameRatingInput from "../utils/FameRatingInput";

type FameRatingFilterProps = {
    minFameRatingProp: number;
    maxFameRatingProp: number;
    handleFilterApply: (minFameRating: number, maxFameRating: number) => void;
};

function FameRatingFilter({maxFameRatingProp, minFameRatingProp, handleFilterApply}: FameRatingFilterProps) {
    let [maxFameRating, setMaxFameRating] = useState(maxFameRatingProp);
    let [minFameRating, setMinFameRating] = useState(minFameRatingProp);

    function handleMaxFameRatingChange(starsCount: number) {
        setMaxFameRating(starsCount);
    }

    function handleMinFameRatingChange(starsCount: number) {
        setMinFameRating(starsCount);
    }

    function handleCancel() {
        setMinFameRating(minFameRatingProp);
        setMaxFameRating(maxFameRatingProp);
    }

    function handleApply() {
        handleFilterApply(minFameRating, maxFameRating);
    }

    return (
        <div>
            <div>
                <h4>Minimum Fame Rating:</h4>
                <FameRatingInput initialStarsCount={minFameRating} maxStarsCount={maxFameRating} minStarsCount={0} size={30} handleChange={handleMinFameRatingChange}/>
            </div>
            <div className="mb-6">
                <h4>Maximum Fame Rating:</h4>
                <FameRatingInput initialStarsCount={maxFameRating} maxStarsCount={5} minStarsCount={minFameRating} size={30} handleChange={handleMaxFameRatingChange}/>
            </div>
            <div className="mr-4">
                <ApplyCancelButtons width={90} height={40} handleCancel={handleCancel} handleApply={handleApply} />
            </div>
        </div>
    )
}

export default FameRatingFilter;