import React, { useState } from 'react';
import './style.css';
import ApplyCancelButtons from '../../utils/ApplyCancelButtons';

const MIN_AGE = 18;
const MAX_AGE = 30;

type AgeGapFilterProps = {
    initialMinAge: number;
    initialMaxAge: number;
    handleAgeGapFilterApply: (newMinAge: number, newMaxAge: number) => void;
};

function AgeGapFilter({initialMinAge, initialMaxAge, handleAgeGapFilterApply}: AgeGapFilterProps) {
    const [minAge, setMinAge] = useState(Math.max(initialMinAge, MIN_AGE));
    const [maxAge, setMaxAge] = useState(Math.min(initialMaxAge, MAX_AGE));

    function handleMinAgeChange(e: React.ChangeEvent<HTMLInputElement>) {
        let value = Number(e.target.value);

        if (value < MIN_AGE) {
            value = MIN_AGE;
        }

        if (value > maxAge) {
            value = maxAge;
        }

        setMinAge(value);
    };

    function handleMaxAgeChange(e: React.ChangeEvent<HTMLInputElement>) {
        let value = Number(e.target.value);

        if (value < minAge) {
            value = minAge;
        }

        if (value > MAX_AGE) {
            value = MAX_AGE;
        }

        setMaxAge(value);
    };

    function handleCancel() {
        setMinAge(initialMinAge);
        setMaxAge(initialMaxAge);
    }

    function handleApply() {
        handleAgeGapFilterApply(minAge, maxAge);
    }

    return (
        <div className="flex flex-col gap-10">
            <div className="age-range-selector">
                <div className="slider-container">
                    <input
                        type="range"
                        min={MIN_AGE}
                        max={MAX_AGE}
                        value={minAge}
                        onChange={handleMinAgeChange}
                        className="slider"
                    />
                    <input
                        type="range"
                        min={MIN_AGE}
                        max={MAX_AGE}
                        value={maxAge}
                        onChange={handleMaxAgeChange}
                        className="slider"
                    />
                </div>
                <div className="age-range-values">
                    <span>Min Age: {minAge}</span>
                    <span>Max Age: {maxAge}</span>
                </div>
            </div>
            <div className="mr-4">
                <ApplyCancelButtons width={90} height={40} handleCancel={handleCancel} handleApply={handleApply} />
            </div>
        </div>
    );
};

export default AgeGapFilter;
