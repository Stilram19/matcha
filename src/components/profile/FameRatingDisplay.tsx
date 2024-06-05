import { FaStar } from "react-icons/fa6";

type FameRatingDisplayProps = {
    starsCount: number;
};

function FameRatingDisplay({starsCount}: FameRatingDisplayProps) {
    let stars = [1, 2, 3, 4, 5];

    return (
        <div className="flex">
            {
                stars && stars.length == 5 ? 
                stars.map(
                    (star) => {
                        let color = '#D9D9D9';

                        if (star <= starsCount) {
                            color = '#FFC978';
                        }

                        return (
                            <div>
                                <FaStar style={{width: 24, height: 24, color: `${color}`}} />
                            </div>
                        )
                    }
                )
                : null
            }
        </div>
    )
}

export default FameRatingDisplay;