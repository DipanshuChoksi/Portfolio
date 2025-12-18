function AdminPage() {
  return (
    <div className="p-5">
      <h2 className="text-2xl mb-5">Admin Page</h2>
      <div>
        <form action="hello" className="flex gap-2 flex-col">
          <div>
            <input
              type="text"
              name="email"
              placeholder="Enter your email..."
              className="p-2"
            />
          </div>
          <div>
            <input
              type="text"
              name="email"
              placeholder="Enter your password..."
              className="p-2"
            />
          </div>
          <button className="bg-blue-button py-2 rounded cursor-pointer hover:bg-blue-button/80">
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminPage;
