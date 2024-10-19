import { useState } from "react"
import { FaApple, FaEye, FaEyeSlash, FaFacebook, FaGoogle } from "react-icons/fa";
import login from '../assets/login_illustration.jpeg'
import { useAppDispatch } from "../redux/hooks";
import { setID} from "../redux/userSlice";
import supabase from "../supabase/clientSetup";
import { useNavigate } from "react-router";


export function SignUp(){
   let [password_show, changeState] = useState(false)
   let [full_name, setName] = useState('')
   let [email, setMail] = useState('')
   let [pass, setPwd] = useState('')
   let [last_name, setLName] = useState('')
   //let dispatch = useAppDispatch()
   let navigate = useNavigate()

    async function signUp(email:string, pwd:string){
        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: pwd
        })
        console.log(data, error)
        return data
    }

    async function setUpNewUser(email: string, pwd:  string){
        const user_data = await signUp(email, pwd);
        let user_id = user_data.user?.id
        const {data, error} = await supabase.from("users").insert({
            id: user_id,
            user_first_name: full_name,
            user_last_name: last_name,
            email: email
        })
        console.log(data, error)
    }


    return(
        <>
        <div className="grid place-items-center p-2 w-11/12 mx-auto">
                <div className="w-11/12 shadow-md shadow-black rounded-xl p-4">
                <p className="text-3xl font-bold text-emerald-700">CourseBlast</p>
                <p className="text-sm md:text-lg">Sign Up for CourseBlast!</p>
                    
                    <div className="grid h-5/6 md:grid-cols-12">
                        <form className="my-2 grid col-span-8">
                    <label htmlFor="name" className="block font-bold text-lg">First Name</label>
                    <input id="name" type='name' autoFocus value={full_name} onChange={(e)=> setName(e.target.value)} required placeholder="Full Name" className="outline-none p-2 md:w-8/12 rounded-md border-2 border-emerald-700 indent-2 my-2"/>

                    <label htmlFor="lname" className="block font-bold text-lg">Last Name</label>
                    <input type="text" name="lname" id="lname" onChange={(e)=> setLName(e.target.value)}autoFocus required placeholder="Last Name" className="outline-none p-2 md:w-8/12 rounded-md border-2 border-emerald-700 indent-2 my-2"/>

                    <label htmlFor="password" className="block font-bold text-lg">Password</label>
                    <div className="grid grid-cols-12 items-center">
                    <div className="grid col-span-10 md:col-span-8">
                    <input id="password" type={password_show? "text": "password"} required minLength={8} placeholder="Set a Password" onChange={(e)=> setPwd(e.target.value)} value={pass} className="w-11/12 md:w-full p-2 peer rounded-md border-2 border-emerald-700 outline-none indent-2 my-2"/>
                    <p className="peer-invalid:block hidden text-red-500 text-xs md:text-sm">Password cannot be less than 8 characters</p>
                    </div>
                    <div className="col-span-2 px-2">
                        <button onClick={()=> changeState(!password_show)}>
                        {!password_show ? <FaEye size={"2rem"} fill="green"/> : <FaEyeSlash size={"2rem"} fill="green"/> }
                        </button>
                    </div>
                    </div>
                    <label htmlFor="email_add" className="block font-bold text-lg">Email</label>
                    <input id="email_add" type='email' required placeholder="Email Address" className=" peer p-2 md:w-8/12 rounded-md border-2 border-emerald-700 outline-none indent-2 my-2" value={email} onChange={(e)=> setMail(e.target.value)}/>
                    <p className="text-red-500 hidden peer-invalid:block md:text-sm text-xs">
                        Please enter a valid e-mail address
                    </p>

                    <div className="my-2">
                    <input type="checkbox" name="promotional" id="prom" className="p-2 checked:bg-emerald-700"/>
                    <label htmlFor="prom" className="text-xs md:text-lg px-1">Receive promotional emails about course discounts, recommendations and early releases.</label>
                    </div> 

                    <p className="text-center my-2 font-bold">OR</p>
                    <div className="provider_bay grid justify-items-center md:grid-cols-3 gap-2 md:gap-4 p-2">
                    <div className="sign_in_provider shadow-sm shadow-emerald-700 p-2 my-2 rounded-xl border-emerald-700 
                    border-2 w-full hover:bg-emerald-700 hover:text-white">
                        <div className="grid grid-cols-12 items-center">
                            <FaGoogle fill="red" size={"2rem"} className="col-span-2 justify-self-center"/>
                            <p className="col-span-6 text-center text-sm md:text-lg">Sign in with Google</p>
                        </div>
                    </div>
                    <div className="sign_in_provider shadow-sm shadow-emerald-700 p-2 my-2 rounded-xl border-emerald-700 border-2 w-full hover:bg-emerald-700 hover:text-white">
                        <div className="grid grid-cols-12 items-center">
                            <FaApple className="col-span-2 justify-self-center"size={'2rem'}/>
                            <p className="col-span-6 text-center text-sm md:text-lg">Sign in with Apple</p>
                        </div>
                    </div>

                    <div className="sign_in_provider shadow-sm shadow-emerald-700 p-2 my-2 rounded-xl border-emerald-700 border-2 w-full hover:bg-emerald-700 hover:text-white">
                        <div className="grid grid-cols-12 place-items-center">
                            <FaFacebook fill="blue" size={'2rem'} className="col-span-2 justify-self-center"/>
                            <p className="col-span-6 text-center text-sm md:text-lg">Sign in with Facebook</p>
                        </div>
                    </div>
                    </div>
                        <button className="bg-emerald-700 w-10/12 md:w-6/12 my-2 p-2 rounded-3xl text-white justify-self-center self-end" onClick={(e)=> {
                            e.preventDefault();
                            setUpNewUser(email, pass);
                            navigate('/sign-in')

                        }}>
                        Sign Up 
                    </button>
                    </form>
                    <div className="form_illustration md:col-span-4 hidden md:block">
                        <img src={login} alt="<Login Illustration" className="h-full object-cover"/>
                    </div>
                    </div>

                    <p className="text-sm md:text-lg text-center my-4">Already have an account? <a className="underline" href='/sign-in'>Sign in</a> here</p>

                    <p className="text-center w-full text-xs md:text-sm">By signing up for CourseBlast, you hereby agree to our Terms of Use and Privacy Policy</p>

                </div>
        </div>
        </>
    )
}

