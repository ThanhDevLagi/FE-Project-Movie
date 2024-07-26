import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const LinkLoginAccount = () => {
    const socialIcons = [
        { icon: faFacebook, color: "text-blue-600" },
        { icon: faGoogle, color: "text-red-600" },
        { icon: faTwitter, color: "text-blue-400" },
    ];

    return (
        <div className="flex justify-center mt-6 gap-4">
            {socialIcons.map((social, index) => (
                <div
                    key={index}
                    className="p-3 bg-white border border-teal-500 rounded-full flex items-center justify-center shadow hover:scale-125 transition-all cursor-pointer"
                >
                    <FontAwesomeIcon icon={social.icon} className={`${social.color} text-2xl`} />
                </div>
            ))}
        </div>
    );
};

export default LinkLoginAccount;