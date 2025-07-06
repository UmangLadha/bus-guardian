function ParentContainer(children:React.ReactNode){
    return(
        <div className="w-full h-[calc(100vh-12vh)] mt-[10vh] pb-10">
            {children}
        </div>
    )
}

export default ParentContainer;