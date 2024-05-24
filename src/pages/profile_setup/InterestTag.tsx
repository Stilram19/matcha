import Tag from "../../components/Tag";

const tags = [
    "anime",
    "movies",
    "gaming",
    "music",
    "cats",
    "singing",
    "travel",
    "science",
    "history",
    "learning",
    "fantasy",
    "pop",
    "animals",
    "culture",
    "baking",
    "comedy",
    "drawing",
    "languages",
    "concerts",
    "art",
    "philosophy",
    "meditation",
    "books",
    "dance",
    "writing",
    "mystery"
]

const InterestTag = () => {

    return (
        <div className="w-full">
            <h1 className="text-xl my-9">2/3</h1>
            <h1 className=" text-4xl mb-3">Interests</h1>
            <p className="mb-4">
                Add at least 5 interests to your profile. You'll be able to discuss, engage, and meet like-minded souls in these communities.
            </p>
        

            {tags.map((tag, index) => {
                return (
                <div className="ml-4 mb-2 inline-block">
                    <Tag key={index} tag={tag} />
                </div>
                )
            })}

            <div className="flex justify-end">
                <button className="mt-6 px-6 py-2 bg-pastel-pink-100 rounded-lg font-semibold tracking-wide text-white hover:text-black  focus:ring">
                    Continue
                </button>
            </div>
        </div>
    )

}


export default InterestTag;