export default function ErrorHandler(){

    return(
        <div className="grid h-screen w-11/12 mx-auto p-4">
            <div className="place-self-center text-center">
                <p className="font-bold text-4xl">
                    Whoops!
                </p>
                <p className="text-2xl">
                    Looks like we can't seem to find what you're looking for at the moment. Click <a href="/user" className="underline font-bold">here</a> to go back to your dashboard or on this <a href="/courses" className="underline font-bold">other link</a> to view all of our courses at CourseBlast.
                </p>
            </div>
        </div>
    )
}