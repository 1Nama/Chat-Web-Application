import { useState, useRef, useEffect } from "react";
import { BsSend, BsEmojiSmile } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { funEmojis } from "../../utils/emojis";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const emojiPickerRef = useRef(null);
	const { loading, sendMessage } = useSendMessage();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
				setShowEmojiPicker(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleEmojiClick = (emoji) => {
		setMessage(prev => prev + emoji);
		setShowEmojiPicker(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
	};
	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
			<div className="relative flex items-center">
				<button
					type="button"
					onClick={() => setShowEmojiPicker(!showEmojiPicker)}
					className="p-2 text-gray-400 hover:text-white focus:outline-none"
				>
					<BsEmojiSmile className="w-5 h-5" />
				</button>
				{showEmojiPicker && (
					<div 
						ref={emojiPickerRef}
						className="absolute bottom-10 left-0 w-64 h-64 overflow-y-auto bg-gray-800 border border-gray-600 rounded-lg shadow-lg p-2 z-10 grid grid-cols-8 gap-1"
					>
					{funEmojis.map((emoji, index) => (
						<button
							key={index}
							type="button"
							onClick={() => handleEmojiClick(emoji)}
							className="text-2xl hover:bg-gray-700 rounded p-1"
						>
							{emoji}
						</button>
					))}
				</div>
			)}
			<input
				type='text'
				className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white ml-1'
				placeholder='Send a message'
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>
		</div>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
				{loading ? <div className='loading loading-spinner'></div> :<BsSend className="text-slate-400 hover:text-white"/>}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;

