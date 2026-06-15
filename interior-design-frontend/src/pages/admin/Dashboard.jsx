import Sidebar from "../../components/admin/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="p-6">
        <h1 className="text-2xl font-bold">Welcome Admin 👋</h1>
      </div>
    </div>
  );
};

export default Dashboard;