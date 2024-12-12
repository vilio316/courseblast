export function EmptyCart(){
    return(
        <>
        <div className="grid place-items-center min-h-96">
            <div>
        <p className="bold text-xl md:text-3xl text-center font-bold">Nothing's in your Cart yet</p>
        <p className="text-lg text-center md:text-xl">
        Click <a href="/courses" className="underline">here</a> to view all of our available courses.
        </p>
        </div>
        </div>
        </>
    )
}

export function CartFiller(){
    return(
        <>
        <div className="my-4 md:my-8">
        <p className="text-center text-lg md:text-xl font-bold">Want to add some more courses? </p>
        <p className="text-center underline">See <a href="/courses" target="_blank"> all our courses</a> with this link. </p>
        </div>
        </>
    )
}