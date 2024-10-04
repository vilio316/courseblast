import logo from '../assets/react.svg'

export function Landing(){

    return(
        <>
        <div className="landing p-8 m-auto box-border">
        <div className="header grid grid-cols-12 items-center">
            <div className="col-span-10 md:col-span-4">
                <p className="text-emerald-800 text-3xl font-bold">
                    <a href='/' target='_blank'>CourseBlast</a>
                    </p>
            </div>

            <div className='menu peer md:hidden col-span-2'>
                    <span className="h-1 w-6/12 block my-1 rounded-lg bg-emerald-800"></span>
                    <span className="h-1 w-6/12 block my-1 rounded-lg bg-emerald-800"></span>
                    <span className="h-1 w-6/12 block my-1 rounded-lg bg-emerald-800"></span>
            </div>

             
           <div className="nav_links md:grid md:grid-cols-5 md:col-span-8 hidden text-xl">
                    <a className="p-2 text-center hover:underline">About</a>
                    <a className="p-2 text-center hover:underline">Courses</a>
                    <a className="p-2 text-center hover:underline">Instructors</a>
                    <a className="p-2 text-center hover:underline">Blog</a>
                    <a className="p-2 text-center hover:underline bg-emerald-800  hover:bg-emerald-600 transition-colors rounded-2xl text-white">Register</a>
                </div>

            </div>
        
        <section className="my-4 hero">
        <div className=" grid md:grid-cols-2">
            <div>
                <p className="font-bold text-4xl my-2">Online Learning Solutions for Students and Instructors</p>
                <p className="text-lg md:text-xl indent-6">
                    At CourseBlast, we provide dynamic and unique learning solutions that can be used to meet the diverse educational needs of students and instructors alike. With self-paced, easy-to-monitor courses and cutting-edge delivery technologies, we remain the number 1 provider of e-learning facilities.
                </p>
            </div>
            {/* Add Illustration Here*/}
            
        </div>
        </section>

        <section className="course_selection my-4 grid">
            <div className="grid md:grid-cols-12">
            <h2 className="text-3xl md:col-span-3">
                Our Courses
            </h2>
            <input type="text" name="course_search" id="search" className="md:col-span-8 w-6/12 rounded-2xl text-xl border-emerald-700 border-2 p-2 outline-none focus:w-10/12 transition-all" maxLength={70} placeholder="Search Courses Here..." />
            </div>
            <p className="hidden md:block">Check through our extensive course library to start your learning journey, continue learning or even support your favourite instructors.</p>
            <p className="md:hidden">Find your next course here!</p>

            <div className="course_select_pane grid grid-cols-1 md:grid-cols-4 my-2">
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
            <button className='justify-self-center p-4 text-xl w-3/12 my-2 rounded-2xl bg-emerald-700 text-white hover:bg-white hover:text-emerald-700'>
                See All Courses
            </button>
        </section>
        </div>

        </>
    )
}