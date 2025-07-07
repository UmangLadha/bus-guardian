interface PageHeadingTypes{
    heading:string;
    description:string;
}

function PageHeading({heading, description}:PageHeadingTypes){
    return(
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{heading}</h1>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
    );
}

export default PageHeading;