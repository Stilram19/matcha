import './style.css';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { ProfileInfos } from '../../types/profile';
import { sendFormDataRequest } from '../../utils/httpRequests';
import { getFormError } from '../../utils/errorHandling';

type EditProfileOverlayProps = {
    profileInfos: ProfileInfos;
    handleEditOverlayClose: (newProfileInfos: ProfileInfos | null) => void;
};

const buttonStyle = {
    width: 126,
    height: 47,
    borderRadius: 6
};

const validationSchema = Yup.object({
    firstname: Yup.string()
        .min(2, 'firstname must be at least 2 characters')
        .max(20, 'firstname must be at most 20 characters')
        .matches(/^[a-zA-Z]+$/, 'only alphabets are allowed'),
    lastname: Yup.string()
        .min(2, 'lastname must be at least 2 characters')
        .max(20, 'lastname must be at most 20 characters')
        .matches(/^[a-zA-Z]+$/, 'only alphabets are allowed'),
    username: Yup.string()
        .min(4, 'Username must be at least 4 characters')
        .max(12, 'Username must be at most 12 characters')
        .matches(/^(?!_)/, 'Username cannot start with an underscore')
        .matches(/^(?!.*__)/, 'Username cannot contain consecutive underscores')
        .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
        .matches(/(?<!_)$/, 'Username cannot end with an underscore'),
    biography: Yup.string()
        .max(150, 'Biography must be no more than 150 characters'),
    gender: Yup.string(),
    SexualPreferences: Yup.string(),
});

type FormValues = {
    firstname: string;
    lastname: string;
    username: string;
    biography: string;
    gender: string;
    sexualPreference: string;
}

