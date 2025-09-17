import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup';

const SignUp = () => {

  const [inputs,setInputs]=useState({
    fullName:'',
    username:'',
    password:'',
    confirmPassword:'',
    gender:''

  });
  const {loading,signup}=useSignup();
  const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};
  const handleSubmit = async (e) => {
		e.preventDefault();
    //console.log(inputs);
		await signup(inputs);
	};
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
    <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
    <h1 className='text-3xl font-semibold text-center text-gray-300'>
       SignUp
       <span className='text-blue-400'> ChitChat</span>
       </h1>
       <form onSubmit={handleSubmit}>
        <div>
        <label className='label p-2'>
                <span className='text-base label-text text-gray-300'>Full name</span>
            </label>
            <input type="text" placeholder="Enter Full Name" class="input input-bordered w-full max-w-xs bg-slate-800 text-white" value={inputs.fullName} onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}/>

        </div>
        <div>
        <label className='label p-2'>
                <span className='text-base label-text text-gray-300'>Username</span>
            </label>
            <input type="text" placeholder="Enter Username" class="input input-bordered w-full max-w-xs bg-slate-800 text-white" value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}/>
        </div>
        <div>
        <label className='label p-2'>
                <span className='text-base label-text text-gray-300'>Password</span>
            </label>
            <input type="password" placeholder="Enter Password" class="input input-bordered w-full max-w-xs bg-slate-800 text-white" value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}/>

        </div>
        <div>
        <label className='label p-2'>
                <span className='text-base label-text text-gray-300'>Confirm Password</span>
            </label>
            <input type="password" placeholder="Enter Confirm Password" class="input input-bordered w-full max-w-xs bg-slate-800 text-white" value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}/>

        </div>
          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>
        <Link to='/login' className='text-sm text-gray-200 hover:underline hover:text-blue-500 mt-2 inline-block'>
         Already have an account?
        </Link>
        <div>
        <button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
              </div>
       </form>
    </div>
      
    </div>
  )
}

export default SignUp
