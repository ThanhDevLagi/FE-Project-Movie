import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    const handleNavigation = (url) => {
        window.location.href = url;
    };

    return (
        <div className='bg-grey-theme text-white'>
            <footer className='container mx-auto px-8 py-10 md:py-20 grid grid-cols-1 md:grid-cols-3 gap-10'>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-xl font-semibold'>Các hãng sản phẩm</h1>
                    <span className='text-gray-300'>Web design</span>
                    <span className='text-gray-300'>Development</span>
                    <span className='text-gray-300'>Hosting</span>
                </div>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-xl font-semibold'>Về chúng tôi</h1>
                    <span className='text-gray-300'>+84 337678852</span>
                    <span className='text-gray-300'>Team</span>
                    <span className='text-gray-300'>Careers</span>
                </div>
                <div>
                    <h1 className='text-xl font-semibold text-center md:text-start'>MovieNight</h1>
                    <p className='text-gray-300 text-center md:text-start mt-4'>
                        MovieNight là một trang web dành cho những người yêu điện ảnh, nơi bạn có thể tìm kiếm, khám phá và chia sẻ đánh giá về các bộ phim. Với danh sách phim đa dạng, từ các bộ phim hành động, phiêu lưu, hài hước đến kinh dị và lãng mạn, MovieNight mang đến cho người dùng một kho tàng phim phong phú.
                        Trang web cho phép bạn dễ dàng tìm kiếm và xem thông tin chi tiết về các bộ phim, bao gồm tóm tắt nội dung, dàn diễn viên, và trailer.
                    </p>
                </div>
            </footer>
            <div className='border-t border-gray-600 px-8'>
                <div className='container mx-auto py-6 flex flex-col md:flex-row items-center justify-between'>
                    <div className='flex gap-4'>
                        <button
                            className='w-[50px] h-[50px] flex items-center justify-center bg-green-theme hover:bg-gray-600 rounded-full'
                            onClick={() => handleNavigation('https://www.facebook.com')}
                        >
                            <FontAwesomeIcon icon={faFacebookF} />
                        </button>
                        <button
                            className='w-[50px] h-[50px] flex items-center justify-center bg-green-theme hover:bg-gray-600 rounded-full'
                            onClick={() => handleNavigation('https://www.twitter.com')}
                        >
                            <FontAwesomeIcon icon={faTwitter} />
                        </button>
                        <button
                            className='w-[50px] h-[50px] flex items-center justify-center bg-green-theme hover:bg-gray-600 rounded-full'
                            onClick={() => handleNavigation('https://www.instagram.com')}
                        >
                            <FontAwesomeIcon icon={faInstagram} />
                        </button>
                    </div>
                    <p className='text-gray-300 text-sm mt-4 md:mt-0'>© 2024 MovieNight. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
