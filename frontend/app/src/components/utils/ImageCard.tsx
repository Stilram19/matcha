import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

type ImageCardProps = {
    imageSrc: string;
    onRemove: () => void;
}

const ImageCard = ({imageSrc, onRemove}: ImageCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (                 
        <div className="flex w-full sm:w-2/3 md:w-1/3 lg:w-1/3 xl:w-1/5 p-2">
            <div className="relative h-full rounded-2xl flex justify-center items-center bg-deep-plum p-1">

                <img
                    alt="Picture"
                    src={imageSrc}
                    className={`rounded-2xl bg-cover h-full w-full object-cover transition-blur ${isHovered ? 'filter blur-sm' : ''}`}
                />

                <IoCloseCircleOutline
                    size={30}
                    className="absolute -top-3 -right-7 text-deep-plum hover:text-red-700 hover:scale-110 transition duration-200 cursor-pointer"
                    onClick={onRemove}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                />

            </div>
        </div>
    )
}

export default ImageCard;