function EditProfileOverlay({ profileInfos, handleEditOverlayClose }: EditProfileOverlayProps) {
    let [image, setImage] = useState<File>();

    function handleBackgroundClick(e: React.MouseEvent<HTMLDivElement>) {
        const classes = (e.target as HTMLElement).classList;
        if (classes.contains('bg-black') && classes.contains('bg-opacity-40')) {
            handleEditOverlayClose(null);
        }
    }

    function triggerFileInput() {
        document.getElementById('profilePicture')?.click();
    };

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const uploadedPic = event.target.files && event.target.files[0];

        if (!uploadedPic) return;
        setImage(uploadedPic);
    }

    const handleSubmit = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
        const { setSubmitting, setErrors } = formikHelpers;

        const formData = new FormData();
        formData.append('firstname', values.firstname);
        formData.append('lastname', values.lastname);
        formData.append('username', values.username);
        formData.append('biography', values.biography);
        formData.append('gender', values.gender);
        formData.append('sexualPreference', values.sexualPreference);
        if (image) {
            formData.append('profilePicture', image);
        }
        console.log(...formData);

        try {
            let responseBody = await sendFormDataRequest('POST', import.meta.env.VITE_LOCAL_UPDATE_PERSONAL_INFOS_API_URL as string, formData);

            let newProfileInfos = {...profileInfos };

            newProfileInfos.userInfos.firstName = values.firstname;
            newProfileInfos.userInfos.lastName = values.lastname;
            newProfileInfos.userInfos.userName = values.username;
            newProfileInfos.userInfos.biography = values.biography;
            newProfileInfos.userInfos.gender = values.gender;
            newProfileInfos.userInfos.sexualPreferences = values.sexualPreference;

            if (responseBody.imageUrl) {
                newProfileInfos.userInfos.profilePicture = responseBody.imageUrl;
            }

            handleEditOverlayClose(newProfileInfos);
        } catch (error) {
            let formError = getFormError(error);

            if (formError === undefined) {
                console.log('Unexpected error structure: ' + error);
                return ;
            }

            const message = formError.message as string;
            const field = formError.field as string;

            if (field === 'username') {
                setErrors({ username: message });
                return ;
            }

            if (field === 'sexualPreference') {
                setErrors({ sexualPreference: message});
                return ;
            }

            console.error('Unhandled field: ', field);

        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div onClick={handleBackgroundClick} className="fixed z-10 flex justify-center items-center inset-0 bg-black bg-opacity-40">
            <div className="bg-white overflow-y-auto scrollbar rounded-18px flex flex-col h-full w-550px overlay-slide" style={{ maxHeight: 813 }}>
                <div className="flex justify-between items-center w-full mt-4 mb-4">
                    <h2 style={{ fontSize: '30px' }} className="ml-5">Edit profile</h2>
                    <img
                        src="/icons/overlay-cross-icon.svg"
                        alt="cross icon"
                        className="cursor-pointer mr-5"
                        width={44}
                        height={44}
                        onClick={() => handleEditOverlayClose(null)}
                    />
                </div>
                <hr className="divider"></hr>
                <Formik
                    initialValues={{
                        firstname: profileInfos.userInfos.firstName,
                        lastname: profileInfos.userInfos.lastName,
                        username: profileInfos.userInfos.userName,
                        gender: profileInfos.userInfos.gender,
                        sexualPreference: profileInfos.userInfos.sexualPreferences,
                        biography: profileInfos.userInfos.biography
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="flex flex-col sm:flex-row">
                                <div className="flex justify-center mt-16">
                                    <input type="file" id="profilePicture" onChange={handleInputChange} className="hidden" accept="image/*" />
                                    <div onClick={triggerFileInput}>
                                        <div className="cursor-pointer sm:ml-8 mr-4 sm:mr-8 w-52 h-52 bg-cover bg-no-repeat bg-center rounded-full bg-gray-300"
                                            style={{ backgroundImage: `url(${image ? URL.createObjectURL(image) : profileInfos.userInfos.profilePicture})` }}>
                                        </div>
                                        <div className="relative">
                                            <div className="camera-icon-overlay cursor-pointer bg-gray-300 flex w-9 h-9 rounded-full justify-center items-center">
                                                <i className="icon sm:scale-125 lg:scale-100" style={{ backgroundImage: 'url("/icons/facebook-camera-icon.png")', backgroundPosition: '0px -21px', width: '20px', height: '20px', backgroundRepeat: 'no-repeat', display: 'inline-block' }}></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center mt-10 gap-2">
                                    <div>
                                        <label htmlFor="firstname">First Name</label>
                                        <Field id="firstname" name="firstname" className="border p-2 rounded" placeholder="First Name" />
                                        <ErrorMessage name="firstname" component="div" className="text-red-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="lastname">Last Name</label>
                                        <Field id="lastname" name="lastname" className="border p-2 rounded" placeholder="Last Name" />
                                        <ErrorMessage name="lastname" component="div" className="text-red-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="username">Username</label>
                                        <Field id="username" name="username" className="border p-2 rounded" placeholder="Username" />
                                        <ErrorMessage name="username" component="div" className="text-red-500" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center mt-10 gap-2 sm:gap-8">
                                <div className="flex flex-col h-full">
                                    <label htmlFor="gender">Gender</label>
                                    <Field as="select" id="gender" name="gender" className="text-gray-600 w-full outline-none border bg-white rounded-lg p-2 pl-3 pr-8" required>
                                        <option value="" disabled>Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="transgender">Transgender</option>
                                    </Field>
                                    <ErrorMessage name="gender" component="div" className="text-red-500" />
                                </div>
                                <div className="flex flex-col h-full">
                                    <label htmlFor="sexualPreference">Sexual Preferences</label>
                                    <Field as="select" id="sexualPreference" name="sexualPreference" className="text-gray-600 w-full outline-none border bg-white rounded-lg p-2 pl-3 pr-8" required>
                                        <option value="" disabled>Sexual preferences</option>
                                        <option value="heterosexual">Heterosexual</option>
                                        <option value="bisexual-male">Bisexual-male</option>
                                        <option value="bisexual-female">Bisexual-female</option>
                                        <option value="lesbian">Lesbian</option>
                                        <option value="homosexual">Homosexual</option>
                                    </Field>
                                    <ErrorMessage name="sexualPreference" component="div" className="text-red-500" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 mx-10 mt-10">
                                <label htmlFor="biography">Biography</label>
                                <Field as="textarea" id="biography" name="biography" className="border outline-none p-2 rounded-lg focus:ring-2 h-48 resize-none" placeholder="Biography" />
                                <ErrorMessage name="biography" component="div" className="text-red-500" />
                            </div>
                            <div className="flex justify-end mb-8">
                                <div className="flex justify-end gap-3 mt-10 mr-10">
                                    <button type="button" onClick={() => handleEditOverlayClose(null)} className="bg-cancel-gray" style={buttonStyle}>Cancel</button>
                                    <button type="submit" disabled={isSubmitting} className="text-white bg-button-pink hover:scale-105 focus:ring font-bold" style={buttonStyle}>Submit</button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default EditProfileOverlay;
