import React, { useState } from 'react';
import { useAuth } from '../../hooks/AuthContext';

const Comment = ({ comment, onReplySubmit }) => {
    const [reply, setReply] = useState('');
    const [showReplies, setShowReplies] = useState(false);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const { user } = useAuth();

    const toggleReplies = () => setShowReplies(prev => !prev);
    const toggleReplyInput = () => setShowReplyInput(prev => !prev);

    return (
        <div className='bg-[#2f2f2f] p-4 mb-4 rounded-lg'>
            <div className='flex items-start gap-3 mb-3'>
                <img 
                    src={`/pictures/${comment.userImg || 'ImageNotFound.png'}`} 
                    alt="User Avatar" 
                    className='w-10 h-10 rounded-full object-cover'
                />
                <div>
                    <div className='flex items-center mb-1'>
                        <strong className='text-white text-sm md:text-base'>{comment.userName}</strong>
                        <span className='text-gray-400 text-xs md:text-sm ml-2'>
                            {new Date(comment.createdAt).toLocaleString()}
                        </span>
                    </div>
                    <p className='text-white text-sm md:text-base mb-2'>{comment.content}</p>
                    <div className='flex gap-2'>
                        <button
                            className='text-blue-400 text-xs md:text-sm'
                            onClick={toggleReplies}
                        >
                            {showReplies ? 'Ẩn phản hồi' : `Xem ${comment.replies.length} phản hồi`}
                        </button>
                        {user && (
                            <button
                                className='text-blue-400 text-xs md:text-sm'
                                onClick={toggleReplyInput}
                            >
                                {showReplyInput ? 'Hủy phản hồi' : 'Phản hồi'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {showReplyInput && (
                <div className='flex flex-col gap-4 mb-4'>
                    <input
                        type="text"
                        className='p-2 rounded-lg bg-[#3f3f3f] text-white text-sm md:text-base'
                        placeholder='Viết phản hồi...'
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                    />
                    <button
                        className='bg-blue-500 text-white px-4 py-2 rounded-md text-sm md:text-base'
                        onClick={() => {
                            onReplySubmit(reply, comment._id);
                            setReply('');
                            setShowReplyInput(false);
                        }}
                    >
                        Gửi
                    </button>
                </div>
            )}
            {showReplies && comment.replies.length > 0 && (
                <div className='ml-4 md:ml-6'>
                    {comment.replies.map((reply) => (
                        <div key={reply._id} className='flex flex-col gap-2 mb-3'>
                            <div className='flex items-start gap-3 mb-1'>
                                <img 
                                    src={`/pictures/${reply.userImg || 'ImageNotFound.png'}`} 
                                    alt="User Avatar" 
                                    className='w-8 h-8 rounded-full object-cover'
                                />
                                <div>
                                    <div className='flex items-center'>
                                        <strong className='text-white text-xs md:text-sm'>{reply.userName}</strong>
                                        <span className='text-gray-400 text-xs md:text-sm ml-2'>
                                            {new Date(reply.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                    <p className='text-white text-xs md:text-sm'>{reply.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comment;
