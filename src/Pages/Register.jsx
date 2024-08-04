import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import MyInput from '../components/Input/MyInput';
import LinkLoginAccount from '../components/IconsLink/LinkLoginAccount';
import SuccessPopup from '../components/Popup/SuccessPopup';
import ErrorPopup from '../components/Popup/ErrorPopup';
import { registerUser } from '../Services/UserServices';
import Spinner from '../components/Loading/Spinner';

const Register = () => {
    const [serverError, setServerError] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const navigate = useNavigate();

    const handlePopupClose = () => {
        setShowSuccessPopup(false);
        setShowErrorPopup(false);
        if (showSuccessPopup) {
            navigate('/dang-nhap');
        }
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    },[])
    return (
        <>
            {showSuccessPopup && (
                    <SuccessPopup message="Đăng ký thành công!" onClose={handlePopupClose}/>
            )}
            {showErrorPopup && (
                    <ErrorPopup message={serverError} onClose={handlePopupClose}/>
            )}
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    confirmPassword: "",
                    name: ""
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Email không đúng')
                        .required('Bạn cần nhập tài khoản'),
                    password: Yup.string()
                        .min(8, 'Mật khẩu phải ít nhất 8 ký tự')
                        .required('Bạn cần nhập mật khẩu'),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Mật khẩu nhập lại không khớp')
                        .required('Bạn cần nhập lại mật khẩu'),
                    name: Yup.string()
                        .required('Bạn cần nhập tên'),
                })}
                onSubmit={async (values, actions) => {
                    try {
                        const response = await registerUser(values.email, values.password, values.name);
                        console.log(response);
                        setShowSuccessPopup(true);

                        setTimeout(() => {
                            setShowSuccessPopup(false);
                            navigate('/dang-nhap');
                        }, 2000); 
                        
                    } catch (error) {
                        setServerError(error.response.data.message);
                        setShowErrorPopup(true);
                    } finally {
                        actions.setSubmitting(false);
                    }
                }}
            >
                {(formik) => (
                    <Form className="min-h-[600px] flex items-center justify-center bg-gradient-to-r from-gray-800 to-black p-6">
                        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transition-transform transform hover:scale-105 duration-500">
                            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Đăng Ký</h2>
                            <div className='space-y-4'>
                                <div>
                                    <MyInput label={"Họ và Tên"} type="text" name="name" id="name"></MyInput>
                                </div>
                                <div>
                                    <MyInput label={"Email"} type="email" name="email" id="email"></MyInput>
                                </div>
                                <div>
                                    <MyInput label={"Mật Khẩu"} type="password" name="password" id="password"></MyInput>
                                </div>
                                <div>
                                    <MyInput label={"Nhập lại Mật Khẩu"} type="password" name="confirmPassword" id="confirmPassword"></MyInput>
                                </div>
                                <div>
                                    <button
                                        type='submit'
                                        className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600 transition-transform transform hover:scale-105 flex justify-center items-center'
                                        disabled={formik.isSubmitting}
                                    >
                                        {formik.isSubmitting ? <Spinner text={'...'} /> : 'Đăng Ký'}
                                    </button>
                                </div>
                                <div className="mt-6 text-center">
                                    <Link to={"/dang-nhap"} className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">Bạn đã có tài khoản? Đăng nhập tại đây</Link>
                                </div>
                                <LinkLoginAccount />
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Register;
