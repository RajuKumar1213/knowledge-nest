import React from "react";

const Dashboard = () => {
  return (
    <div className="h-screen text-white flex rounded-lg border border-gray-600 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-t from-gray-900 to-gray-800 flex flex-col">
        <div className="px-6 py-4 text-xl font-bold border-b border-gray-700">
          User Dashboard
        </div>
        <nav className="flex-1">
          <ul>
            <li className="px-6 py-3 hover:bg-gradient-to-r from-gray-700 to-gray-600 cursor-pointer rounded-lg">
              Home
            </li>
            <li className="px-6 py-3 hover:bg-gradient-to-r from-gray-700 to-gray-600 cursor-pointer rounded-lg">
              Profile
            </li>
            <li className="px-6 py-3 hover:bg-gradient-to-r from-gray-700 to-gray-600 cursor-pointer rounded-lg">
              Settings
            </li>
            <li className="px-6 py-3 hover:bg-gradient-to-r from-gray-700 to-gray-600 cursor-pointer rounded-lg">
              Notifications
            </li>
          </ul>
        </nav>
        <div className="px-6 py-4 text-sm text-gray-400">
          © 2024 Your Company
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-gray-800 to-gray-900 shadow flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h1 className="text-2xl font-semibold">Welcome, User</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
            <button className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 rounded-lg shadow text-sm hover:from-blue-700 hover:to-blue-600">
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card Example */}
            <div className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold">Total Users</h2>
              <p className="text-2xl font-bold text-blue-400">1200</p>
            </div>
            <div className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold">Active Sessions</h2>
              <p className="text-2xl font-bold text-blue-400">305</p>
            </div>
            <div className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold">Feedbacks</h2>
              <p className="text-2xl font-bold text-blue-400">85</p>
            </div>
          </div>
          {/* Additional Content */}
          <div className="mt-6 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>User John updated his profile</span>
                <span className="text-sm text-gray-400">2 hours ago</span>
              </li>
              <li className="flex justify-between">
                <span>User Alice commented on a post</span>
                <span className="text-sm text-gray-400">5 hours ago</span>
              </li>
              <li className="flex justify-between">
                <span>User Bob uploaded a file</span>
                <span className="text-sm text-gray-400">1 day ago</span>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
