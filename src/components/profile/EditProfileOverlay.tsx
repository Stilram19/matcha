import './style.css'
import FormField from '../utils/FormField';
import { ProfileInfos } from '../utils/dummyProfileInfos';
import React from 'react';

type EditProfileOverlayProps = {
    profileInfos: ProfileInfos;
    handleEditOverlayClose: () => void;
};

let buttonStyle = {
    width: 126, height: 47, borderRadius: 6
};

function EditProfileOverlay({profileInfos, handleEditOverlayClose}: EditProfileOverlayProps) {
    function handleClose() {
        handleEditOverlayClose();
    }

    function handleSubmit() {
        // handle submit

        handleEditOverlayClose();
    }

    function handleBackgroundClick(e: React.MouseEvent<HTMLDivElement>) {
        const classes = (e.target as HTMLElement).classList;
        if (classes.contains('bg-black') && classes.contains('bg-opacity-40')) {
            handleEditOverlayClose();
        }
    }

    function handleImageChange() {

    }

    function handleImageClick() {
        document.getElementById('profilePicture')?.click();
    }

    return (
        <div onClick={handleBackgroundClick} className="fixed z-10 flex justify-center items-center inset-0 bg-black bg-opacity-40">
            <div className="bg-white overflow-y-auto rounded-18px flex flex-col h-full w-550px overlay-slide" style={{maxHeight: 813}}>
                <div className="flex justify-between items-center w-full mt-4">
                    <h2 style={{ fontSize: '30px' }} className="ml-5">Edit profile</h2>
                    <img
                        src="/icons/overlay-cross-icon.svg"
                        alt="cross icon"
                        className="cursor-pointer mr-5"
                        width={44}
                        height={44}
                        onClick={handleClose}
                    />
                </div>
                <div className="mt-3">
                    <img src="/icons/overlay-divider.svg" className="w-full" alt="overlay divider"/>
                </div>
                <div className="flex flex-col sm:flex-row">
                    <div className="flex justify-center mt-16">
                        <input type="file" id="profilePicture" className="hidden" accept="image/*" onChange={handleImageChange}/>
                        <div>
                            <div onClick={handleImageClick} className="cursor-pointer sm:ml-8 mr-4 sm:mr-8 w-52 h-52 bg-cover bg-no-repeat bg-center rounded-full bg-gray-300"
                                style={{backgroundImage: `url(${profileInfos.profilePicture})`}}>
                            </div>
                            <div onClick={handleImageClick} className="relative">
                                <div className="camera-icon-overlay cursor-pointer bg-gray-300 flex w-9 h-9 rounded-full justify-center items-center">
                                    <i className="icon sm:scale-125 lg:scale-100" style={{backgroundImage: 'url("/icons/facebook-camera-icon.png")', backgroundPosition: '0px -21px', width: '20px', height: '20px', backgroundRepeat: 'no-repeat', display: 'inline-block'}}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center mt-10 gap-2">
                        <FormField id="fname" label="first name" placeholder={profileInfos.firstName} />
                        <FormField id="lname" label="last name" placeholder={profileInfos.lastName} />
                        <FormField id="username" label="username" placeholder={profileInfos.userName} />
                    </div>
                </div>
                <div className="flex justify-center mt-10 gap-2 sm:gap-8">
                    <div className="flex flex-col h-full">
                        <label htmlFor="gender">Gender</label>
                        <select id="gender" name="gender" className="text-gray-600  w-full outline-none border bg-white rounded-lg p-2 pl-3 pr-8" required>
                            <option value="" disabled>Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            {/* Uncomment if needed
                            <option value="trans-man">Trans Man</option>
                            <option value="trans-woman">Trans Woman</option>
                            <option value="non-binary">Non-Binary</option> */}
                        </select>
                    </div>
                    <div className="flex flex-col h-full">
                        <label htmlFor="sexual-preference">Sexual preferences</label>
                        <select id="sexual-preference" name="sexual-preference" className="text-gray-600  w-full outline-none border bg-white rounded-lg p-2 pl-3 pr-8" required>
                            <option value="" disabled>Sexual preferences</option>
                            <option value="male">Heterosexual</option>
                            <option value="female">Bisexual</option>
                            <option value="female">Lesbian</option>
                            <option value="female">Homosexual</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col gap-1 mx-10 mt-10">
                    <label htmlFor="biography">biography</label>
                    <textarea id="biography" name="biography" className="border outline-none p-2 rounded-lg focus:ring-2 h-48 resize-none" placeholder={profileInfos.biography} required/>
                </div>
                <div className="flex justify-end h-full mb-8">
                    <div className="flex justify-end gap-3 mt-10 mr-10">
                        <button onClick={handleSubmit} className="bg-cancel-gray" style={buttonStyle}>cancel</button>
                        <button onClick={handleClose} className="text-white bg-button-pink hover:scale-105 focus:ring font-bold" style={buttonStyle}>submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfileOverlay;
