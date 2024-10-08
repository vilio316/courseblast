import { useState } from "react"

import { FaApple, FaEye, FaEyeSlash, FaFacebook, FaGoogle } from "react-icons/fa";

export function SignUp(){
   let [password_show, changeState] = useState(false)
   //let []

    return(
        <>
        <div className="grid place-items-center p-2 w-11/12s mx-auto">
                <div className="w-11/12 shadow-md shadow-black rounded-xl p-4 m-4">
                <p className="text-3xl font-bold text-emerald-700">CourseBlast</p>
                <p className="text-lg">Sign Up for CourseBlast!</p>
                    
                    <div className="grid h-5/6 md:grid-cols-12">
                        <form className="my-2 grid col-span-8">
                    <label htmlFor="name" className="block font-bold text-xl">Full Name</label>
                    <input id="name" type='name' required placeholder="Full Name" className="outline-none p-2 md:w-8/12 rounded-md border-2 border-emerald-700 indent-2 my-2"/>

                    <label htmlFor="password" className="block font-bold text-xl">Password</label>
                    <div className="grid grid-cols-12 items-center">
                    <div className="grid col-span-10 md:col-span-8">
                    <input id="password" type={password_show? "text": "password"} required minLength={8} placeholder="Set a Password" className="w-11/12 md:w-full p-2 peer rounded-md border-2 border-emerald-700 outline-none indent-2 my-2"/>
                    <p className="peer-invalid:block hidden text-red-500 text-xs md:text-sm">Password cannot be less than 8 characters</p>
                    </div>
                    <div className="col-span-2 px-2">
                        <button onClick={()=> changeState(!password_show)}>
                        {!password_show ? <FaEye size={"2rem"} fill="green"/> : <FaEyeSlash size={"2rem"} fill="green"/> }
                        </button>
                    </div>
                    </div>
                    <label htmlFor="email_add" className="block font-bold text-xl">Email</label>
                    <input id="email_add" type='email' required placeholder="Email Address" className=" peer p-2 md:w-8/12 rounded-md border-2 border-emerald-700 outline-none indent-2 my-2"/>
                    <p className="text-red-500 hidden peer-invalid:block md:text-sm text-xs">
                        Please enter a valid e-mail address
                    </p>

                    <div className="my-2">
                    <input type="checkbox" name="promotional" id="prom" className="p-2 checked:bg-emerald-700"/>
                    <label htmlFor="prom" className="text-xs md:text-lg px-1">Receive promotional emails about course discounts, recommendations and early releases.</label>
                    </div> 

                    <p className="text-center my-2 font-bold">OR</p>
                    <div className="provider_bay grid justify-items-center">
                    <div className="sign_in_provider shadow-sm shadow-emerald-700 p-2 my-2 rounded-xl border-emerald-700 
                    border-2 md:w-10/12 hover:bg-emerald-700 hover:text-white">
                        <div className="grid grid-cols-12 items-center">
                            <FaGoogle fill="red" size={"2rem"} className="col-span-2 justify-self-center"/>
                            <p className="col-span-6 text-center text-sm md:text-lg">Sign in with Google</p>
                        </div>
                    </div>
                    <div className="sign_in_provider shadow-sm shadow-emerald-700 p-2 my-2 rounded-xl border-emerald-700 border-2 md:w-10/12 hover:bg-emerald-700 hover:text-white">
                        <div className="grid grid-cols-12 items-center">
                            <FaApple className="col-span-2 justify-self-center"size={'2rem'}/>
                            <p className="col-span-6 text-center text-sm md:text-lg">Sign in with Apple</p>
                        </div>
                    </div>

                    <div className="sign_in_provider shadow-sm shadow-emerald-700 p-2 my-2 rounded-xl border-emerald-700 border-2 md:w-10/12 hover:bg-emerald-700 hover:text-white">
                        <div className="grid grid-cols-12 place-items-center">
                            <FaFacebook fill="blue" size={'2rem'} className="col-span-2 justify-self-center"/>
                            <p className="col-span-6 text-center text-sm md:text-lg">Sign in with Facebook</p>
                        </div>
                    </div>
                    </div>
                        <button className="bg-emerald-700 w-10/12 md:w-6/12 my-2 p-2 rounded-3xl text-white justify-self-center self-end">
                        Sign Up 
                    </button>
                    </form>
                    <div className="form_illustration">

                    </div>
                    </div>

                    <p className="text-center w-full text-xs md:text-sm">By signing up for CourseBlast, you hereby agree to our Terms of Use and Privacy Policy</p>

                </div>
        </div>
        </>
    )
}