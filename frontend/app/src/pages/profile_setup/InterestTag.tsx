import { useState } from "react";
import Tag from "../../components/Tag";


const tags = [
    "anime", "movies", "gaming", "music", "cats", "singing", "travel",
    "science", "history", "learning", "fantasy", "pop", "animals", "culture",
    "baking", "comedy", "drawing", "languages", "concerts", "art", "philosophy",
    "meditation", "books", "dance", "writing", "mystery"
];



const InterestTag = () => {
    const   [selectedTags, setSelectedTags] = useState<Set<string>>(new Set())

    const handleOnClick = (tag: string) => {
        setSelectedTags((prev) => {
            const newSelectedTags = new Set(prev);
            if (newSelectedTags.has(tag))
                newSelectedTags.delete(tag);
            else
                newSelectedTags.add(tag);
            return newSelectedTags;
        })
    }

    const   handleContinue = () => {
        console.log(selectedTags);

        // send tags to the server...
    }


    return (
        <div className="w-full">
            <h1 className="text-xl my-9">2/3</h1>
            <h1 className=" text-4xl mb-3">Interests</h1>
            <p className="mb-4">
                Add at least 5 interests to your profile. You'll be able to discuss, engage, and meet like-minded souls in these communities.
            </p>
        

            {tags.map((tag, index) => {
                return (
                <div key={index} className="ml-4 mb-2 inline-block" onClick={() => handleOnClick(tag)}>
                    <Tag tag={tag} bgColor={selectedTags.has(tag) ? 'bg-green-light' : 'bg-white'}/>
                </div>
                )
            })}

            <div className="flex justify-end">
                <button
                    disabled={selectedTags.size < 5}
                    className={`mt-6 mb-4 px-6 py-2 bg-pastel-pink-100 ${selectedTags.size < 5 ? 'bg-opacity-75' : ''} rounded-lg font-semibold tracking-wide text-white hover:text-black  focus:ring`}
                    onClick={handleContinue}>

                    Continue
                </button>
            </div>
        </div>
    )

}


export default InterestTag;