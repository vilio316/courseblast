import logo from '../assets/react.svg'
import hero from '../assets/hero_illust.jpeg'
import selfpaced from '../assets/self-paced.jpg'
import security_illustration from '../assets/security_illustration.jpg'
import expert_1 from '../assets/expert_1.jpg'
import expert_2 from '../assets/expert_2.jpg'
import { useState } from 'react'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { useEffect } from 'react'
import supabase from '../supabase/clientSetup'
import { useAppDispatch } from '../redux/hooks'
import { setEmailAddress, setFirstName, setID, updatePFP } from '../redux/userSlice'
import { useNavigate } from 'react-router'
import { insertGoogUser } from './SignUpIn'


export function Landing(){
    let [nav_state, showNav]  = useState(false)
    let dispatch = useAppDispatch()
    let navigate = useNavigate()
    
    //UseEffect Call for redirecting users who sign in with Google
    useEffect(()=> {
        async function checkForUser(){
            const {data, error} = await supabase.auth.getSession()
            if(data){
              let {session} = data
              if(session){
              let { user } = session
              let {user_metadata} = user
              let {email, name, picture} = user_metadata
              insertGoogUser(user.id, name, '', email, picture)
              dispatch(setID(user.id))
              dispatch(setEmailAddress(email))
              dispatch(setFirstName(name))
              dispatch(updatePFP(picture))
              navigate('/user')
            }
        }
            else{
                console.log(error)
            }
        }
        checkForUser()
    }, [])
    //Effect Call ends here

    return(
        <>
        <div className="landing p-4 m-auto box-border">
        <div className="header grid grid-cols-12 items-center relative">
            <div className="col-span-10 md:col-span-4">
                <p className="text-emerald-800 text-3xl font-bold">
                    <a href='/' target='_blank'>CourseBlast</a>
                    </p>
            </div>

            {/*Mobile Navigation Bar*/}
            <div className='menu md:hidden col-span-2' onClick={()=> showNav(true)}>
                    <span className="h-1 w-6/12 block my-1 rounded-lg bg-emerald-800"></span>
                    <span className="h-1 w-6/12 block my-1 rounded-lg bg-emerald-800"></span>
                    <span className="h-1 w-6/12 block my-1 rounded-lg bg-emerald-800"></span>
            </div>
            <div className={`menu_content block md:hidden absolute top-0 z-10 bg-white bg-opacity-75 ${nav_state? `mt-0`: `-mt-96`} w-full p-2 transition-all`}>
               <span className='w-full text-end p-2 block hover:text-red-500' onClick={()=> showNav(false)}>X</span>
                <a className='block p-2'>Home</a>
                <a className='block p-2'>About</a>
                <a className='block p-2'>Courses</a>
                <a className='block p-2'>Instructors</a>
                <a className='block p-2'>Blog</a>
                <a href="/sign-in" className='rounded-2xl text-white bg-emerald-700 hover:bg-emerald-500 p-2 my-2'>Log In / Sign Up</a>
            </div>
            {/* Mobile Nav Bar ends here*/} 

           <div className="nav_links md:grid md:grid-cols-5 md:col-span-8 hidden text-xl md:items-center">
                    <a className="p-2 text-center hover:underline">About</a>
                    <a className="p-2 text-center hover:underline" href="/courses">Courses</a>
                    <a className="p-2 text-center hover:underline">Instructors</a>
                    <a className="p-2 text-center hover:underline">Blog</a>
                    <a className="p-2 text-center hover:underline bg-emerald-800  hover:bg-emerald-600 transition-colors rounded-2xl text-white" href='/sign-in'>Log In / Sign Up</a>
                </div>
            </div>
        
        <section className="my-4 hero">
        <div className="grid md:grid-cols-2 items-center justify-items-center">
            <div className='md:p-4 p-2'>
                <p className="font-bold text-4xl my-2">Online Learning Solutions for Students and Instructors</p>
                <p className="text-lg md:text-xl indent-6 text-justify my-4">
                    At CourseBlast, we provide dynamic and unique learning solutions that can be used to meet the diverse educational needs of students and instructors alike. With self-paced, easy-to-monitor courses and cutting-edge delivery technologies, we remain the number 1 provider of e-learning facilities.
                </p>
                <a className="text-white bg-emerald-700 text-xl rounded-2xl block w-8/12 sm:w-6/12 md:w-4/12 hover:opacity-65 text-center p-4 my-4 hover:underline font-bold transition-opacity">Read More</a>
            </div> 
        <div>
        <img src={hero} alt="Online Learning Illustration" className='lg:w-6/12 w-10/12 sm:w-9/12 mx-auto' />
        </div>
        </div>
        </section>

        <section className="course_selection my-4 grid p-4">
            <div className="grid md:grid-cols-12">
            <h2 className="text-xl md:text-3xl md:col-span-3 font-bold">
                Our Courses
            </h2>
            <input type="text" name="course_search" id="search" className="md:col-span-8 w-9/12 md:w-6/12 rounded-2xl text-xl border-emerald-700 border-2 p-2 outline-none focus:w-10/12 transition-all" maxLength={70} placeholder="Search Courses Here..." />
            </div>
            <p className="hidden md:block">Check through our extensive course library to start your learning journey, continue learning or even support your favourite instructors.</p>
            <p className="md:hidden">Find your next course here!</p>

            <div className="course_select_pane grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 my-2">
                <div className='course border-2 rounded-xl shadow-md shadow-grey-300 p-4 my-4 mx-2'>
                    <p className="course_name overflow-hidden text-xl font-bold w-10/12 text-ellipsis whitespace-nowrap">
                    <a href='/courses/course_id'>Object-Oriented Programming with Python: Zero to Hero in 30 Days</a>
                    </p>
                    <div className="instructor_profile flex items-center">
                        <div className='p-2'>
                            <img className=" instructor_shot h-8 w-8 rounded-full border-2 border-emerald-700" src={logo} />
                        </div>
                        <p className='instructor-name px-2 text-sm font-bold'>Amir Ramakishnaan</p>
                    </div>
                    <div className="course_stats grid grid-cols-12">
                        <p className="col-span-3">{/*Rating Component Should be Here*/} 4.2</p>
                        <p className="course_grade col-span-3">Intermediate</p>
                    </div>
                    <p className="course_desc text-justify h-24 md:h-36 hover:h-48 transition-all overflow-hidden text-ellipsis whitespace-pre-break">
                        Go from Zero To OOP Hero in thirty days with this new and improved Python course. In this course, you will come to understand various concepts in the field of object-oriented programming, including polymorphism, encapsulation and abstraction. You will also learn various Python techniques, best practices and libraries to improve your understanding of Python programming concepts. 
                    </p>
                    <p className="est_time text-sm my-2"> Est. Completion Time: 9 hours</p>
                </div>

                <div className='course border-2 rounded-xl shadow-md shadow-grey-300 p-4 my-4 mx-2'>
                    <p className="course_name overflow-hidden text-xl font-bold w-10/12 text-ellipsis whitespace-nowrap">
                    <a href='/courses/course_id'>Object-Oriented Programming with Python: Zero to Hero in 30 Days</a>
                    </p>
                    <div className="instructor_profile flex items-center">
                        <div className='p-2'>
                            <img className=" instructor_shot h-8 w-8 rounded-full border-2 border-emerald-700" src={logo} />
                        </div>
                        <p className='instructor-name px-2 text-sm font-bold'>Amir Ramakishnaan</p>
                    </div>
                    <div className="course_stats grid grid-cols-12">
                        <p className="col-span-3">{/*Rating Component Should be Here*/} 4.2</p>
                        <p className="course_grade col-span-3">Intermediate</p>
                    </div>
                    <p className="course_desc text-justify h-24 md:h-36 hover:h-48 transition-all overflow-hidden text-ellipsis whitespace-pre-break">
                        Go from Zero To OOP Hero in thirty days with this new and improved Python course. In this course, you will come to understand various concepts in the field of object-oriented programming, including polymorphism, encapsulation and abstraction. You will also learn various Python techniques, best practices and libraries to improve your understanding of Python programming concepts. 
                    </p>
                    <p className="est_time text-sm my-2"> Est. Completion Time: 9 hours</p>
                </div>

                <div className='course border-2 rounded-xl shadow-md shadow-grey-300 p-4 my-4 mx-2'>
                    <p className="course_name overflow-hidden text-xl font-bold w-10/12 text-ellipsis whitespace-nowrap">
                    <a href='/courses/course_id'>Object-Oriented Programming with Python: Zero to Hero in 30 Days</a>
                    </p>
                    <div className="instructor_profile flex items-center">
                        <div className='p-2'>
                            <img className=" instructor_shot h-8 w-8 rounded-full border-2 border-emerald-700" src={logo} />
                        </div>
                        <p className='instructor-name px-2 text-sm font-bold'>Amir Ramakishnaan</p>
                    </div>
                    <div className="course_stats grid grid-cols-12">
                        <p className="col-span-3">{/*Rating Component Should be Here*/} 4.2</p>
                        <p className="course_grade col-span-3">Intermediate</p>
                    </div>
                    <p className="course_desc text-justify h-24 md:h-36 hover:h-48 transition-all overflow-hidden text-ellipsis whitespace-pre-break">
                        Go from Zero To OOP Hero in thirty days with this new and improved Python course. In this course, you will come to understand various concepts in the field of object-oriented programming, including polymorphism, encapsulation and abstraction. You will also learn various Python techniques, best practices and libraries to improve your understanding of Python programming concepts. 
                    </p>
                    <p className="est_time text-sm my-2"> Est. Completion Time: 9 hours</p>
                </div>

                <div className='course border-2 rounded-xl shadow-md shadow-grey-300 p-4 my-4 mx-2'>
                    <p className="course_name overflow-hidden text-xl font-bold w-10/12 text-ellipsis whitespace-nowrap">
                    <a href='/courses/course_id'>Object-Oriented Programming with Python: Zero to Hero in 30 Days</a>
                    </p>
                    <div className="instructor_profile flex items-center">
                        <div className='p-2'>
                            <img className=" instructor_shot h-8 w-8 rounded-full border-2 border-emerald-700" src={logo} />
                        </div>
                        <p className='instructor-name text-sm font-bold px-2'>Amir Ramakishnaan</p>
                    </div>
                    <div className="course_stats grid grid-cols-12">
                        <p className="col-span-3">{/*Rating Component Should be Here*/} 4.2</p>
                        <p className="course_grade col-span-3">Intermediate</p>
                    </div>
                    <p className="course_desc text-justify h-24 md:h-36 hover:h-48 transition-all overflow-hidden text-ellipsis whitespace-pre-break">
                        Go from Zero To OOP Hero in thirty days with this new and improved Python course. In this course, you will come to understand various concepts in the field of object-oriented programming, including polymorphism, encapsulation and abstraction. You will also learn various Python techniques, best practices and libraries to improve your understanding of Python programming concepts. 
                    </p>
                    <p className="est_time text-sm my-2"> Est. Completion Time: 9 hours</p>
                </div>

                <div className='course border-2 rounded-xl shadow-md shadow-grey-300 p-4 my-4 mx-2'>
                    <p className="course_name overflow-hidden text-xl font-bold w-10/12 text-ellipsis whitespace-nowrap">
                    <a href='/courses/course_id'>Object-Oriented Programming with Python: Zero to Hero in 30 Days</a>
                    </p>
                    <div className="instructor_profile flex items-center">
                        <div className='p-2'>
                            <img className=" instructor_shot h-8 w-8 rounded-full border-2 border-emerald-700" src={logo} />
                        </div>
                        <p className='instructor-name px-2'>Amir Ramakishnaan</p>
                    </div>
                    <div className="course_stats grid grid-cols-12">
                        <p className="col-span-3">{/*Rating Component Should be Here*/} 4.2</p>
                        <p className="course_grade col-span-3">Intermediate</p>
                    </div>
                    <p className="course_desc text-justify h-24 md:h-36 hover:h-48 transition-all overflow-hidden text-ellipsis whitespace-pre-break">
                        Go from Zero To OOP Hero in thirty days with this new and improved Python course. In this course, you will come to understand various concepts in the field of object-oriented programming, including polymorphism, encapsulation and abstraction. You will also learn various Python techniques, best practices and libraries to improve your understanding of Python programming concepts. 
                    </p>
                    <p className="est_time text-sm my-2"> Est. Completion Time: 9 hours</p>
                </div>

                <div className='course border-2 rounded-xl shadow-md shadow-grey-300 p-4 my-4 mx-2'>
                    <p className="course_name overflow-hidden text-xl font-bold w-10/12 text-ellipsis whitespace-nowrap">
                    <a href='/courses/course_id'>Object-Oriented Programming with Python: Zero to Hero in 30 Days</a>
                    </p>
                    <div className="instructor_profile flex items-center">
                        <div className='p-2'>
                            <img className=" instructor_shot h-8 w-8 rounded-full border-2 border-emerald-700" src={logo} />
                        </div>
                        <p className='instructor-name px-2'>Amir Ramakishnaan</p>
                    </div>
                    <div className="course_stats grid grid-cols-12">
                        <p className="col-span-3">{/*Rating Component Should be Here*/} 4.2</p>
                        <p className="course_grade col-span-3">Intermediate</p>
                    </div>
                    <p className="course_desc text-justify h-24 md:h-36 hover:h-48 transition-all overflow-hidden text-ellipsis whitespace-pre-break">
                        Go from Zero To OOP Hero in thirty days with this new and improved Python course. In this course, you will come to understand various concepts in the field of object-oriented programming, including polymorphism, encapsulation and abstraction. You will also learn various Python techniques, best practices and libraries to improve your understanding of Python programming concepts. 
                    </p>
                    <p className="est_time text-sm my-2"> Est. Completion Time: 9 hours</p>
                </div>
            </div>
            <button className='justify-self-center p-2 text-xl w-10/12 md:w-3/12 my-2 rounded-2xl bg-emerald-700 text-white hover:bg-white hover:text-emerald-700'>
                See All Courses
            </button>
        </section>

        <section className="my-4 reasons md:p-4 p-2">
            <h2 className='p-2 text-xl md:text-2xl font-bold'>Why You Should Choose CourseBlast</h2>
            <div className='grid md:grid-cols-2 my-2 items-center'>
                <div>
                    <p className='p-2 text-xl font-bold md:text-2xl'>Tailored Learning</p>
                    <p className='p-2 text-lg indent-2 md:indent-4 text-justify'>Intermediate, beginner or professional, CourseBlast has a course with you in mind! Our courses and their curricula are carefully tailored to meet the educational needs of all of our users, irrespective of factors like skill and prior experience.</p>
                </div>

                <div>
                    <img src={selfpaced} className='md:w-7/12 w-9/12 mx-auto rounded-2xl'/>
                </div>

            </div>

            <div className='flex flex-col-reverse md:grid-cols-2 my-2 items-center md:grid'>
            <div>
                   <img src={expert_2} alt="Flexibility Illustration" className='w-9/12 mx-auto rounded-lg'/> 
                </div>
               
                <div>
                    <p className='p-2 text-xl font-bold md:text-2xl'>Flexibility</p>
                    <p className='p-2 indent-2 md:indent-4 text-lg text-justify'>All of our courses at CourseBlast are very user-friendly and can support any and all learning structure. Whether you prefer to binge-learn or study consistently, we're here for you. Our goal-based learning system also helps to ensure high completion and retention rates across the board.  </p>
                </div>

               

            </div>

            <div className='grid md:grid-cols-2 my-2 items-center'>
                <div className='p-2'>
                    <p className='p-2 text-lg md:text-xl font-bold'>Secure Learning</p>
                    <p className='md:text-lg text-justify indent-2'>At CourseBlast, your safety is important. Our sign-in and sign-up systems are secure and support multi-factor authentication and use verified encryption policies to ensure that your data is safe with us. We also offer on-site security to combat the loss of sensitive data, such as credit card numbers, ID documents and course data. To our instructors, we assure you, your courses and earnings are safe with us. </p>
                </div>

                <div>
                    <img src={security_illustration} className='mx-auto w-9/12 rounded-xl'/>
                </div>

            </div>

            <div className='flex flex-col-reverse md:grid-cols-2 my-2 items-center md:grid'>
            <div>
                    <img src={expert_1} alt="Expert Instructors" className='w-9/12 mx-auto rounded-xl' />
                </div>
                
                <div>
                    <p className='p-2 text-lg font-bold md:text-xl'>Expert Instructors and Staff</p>
                    <p className='text-lg md:text-xl text-justify'>At CourseBlast, we believe in providing high-quality education to all of our users. In line with this, we've gone the extra mile by ensuring that all of our instructors are certified and regularly testing and updating course material as at when necessary. </p>
                </div>

            </div>
        </section>

        <section className="testimonials p-2 md:p-4 my-4">
            <p className="text-xl md:text-2xl font-bold">
                Testimonials
            </p>
            <p>Don't just take our word for it. Here's a few testimonials from some of our favourite customers</p>

            <div className='grid md:grid-cols-3 p-2 my-2 gap-2 md:gap-4'>
                <div className='testimonial p-2 shadow-sm shadow-emerald-700 rounded-lg'>
                    <div className='grid grid-cols-12 items-center'>
                        <div className='col-span-2'>
                            <img src={logo} className='h-8 w-8 rounded-full'/>
                        </div>
                        <div className='col-span-10'>
                                <p>John Smith</p>
                                <p>Head of Operations, Dolor Inc. </p>
                        </div>
                    </div>
                    <div>
                        <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus nihil omnis unde voluptatem suscipit harum, quisquam asperiores saepe eveniet est numquam corporis quos illum quod, nobis voluptas exercitationem debitis qui!</p>
                    </div>
                </div>

                <div className='testimonial p-2  shadow-sm shadow-emerald-700 rounded-lg'>
                    <div className='grid grid-cols-12 items-center'>
                        <div className='col-span-2'>
                            <img src={logo} className='h-8 w-8 rounded-full'/>
                        </div>
                        <div className='col-span-10'>
                                <p>John Smith</p>
                                <p>Head of Operations, Dolor Inc. </p>
                        </div>
                    </div>
                    <div>
                        <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus nihil omnis unde voluptatem suscipit harum, quisquam asperiores saepe eveniet est numquam corporis quos illum quod, nobis voluptas exercitationem debitis qui!</p>
                    </div>
                </div>

                <div className='testimonial p-2  shadow-sm shadow-emerald-700 rounded-lg'>
                    <div className='grid grid-cols-12 items-center'>
                        <div className='col-span-2'>
                            <img src={logo} className='h-8 w-8 rounded-full'/>
                        </div>
                        <div className='col-span-10'>
                                <p>John Smith</p>
                                <p>Head of Operations, Dolor Inc. </p>
                        </div>
                    </div>
                    <div>
                        <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus nihil omnis unde voluptatem suscipit harum, quisquam asperiores saepe eveniet est numquam corporis quos illum quod, nobis voluptas exercitationem debitis qui!</p>
                    </div>
                </div>
            </div>

        </section>

        <section className="pricing my-4 grid p-4">
            <h2 className='pricing text-xl md:text-3xl font-bold'>
                Pricing Plans
            </h2>
            <div className='price_cards grid md:grid-cols-3 gap-4 p-4'>
                <div className='price_card p-2 my-2'>
                    <p className='text-emerald-700 md:text-center text-4xl text-bold'>
                        Basic
                    </p>
                    <p className='text-emerald-700 text-lg md:text-center'>
                        FREE
                    </p>
                    <ul className='marker:text-emerald-700 list-disc'>
                        <li>Access to 200+ Courses and Videos</li>
                        <li>Post-Course Evaluations</li>
                        <li className='unavailable-perk opacity-75 text-red-700'><del>Certificates of Completion</del></li>
                        <li className='unavailable-perk opacity-75 text-red-700'><del>AI Summarizer and Quizbot</del></li>
                        <li className='unavailable-perk opacity-75 text-red-700'><del>Writing tutorials, courtesy of UScrawl</del></li>
                        <li className='unavailable-perk opacity-75 text-red-700'><del>In-app Instructor Chat</del></li>
                    </ul>
                </div>

                <div className='price_card p-2 my-2'>
                    <p className='text-emerald-700 md:text-center text-4xl text-bold'>
                        Pro
                    </p>
                    <p className='text-emerald-700 text-lg md:text-center px-1'>
                        <s>$50</s> $19.99<span className='text-sm px-2'>per month</span>
                    </p>
                    <ul className='marker:text-emerald-700 list-disc'>
                        <li>Access to 200+ Courses and Videos</li>
                        <li>Post-Course Evaluation</li>
                        <li>Certificates of Completion</li>
                        <li>AI Summarizer and Quizbot</li>
                        <li>Writing tutorials, courtesy of UScrawl</li>
                        <li>In-app Instructor Chat</li>
                    </ul>
                </div>

                <div className='price_card p-2 my-2'>
                    <p className='text-emerald-700 md:text-center text-4xl text-bold'>
                        Enterprise
                    </p>
                    <p className='text-emerald-700 text-lg md:text-center'>
                        $150 <span className='text-sm'>per month</span>
                    </p>
                    <ul className='marker:text-emerald-700 list-disc'>
                        <li>Dynamic grading and report processing</li>
                        <li>Allows for up to 5 instructors, all on one subscription</li>
                        <li>Access to 200+ Courses and Videos</li>
                        <li>Post-Course Evaluation</li>
                        <li>Certificates of Completion</li>
                        <li>AI Summarizer and Quizbot</li>
                        <li>Writing tutorials, courtesy of UScrawl</li>
                        <li>In-app Instructor Chat</li>
                    </ul>
                </div>
            </div>
            <button className='justify-self-center p-2 text-xl w-10/12 md:w-3/12 my-2 rounded-2xl bg-emerald-700 text-white hover:bg-white hover:text-emerald-700'>
                See All Plans
            </button>
        </section>

        <section className='cta my-4'>
            <div className='grid md:grid-cols-2 md:items-center md:h-48'>
            <div>

            </div>
            <div>
                <p className="my-4 text-2xl md:text-4xl text-bold text-center">
                    What are you waiting for?
                </p>
                <p className='text-2xl text-center'>Ignite your learning journey today!</p>
            </div>
            </div>
        </section>

        <section className="footer my-4 grid justify-items-center md:grid-cols-4 gap-y-4">
            <div>
                <p className='text-3xl md:text-4xl font-bold text-emerald-700'>CourseBlast</p>
                <p>&copy; 2024 CourseBlast Inc. All Rights Reserved</p>
            </div>
            <div>
                <p className='text-xl underline'>About Us</p>
                <a className='block'>Company Bio</a>
                <a className='block'>Our Staff </a>
                <a className='block'>Privacy and Information Policy</a>
                <a className='block'>Terms and Conditions</a>
            </div>

            <div>
                <p className='text-xl underline'>CourseBlast for Instructors</p>
                <a className='block'>Information Protection Policy</a>
                <a className='block'>The Vetting Process</a>
                <a className='block'>More about the Program</a>
                <a className='block'>The Instructor Fund</a>
            </div>

            <div className='grid-cols-4 grid gap-x-4'>

                <FaFacebook size={"2.5rem"} className='block' fill='blue'/>

                <a href="https://x.com/vilio316">
                <FaXTwitter size={'2.5rem'} className="block" fill='blue'/>
                </a>
                
                <FaInstagram size={'2.5rem'} className='block' fill='pink'/>
                <FaLinkedin size={"2.5rem"} className='block' fill="blue"/>
                </div>
        </section>
        </div>

        </>
    )
}