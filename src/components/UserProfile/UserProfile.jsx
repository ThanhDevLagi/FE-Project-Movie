import React, { useState } from 'react';
import LabelUser from './LabelUser';




const UserProfile = ({ currentUser, imageUrl, onFileSelected, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (onFileSelected) {
      onFileSelected(event);
    }
  };

  return (
    <div className="flex flex-col gap-7 p-7 rounded-lg bg-[#EDF2F6] w-full">
      <h1 className="text-2xl font-medium">Thông tin cá nhân</h1>
      <div className="flex flex-wrap justify-between gap-4">
        <LabelUser label={"Họ và Tên"} user={currentUser.name}></LabelUser>
        <LabelUser label={"Email:"} user={currentUser.email}></LabelUser>
        <LabelUser label={"Nhóm khách hàng:"} user={currentUser.role === 1 ? 'Member' : 'Admin'}></LabelUser>
      </div>
      <div className="w-full h-[2px] bg-green-theme rounded-xl"></div>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-[140px] h-[140px] rounded-full">
          <img
            src={`/pictures/${imageUrl}`}
            className="w-full h-full object-cover rounded-full"
            alt="Profile"
          />
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
          <button
            onClick={() => document.getElementById('fileInput').click()}
            className="py-2 px-4 border-2 border-[#2293FA] font-medium text-[#2293FA] text-base rounded-lg"
          >
            Cập nhật hình ảnh
          </button>
          <input
            id="fileInput"
            type="file"
            name="picture"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
          <div className="w-[2px] h-full bg-green-theme rounded-xl hidden md:block"></div>
          <div className="flex flex-col gap-2">
            <span className="text-base">Vui lòng chọn ảnh nhỏ hơn 5MB</span>
            <span className="text-base">Chọn hình ảnh phù hợp, không phản cảm</span>
          </div>
        </div>
      </div>
      <button
        onClick={onUpload}
        className="mt-4 py-2 px-4 bg-green-theme text-white font-medium text-base rounded-lg"
      >
        Tải lên
      </button>
    </div>
  );
};

export default UserProfile;
