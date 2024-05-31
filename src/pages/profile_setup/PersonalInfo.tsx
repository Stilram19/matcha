import { ChangeEvent, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

type FormFieldProps = {
    id: string;
    label: string;
    placeholder: string;
}

const FormField = ({ id, label, placeholder} : FormFieldProps) => {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type='text'
          placeholder={placeholder}
          className="outline-none border w-full p-2 px-3 rounded-lg focus:ring-2"
        />
      </div>
    );
  };
  

const PersonalInfo = () => {
    const   [image, setImage] = useState<File>();


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const uploaded_pic = event.target.files && event.target.files[0];

        if (!uploaded_pic)
            return ;
        console.log(uploaded_pic);
        setImage(uploaded_pic);
    }


    return (
        <div className="w-full">
            <h1 className="text-xl my-9">1/3</h1>
            <h1 className=" text-4xl mb-3">Tell us a little bit about yourself</h1>

            <div className="w-full flex flex-col justify-center gap-3">
                <div className="flex justify-between">
                    <FormField id="fname" label="first name" placeholder="John" />
                    <FormField id="lname" label="last name" placeholder="Doe" />
                    <FormField id="username" label="username" placeholder="username" />
                </div>

                <div className="flex flex-col h-full gap-1">
                    <label htmlFor="">biography</label>
                    <textarea className="border outline-none p-2 rounded-lg focus:ring-2 h-48" placeholder="bio"/>
                </div>

                <div className="flex">
                    <div className="flex flex-col h-full">
                        <label htmlFor="">Gender</label>
                        <select className="text-gray-600  w-full outline-none border bg-white rounded-lg p-2 pl-3 pr-8">
                            <option value="" className="" selected>Gender</option>
                            <option value="" className="" >Gender1</option>
                            <option value="" className="">Gender2</option>
                            <option value="" className="">Gender3</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-2">
                    <label htmlFor="upload-pic" className="flex items-center gap-2">
                            <div className="bg-gray-200 h-20 w-20 rounded-lg flex justify-center items-center cursor-pointer">
                                {!image ?
                                    <FaUserCircle size={40} className="fill-gray-600" />
                                :   <img src={URL.createObjectURL(image)} alt="pic" className="object-cover h-full w-full rounded-lg" /> }
                            </div>
                                {!image ? "upload profile picture" : image.name}
                    </label>
                    <input
                        id="upload-pic"
                        type="file"
                        className="hidden"
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="flex justify-end">
                <button className="mt-6 px-6 py-2 bg-pastel-pink-100 rounded-lg font-semibold tracking-wide text-white hover:text-black  focus:ring">
                    Continue
                </button>
            </div>
        </div>
    )
}



export default PersonalInfo;