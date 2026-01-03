import Sidebar from "./components/Sidebar";

function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  );
}

export default AdminLayout;
