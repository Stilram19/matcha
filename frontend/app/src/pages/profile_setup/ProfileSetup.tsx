import { ChangeEvent, useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import ImageCard from "../../components/utils/ImageCard";


type ImageCardsProps = {
    images: File[];
    handleRemove: (key: number) => void;
}



// I should pass only the image source for this component, to make things more abstract
const ImageCards = ({images, handleRemove} : ImageCardsProps) => {

    return (
        <>
            <div className="p-3 pt-4 shadow border w-full h-72 rounded-2xl flex gap-7">

                {!images.length ? (
                    <div className="text-center w-full flex justify-center items-center text-2xl">
                        Select pictures
                    </div>
                ) : (
                    images.map((image, index) => (
                        <ImageCard
                            key={index}
                            imageSrc={URL.createObjectURL(image)}
                            onRemove={() => handleRemove(index)}
                        />
                    ))
                )}

            </div>
        </>
    )

}


export default function ProfileSetup() {
    const   [images, setImages] = useState<File[]>([]);


    const handleUploadChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        setImages((prev) => {
            const newArray: File[] = [];
            for (let i = 0; files && i < files.length; i++) {
                newArray.push(files[i]);
            }
            return [...prev, ...newArray];
        });
        // console.log(files);
    }

    const handleRemove = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i != index))
    }

    return (
        <div className="w-full">
                <h1 className="text-xl my-9">3/3</h1>
                <h1 className=" text-4xl mb-1">Upload Some Pictures</h1>
                <p className="mb-4">
                    Upload at least 5 real photos to your profile to make a stronger and more authentic connection with others
                </p>

                <label htmlFor="upload" className="mb-6">
                    <div className="flex justify-around mb-10"> 
                        <div className="p-7 w-1/2 h-72 flex flex-col  items-center justify-center upload-section hover:upload-section rounded-3xl  cursor-pointer" >
                            <MdCloudUpload size={65} fill="#49243E" />
                            <h1 className="text-xl">Browse Files to upload</h1>
                        </div>
                    </div>
                </label>

                <input
                    id="upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleUploadChange}
                />

                <ImageCards images={images} handleRemove={handleRemove} />

                <div className="flex justify-end">
                    <button className="mt-5 px-6 py-2 bg-pastel-pink-100 rounded-lg font-semibold tracking-wide text-white hover:text-black  focus:ring">
                        Confirm
                    </button>
                </div>
        </div>
    );
}