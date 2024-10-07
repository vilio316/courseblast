export function SignUp(){

    return(
        <>
        <div className="grid place-items-center p-2 h-screen w-11/12 mx-auto">
                <div className="w-11/12 h-5/6 shadow-md shadow-black rounded-xl p-4 m-4">
                <p className="text-3xl font-bold text-emerald-700">CourseBlast</p>
                <p className="text-xs italic ">Sign Up for CourseBlast</p>
                    <div className="grid h-5/6">
                        <form className="my-2 grid">
                    <label htmlFor="name" className="block font-bold text-xl">Username</label>
                    <input id="name" type='name' required placeholder="Username" className="outline-none p-1 md:w-8/12 rounded-md border-2 border-emerald-700 indent-2"/>

                    <label htmlFor="password" className="block font-bold">Password</label>
                    <input id="password" type='password' required minLength={8} placeholder="Set a Password" className="p-1 peer md:w-8/12 rounded-md border-2 border-emerald-700 outline-none indent-2 my-1"/>
                    <p className="peer-invalid:block hidden text-red-500">Password cannot be less than 8 characters</p>

                    <label htmlFor="email_add" className="block font-bold">Email</label>
                    <input id="email_add" type='email' required placeholder="Email Address" className=" peer p-1 md:w-8/12 rounded-md border-2 border-emerald-700 outline-none indent-2 my-1"/>
                    <p className="text-red-500 hidden peer-invalid:block">Please enter a valid e-mail address</p>
                        </form>

                        <button className="bg-emerald-700 w-10/12 md:w-6/12 p-2 rounded-3xl text-white justify-self-center self-end">
                        Sign Up 
                    </button>

                    </div>
                </div>
        </div>
        </>
    )
}