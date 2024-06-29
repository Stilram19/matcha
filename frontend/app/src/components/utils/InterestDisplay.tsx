import interests from "../../utils/interests";

type interestsDisplayProps = {
    userInterests: Set<string>;
};

function interestsDisplay({userInterests}: interestsDisplayProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 pl-2 lg:pl-7 pr-2 grid-cols-3 grid-rows-7 gap-y-5 gap-x-2 pb-5">
                {
                    interests.map(
                        (interest, index) => {
                            return (
                                <div id={`Interest-${index + 1}`} className={`flex justify-center tag cursor-pointer max-w-32 fit-box ${userInterests.has(interest) ? 'bg-button-pink' : ''}`}>
                                    <h3>#{interest}</h3>
                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}

// className="grid grid-cols-3 sm:grid-cols-5 pl-2 lg:pl-7 pr-1 lg:grid-cols-3 grid-rows-7 gap-y-5 gap-x-2 pb-5">

export default interestsDisplay;