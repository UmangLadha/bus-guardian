import PageHeader from "../common/pageHeader/pageheader";
import StateBox from "./elements/stateBox";

function DashboardComponent(){
    return(
        <>
      <PageHeader
        heading="Dashboard"
        description="Welcome back! Here's what's happening with your school buses today."
      />
      <StateBox />
    </>
    );
}

export default DashboardComponent;