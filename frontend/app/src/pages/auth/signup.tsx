// export default SignUp;
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { sendPostRequest } from '../../utils/httpRequests';

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email')
        .required('Email is required'),
    password: Yup.string()
        .min(12, 'Password must be at least 12 characters')
        .max(28, 'Password must be at most 28 characters')
        .matches(/[a-z]/, 'Password must include at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must include at least one uppercase letter')
        .matches(/[0-9]/, 'Password must include at least one digit')
        .matches(/[\W_]/, 'Password must include at least one special character')
        .matches(/^[a-zA-Z\d!@#$%^&*() ]*$/, 'Password can only contain letters, digits, special characters, and spaces')
        .required('Password is required'),
});

const SignUp = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showVerificationMessage, setShowVerificationMessage] = useState(false);

    useEffect(() => {
        const sendDataToServer = async () => {
            if (!formData.email || !formData.password) {
                return;
            }

            try {
                const response = await sendPostRequest(import.meta.env.VITE_LOCAL_SIGNUP_API_URL as string, formData);
                console.log('API response:', response);
                setShowVerificationMessage(true);
            } catch (error) {
                console.error('Error sending POST request:', error);
            }
        };

        sendDataToServer();
    }, [formData]);


    const handleSignupWithEmailSubmit = async (values: { email: string, password: string }, formikHelpers: FormikHelpers<{ email: string, password: string }>) => {
        const { setSubmitting } = formikHelpers;

        setFormData({ email: values.email, password: values.password });
        setSubmitting(false);
    };

    return (
        <div className="flex w-full h-screen">
            <div className="w-full md:w-3/5 flex flex-col items-center justify-center">
                <h1 className="text-5xl poetsen-one-regular">Sign up!</h1>
                <h1 className="mb-4 text-5xl poetsen-one-regular text-center">and find your partner</h1>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={SignupSchema}
                    onSubmit={handleSignupWithEmailSubmit}
                    >
                    {({ isSubmitting }) => (
                        <Form className="flex flex-col justify-start">
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-2">Email</label>
                                <Field
                                id="email"
                                name="email"
                                type="text"
                                className="p-3 bg-light-gray border border-e0 w-96 rounded-lg outline-none focus:ring focus:ring-blue-300 mb-1"
                                placeholder="john@example.com"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="block mb-2">Password</label>
                                <Field
                                id="password"
                                name="password"
                                type="password"
                                className="p-3 bg-light-gray border border-e0 w-96 rounded-lg outline-none focus:ring focus:ring-blue-300 mb-1"
                                placeholder="password"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                            </div>
                            
                            <button type="submit" className="w-full bg-black font-semibold text-white py-2 px-5 rounded-lg mt-4" disabled={isSubmitting}>
                                Sign up with email
                            </button>
                        </Form>
                    )}
                </Formik>

                {showVerificationMessage && (
                    <p className="text-green-600 mt-4">Please verify your email. Check your inbox for further instructions.</p>
                )}

                <div className="flex items-center gap-2 my-3">
                    <hr className="w-24 border-none h-[1px] bg-gray-300" />
                    <p className="text-continue">or continue with</p>
                    <hr className="w-24 border-none h-[1px] bg-gray-300" />
                </div>
                <button className="bg-light-gray flex justify-center gap-2 w-96 py-3 rounded-lg">
                    <img src="/google.svg" alt="Google" />Google
                </button>
                <p className="text-center w-96 mt-3">
                By clicking continue, you agree to our
                <a className="text-blue-900" href="#"> Terms of Service </a>
                and
                <a className="text-blue-900" href="#"> Privacy Policy</a>
                </p>
            </div>
            <div className="hidden md:block w-2/5">
                <img src="/imgs/lovers.jpg" className="w-full h-full object-cover" alt="Lovers" />
            </div>
        </div>
    );
};

export default SignUp;
