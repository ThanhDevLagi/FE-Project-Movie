import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMovieDetail, updateMovie } from '../Redux/moviesSlice';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import MyInput from '../components/Input/MyInput';
import SuccessPopup from '../components/Popup/SuccessPopup';

const MovieDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const movie = useSelector((state) => state.movies.movies.find(movie => movie._id === id));
    const [groups, setGroups] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    useEffect(() => {
        dispatch(getMovieDetail(id));
    }, [dispatch, id]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get('https://be-project-movie.onrender.com/api/groups');
                setGroups(response.data);
            } catch (error) {
                console.error('Failed to fetch groups', error);
            }
        };

        fetchGroups();
    }, []);

    const validationSchema = Yup.object({
        name: Yup.string().required('Tên phim là bắt buộc'),
        slug: Yup.string().required('Slug là bắt buộc'),
        original_name: Yup.string().required('Tên gốc là bắt buộc'),
        thumb_url: Yup.string().url('URL không hợp lệ'),
        poster_url: Yup.string().url('URL không hợp lệ'),
        time: Yup.string(),
        quality: Yup.string(),
        language: Yup.string(),
        description: Yup.string(),
        selectedCategories: Yup.array().min(1, 'Chọn ít nhất một thể loại').required('Thể loại là bắt buộc')
    });

    const handleSubmit = (values, { setSubmitting }) => {
        const formattedCategories = { ...movie.categories }; 
    
        values.selectedCategories.forEach(category => {
            const group = groups.find(group => group.list.some(cat => cat._id === category._id));
            if (group) {
                if (!formattedCategories[group._id]) {
                    formattedCategories[group._id] = {
                        group: {
                            id: group._id,
                            name: group.name
                        },
                        list: []
                    };
                }
                // Thêm hoặc cập nhật thể loại trong nhóm
                const existingCategoryIndex = formattedCategories[group._id].list.findIndex(cat => cat._id === category._id);
                if (existingCategoryIndex === -1) {
                    formattedCategories[group._id].list.push({
                        id: category._id,
                        name: category.name
                    });
                } else {
                    formattedCategories[group._id].list[existingCategoryIndex] = {
                        id: category._id,
                        name: category.name
                    };
                }
            }
        });
    
        const movieData = {
            ...values,
            categories: formattedCategories
        };
    
        dispatch(updateMovie({ id, body: movieData }))
            .then(() => {
                setSubmitting(false);
                setShowSuccessPopup(true);
                setTimeout(() => {
                    setShowSuccessPopup(false);
                    // window.location = '/admin';
                }, 2000);
            })
            .catch(error => {
                console.error('Failed to update movie', error);
                setSubmitting(false);
            });
    };

    const handleGroupChange = (event, setFieldValue, values) => {
        const groupId = event.target.value;
        const selectedGroup = groups.find(group => group._id === groupId);

        if (selectedGroup) {
            setCategories(selectedGroup.list || []);
        } else {
            setCategories([]);
        }
    };

    const handleCategorySelect = (event, setFieldValue, values) => {
        const selectedCategoryId = event.target.value;
        const selectedCategory = categories.find(category => category._id === selectedCategoryId);

        if (selectedCategory) {
            const updatedCategories = [...values.selectedCategories];

            if (!updatedCategories.some(cat => cat._id === selectedCategory._id)) {
                updatedCategories.push(selectedCategory);
                setFieldValue('selectedCategories', updatedCategories);
            }
        }
    };

    const handleCategoryRemove = (categoryToRemove, setFieldValue, values) => {
        setFieldValue('selectedCategories', values.selectedCategories.filter(category => category._id !== categoryToRemove._id));
    };

    const initialValues = {
        name: movie?.name || '',
        slug: movie?.slug || '',
        original_name: movie?.original_name || '',
        thumb_url: movie?.thumb_url || '',
        poster_url: movie?.poster_url || '',
        time: movie?.time || '',
        quality: movie?.quality || '',
        language: movie?.language || '',
        description: movie?.description || '',
        selectedCategories: movie?.categories ? Object.values(movie.categories).flatMap(group => group.list) : [],
    };
    return (
        <>
            {showSuccessPopup && (
                <SuccessPopup message="Cập nhật Bộ Phim thành công"/>
            )}
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Cập nhật Bộ Phim</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ isSubmitting, setFieldValue, values }) => (
                        <Form className="space-y-4 w-full">
                            <div className='flex gap-4'>
                                <div className='w-2/4'>
                                    <MyInput label={"Tên Bộ Phim"} type="text" name="name" id="name" />
                                </div>
                                <div className='w-2/4'>
                                    <MyInput label={"Tên Slug"} type="text" name="slug" id="slug" />
                                </div>
                            </div>
                            <div className='flex gap-4'>
                                <div className='w-2/4'>
                                    <MyInput label={"Tên gốc"} type="text" name="original_name" id="original_name" />
                                </div>
                                <div className='w-2/4'>
                                    <MyInput label={"URL Hình ảnh nhỏ"} type="text" name="thumb_url" id="thumb_url" />
                                </div>
                            </div>
                            <div className='flex gap-4'>
                                <div className='w-2/4'>
                                    <MyInput label={"URL Poster"} type="text" name="poster_url" id="poster_url" />
                                </div>
                                <div className='w-2/4'>
                                    <MyInput label={"Thời gian"} type="text" name="time" id="time" />
                                </div>
                            </div>
                            <div className='flex gap-4'>
                                <div className='w-2/4'>
                                    <MyInput label={"Chất lượng"} type="text" name="quality" id="quality" />
                                </div>
                                <div className='w-2/4'>
                                    <MyInput label={"Ngôn ngữ"} type="text" name="language" id="language" />
                                </div>
                            </div>
                            <div>
                                <label className="block font-bold mb-1" htmlFor="description">Mô tả</label>
                                <Field as="textarea" name="description" className="w-full px-3 py-2 border rounded" />
                            </div>

                            <div>
                                <label className="block font-bold mb-1" htmlFor="groupSelector">Chọn nhóm thể loại</label>
                                <select
                                    name="groupSelector"
                                    onChange={(e) => handleGroupChange(e, setFieldValue, values)}
                                    className="w-full px-3 py-2 border rounded"
                                >
                                    <option value="">Chọn nhóm</option>
                                    {groups.map(group => (
                                        <option key={group._id} value={group._id}>{group.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block font-bold mb-1" htmlFor="categories">Chọn thể loại</label>
                                <select
                                    name="categories"
                                    onChange={(e) => handleCategorySelect(e, setFieldValue, values)}
                                    className="w-full px-3 py-2 border rounded"
                                >
                                    <option value="">Chọn thể loại</option>
                                    {categories.map(category => (
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block font-bold mb-1">Danh sách thể loại đã chọn</label>
                                <div className="flex flex-wrap gap-2">
                                    {values.selectedCategories.map(category => (
                                        <span key={category._id} className="bg-grey-theme text-white px-2 py-1 rounded">
                                            {category.name}
                                            <button
                                                type="button"
                                                onClick={() => handleCategoryRemove(category, setFieldValue, values)}
                                                className="ml-2 text-red-500 font-bold"
                                            >
                                                X
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-green-theme font-medium w-full text-white px-4 py-2 text-lg rounded"
                            >
                                {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default MovieDetail;
