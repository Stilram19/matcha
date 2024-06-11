import { ChangeEvent, FormEvent, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import FormField from "../../components/utils/FormField";

type SelectOptions = {
    value: string;
    label: string;
}

type SelectProps = {
    options: SelectOptions[];
}

const Select = ({ options }: SelectProps) => {
    return (
        <select name="gender" className="text-gray-600  w-full outline-none border bg-white rounded-lg p-2 pl-3 pr-8" required>
            <option value="" className="" defaultChecked>Gender</option>
            {/* <option value="male" className="" >Male</option>
            <option value="female" className="">Female</option> */}
            {options.map((option_item) => <option value={option_item.value}>{option_item.label}</option>)}
        </select>
    )
}
  

const PersonalInfo = () => {
    const   [image, setImage] = useState<File>();
    const   navigate = useNavigate();


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const uploaded_pic = event.target.files && event.target.files[0];

        if (!uploaded_pic)
            return ;
        console.log(uploaded_pic);
        setImage(uploaded_pic);
    }

    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.currentTarget);
        const formData = new FormData(e.currentTarget);
    
        console.log(formData);
        formData.forEach((value, key) => console.log(`${key}: ${value}`))


        // Post to the server
        // then navigate if everything is successful
        navigate('/complete-info/2');
    }


    return (
        <div className="w-full">
            <h1 className="text-xl my-9">1/3</h1>
            <h1 className=" text-4xl mb-3">Tell us a little bit about yourself</h1>

            <form onSubmit={handleSubmit}>
                <div className="w-full flex flex-col justify-center gap-3">
                    <div className="flex justify-between">
                        <FormField id="fname" label="first name" placeholder="John" />
                        <FormField id="lname" label="last name" placeholder="Doe" />
                        <FormField id="username" label="username" placeholder="username" />
                    </div>

                    <div className="flex flex-col h-full gap-1">
                        <label htmlFor="">biography</label>
                        <textarea name="biography" className="border outline-none p-2 rounded-lg focus:ring-2 h-48 resize-none" placeholder="bio" required/>
                    </div>

                    <div className="flex">
                        <div className="flex flex-col h-full">
                            <label htmlFor="">Gender</label>
                            <Select options={[{value: 'male', label: "Male"}, {value: 'female', label: "Female"}]} />
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
                            name="profile_picture"
                            id="upload-pic"
                            type="file"
                            className="hidden"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="mt-6 px-6 py-2 bg-pastel-pink-100 rounded-lg font-semibold tracking-wide text-white hover:text-black  focus:ring">
                        Continue
                    </button>
                </div>
            </form>
        </div>
    )
}



export default PersonalInfo;