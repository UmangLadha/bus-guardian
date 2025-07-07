import PageHeading from "../components/common/pageHeading/pageheading";
import StateBox from "../components/dashboard/stateBox";

function Dashboard() {
  return (
    <>
      <PageHeading
        heading="Dashboard"
        description="Welcome back! Here's what's happening with your school buses today."
      />
      <StateBox />
    </>
  );
}

export default Dashboard;
