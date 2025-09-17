import LogoutButton from "./LogoutButton";
import Conversations from "./Conversations";
import SearchInput from "./SearchInput";


const Sidebar = () => {
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
			<SearchInput />
			<div className='divider px-3 text-white'></div>
		      <Conversations/> 
			  <LogoutButton/>
		</div>
	);
};
export default Sidebar;