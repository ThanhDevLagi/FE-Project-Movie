import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import MyInput from '../components/Input/MyInput';
import LinkLoginAccount from '../components/IconsLink/LinkLoginAccount';
import Spinner from '../components/Loading/Spinner';
import { loginUser } from '../Services/UserServices';
import SuccessPopup from '../components/Popup/SuccessPopup';

const Login = () => {
    const [serverError, setServerError] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0);
    },[])
    return (
        <>
            {showSuccessPopup && (
                <SuccessPopup message="Đăng nhập thành công"/>
            )}
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    terms: false
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Email không đúng')
                        .required('Bạn cần nhập tài khoản'),
                    password: Yup.string()
                        .min(8, 'Mật khẩu phải ít nhất 8 ký tự')
                        .required('Bạn cần nhập mật khẩu'),
                    terms: Yup.boolean()
                })}
                onSubmit={async (values, actions) => {
                    try {
                        const response = await loginUser(values.email, values.password);
                        localStorage.setItem('token', response.token);
                        setShowSuccessPopup(true);

                        setTimeout(() => {
                            setShowSuccessPopup(false);
                           window.location = '/'
                        }, 2000); 
                    } catch (error) {
                        setServerError(error.response.data.message);
                    } finally {
                        actions.setSubmitting(false);
                    }
                }}
            >
                {(formik) => (
                    <Form className="min-h-[600px] flex items-center justify-center bg-gradient-to-r from-gray-800 to-black p-6">
                        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transition-transform transform hover:scale-105 duration-500">
                            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Đăng Nhập</h2>
                            {serverError && <div className="text-red-500 text-center mb-4">{serverError}</div>}
                            <div className='space-y-4'>
                                <div>
                                    <MyInput label={"Tài khoản"} type="email" name="email" id="email"/>
                                </div>
                                <div>
                                    <MyInput label={"Mật Khẩu"} type="password" name="password" id="password"/>
                                </div>
                                <div>
                                    <button
                                        type='submit'
                                        className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600 transition-transform transform hover:scale-105 flex justify-center items-center'
                                        disabled={formik.isSubmitting}
                                    >
                                        {formik.isSubmitting ? <Spinner text={'Đang xử lý'} /> : 'Đăng Nhập'}
                                    </button>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Field name="terms" type="checkbox" className="p-4 rounded-md border border-gray-1000" />
                                    <label htmlFor="terms" className='block text-sm font-medium     text-gray-700'>Ghi nhớ mật khẩu ?</label>
                                </div>
                                <div className="mt-6 text-center">
                                    <Link to={"/forgot-password"} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Quên mật khẩu ?</Link>
                                </div>
                                <div className="mt-6 text-center">
                                    <Link to={"/dang-ky"} className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">Bạn không có tài khoản ? Đăng ký tại đây</Link>
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

export default Login;
