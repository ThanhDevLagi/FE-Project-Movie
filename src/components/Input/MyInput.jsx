import { useField } from 'formik';
import React from 'react';

const MyInput = ({ label, ...props }) => {
    const [field, meta ] = useField(props)
    return (
        <div>
            <label htmlFor={props.id || props.name} className='block text-sm font-medium text-gray-700'>{label}:</label>
            <input
                type={props.type || 'text'}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-600 focus:border-teal-600 sm:text-sm transition-transform transform focus:scale-105'
                {...field}
                {...props}
            />
            {meta.touched && meta.error ? (
            <div className='text-sm text-red-500'>
                {meta.error}
            </div>
            ) : null}
             
        </div>
    );
};

export default MyInput;