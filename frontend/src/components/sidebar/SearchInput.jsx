import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();
  const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;
		

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	};

  return (
    <form className='items-center gap-2'  onSubmit={handleSubmit} >
      <input type='text' placeholder='Search' className='input input-bordered rounded-full bg-slate-700 text-slate-300' value={search}
				onChange={(e) => setSearch(e.target.value)}/>
      <button type='submit' className='btn btn-circle bg-sky-500 hover:bg-sky-700 text-white'>
      <FaSearch className='text-white '/>

      </button>
    </form>
  )
}

export default SearchInput;