export function SignIn(){
    let dispatch = useAppDispatch()
    let navigate = useNavigate()
    let [email, setEmail] = useState('')
    let [pwd, setPass] = useState('')


    async function signIn(email:string, pwd:string){
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: pwd, 
        })
        if(data.user){
            console.log(data)
            dispatch(setID(data.user.id));
            navigate('/user')
        }
        else{
            console.log(error)

        }

    }
    return(
        <>
        <div className="grid place-items-center w-11/12 md:w-9/12 mx-auto h-screen">
            <div className="w-11/12 shadow-md shadow-black rounded-2xl p-4">
            <p className="text-3xl text-emerald-700 font-bold">CourseBlast</p>
            <p className="text-sm">Sign in to your account and continue learning!</p>
            <form className="grid">
                <div>
                <label className="text-lg font-bold block">Email Address</label>
                <input id="email_add" type='email' required placeholder="Email Address" className=" peer p-2 md:w-8/12 rounded-md border-2 border-emerald-700 outline-none indent-2 my-2" onChange={(e)=> setEmail(e.target.value)}/>
                </div>

                <div>
                <label className="text-lg font-bold block">Password</label>
                <input id="email_add" type='password' required placeholder="Password" className=" peer p-2 md:w-8/12 rounded-md border-2 border-emerald-700 outline-none indent-2 my-2" onChange={(e)=> setPass(e.target.value)}/>
                </div>

                <div className="provider_bay grid justify-items-center md:grid-cols-3 gap-1 md:gap-4 p-2">
                    <div className="sign_in_provider shadow-sm shadow-emerald-700 p-2 my-2 rounded-xl border-emerald-700 
                    border-2 w-full hover:bg-emerald-700 hover:text-white">
                        <div className="grid grid-cols-12 items-center">
                            <FaGoogle fill="red" size={"1.5rem"} className="col-span-2 justify-self-center"/>
                            <p className="col-span-6 text-center text-sm md:text-lg">Sign in with Google</p>
                        </div>
                    </div>
                    <div className="sign_in_provider shadow-sm shadow-emerald-700 p-2 my-2 rounded-xl border-emerald-700 border-2 w-full hover:bg-emerald-700 hover:text-white">
                        <div className="grid grid-cols-12 items-center">
                            <FaApple className="col-span-2 justify-self-center"size={'1.5rem'}/>
                            <p className="col-span-6 text-center text-sm md:text-lg">Sign in with Apple</p>
                        </div>
                    </div>

                    <div className="sign_in_provider shadow-sm shadow-emerald-700 p-2 my-2 rounded-xl border-emerald-700 border-2 w-full hover:bg-emerald-700 hover:text-white">
                        <div className="grid grid-cols-12 place-items-center">
                            <FaFacebook fill="blue" size={'1.5rem'} className="col-span-2 justify-self-center"/>
                            <p className="col-span-6 text-center text-sm md:text-lg">Sign in with Facebook</p>
                        </div>
                    </div>
                    </div>
                <div className="justify-self-center grid w-10/12 md:w-6/12">
                    <button className="bg-emerald-700 text-white rounded-2xl text-lg md:text-xl p-2 " type="submit" onClick={
                        (e)=>{
                            e.preventDefault();
                            signIn(email, pwd)
                        }
                    }>
                        Sign In
                    </button>
                    </div>

            </form>
            <p className="text-center my-2">
                Don't have an account? <a href="/sign-up" className="underline">Sign up</a> here
            </p>
            </div>
        </div>
        </>
    )
}