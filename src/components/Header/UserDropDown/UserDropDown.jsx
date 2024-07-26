import { faGear, faHeart, faQuestion, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';

const linkRef = [
    {
        path: '/thong-tin-ca-nhan',
        name:'Thông tin cá nhân',
        icon: faUser
    },
    {
        path: '/danh-sach-yeu-thich',
        name: 'Danh sách yêu thích',
        icon: faHeart
    },
    {
        path: '/',
        name: 'Trợ giúp & hỗ trợ',
        icon: faQuestion
    },

]

function useClickOutSide(dom = "button"){
    const [show, setShow] = useState(false);
    const nodeRef = useRef(null);
    useEffect(()=>{
        function HandleClickOut(e){
            if(nodeRef.current && !nodeRef.current.contains(e.target) && !e.target.matches(dom)) {
                setShow(false);
            }
        }
        document.addEventListener('click', HandleClickOut); 
        return () => {
            document.removeEventListener('click', HandleClickOut);
        }
    },[dom])
    return {
        show,
        setShow,
        nodeRef,
    }
}


const UserDropdown = ({user, logout}) => {
    const { show, setShow, nodeRef } = useClickOutSide("button");

    return (
        <div className="relative" ref={nodeRef}>
            <button
                onClick={() => setShow(!show)}
                className="transition-all w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-white shadow-md focus:outline-none hover:scale-110"
            >
                <FontAwesomeIcon className="text-lg xl:text-xl text-gray-900" icon={faUser} />
            </button>
            {show && (
                <div className="absolute top-full right-1/3 transform mt-2 w-72 popup-zoom   bg-white rounded-lg shadow-lg border border-gray-200 z-10 ">
                    <div className="p-4">
                        <div className="text-center">
                            <h1 className="text-lg font-semibold text-black">{user.name}</h1>
                            <span className="text-sm text-gray-500">{user.email}</span>
                        </div>
                        <div className="mt-3 flex flex-col justify-center gap-2">
                        {linkRef.map((item, index)=> {
                            return (
                                <Link to={item.path} key={index} className="flex items-center px-4 py-2 text-base text-gray-800 hover:bg-gray-200 transition-colors rounded">
                                    <FontAwesomeIcon className="mr-2 text-lg w-5 h-5" icon={item.icon} /> {item.name}
                                </Link>
                            )
                        } )}
                            <button onClick={logout} className="flex items-center px-4 py-2 text-red-500 hover:bg-gray-200 transition-colors rounded">
                                <FontAwesomeIcon className="mr-2 text-lg" icon={faSignOutAlt} /> Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default UserDropdown;
