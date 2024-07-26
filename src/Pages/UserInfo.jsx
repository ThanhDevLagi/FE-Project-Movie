import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserLock } from '@fortawesome/free-solid-svg-icons';
import UserProfile from '../components/UserProfile/UserProfile';
import { useAuth } from '../hooks/AuthContext';

const userLink = [
    {
        path: '/thong-tin-ca-nhan',
        label: 'Thông tin cá nhân',
        icon: faUser,
    },
    {
        path: '/bao-mat-thong-tin',
        label: 'Mật khẩu và bảo mật',
        icon: faUserLock,
    },
]


const SidebarMenu = () => {
  const location = useLocation();
  const {user} = useAuth()

  useEffect(() => {
    window.scrollTo(0,0)
  },[])
  return (
    <div className="flex flex-col md:flex-row gap-3 mt-9 p-4 md:p-8">
      <ul className="flex flex-col gap-2 w-full md:w-[22rem] bg-[#EDF2F6] rounded-xl p-4 md:sticky top-0">
      {userLink.length > 0 && userLink.map((item, key)=> (
        <li className="transition-all rounded-xl cursor-pointer">
          <Link 
            to="/user/info"
            className={`flex gap-4 items-center text-gray-500 text-base font-medium hover:bg-green-theme hover:text-white rounded-xl p-4 transition-all ${location.pathname === `${item.path}` ? 'bg-green-theme text-white' : ''}`}
          >
            <FontAwesomeIcon icon={item.icon}/>{item.label}
          </Link>
        </li>
      ))
      }
      </ul>
      <div className="w-full">
            <UserProfile currentUser={user} imageUrl={user.img}></UserProfile>
      </div>
    </div>
  );
};

export default SidebarMenu;
