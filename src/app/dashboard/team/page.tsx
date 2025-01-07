export default function TeamPage() {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Team Management</h1>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Add Team Member
          </button>
        </div>
  
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-3">Name</th>
              <th className="pb-3">Role</th>
              <th className="pb-3">Jobs Assigned</th>
              <th className="pb-3">Last Active</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Sarah Wilson', role: 'Senior Recruiter', jobs: 8, lastActive: '2 mins ago' },
              { name: 'Michael Brown', role: 'HR Manager', jobs: 12, lastActive: '1 hour ago' },
              { name: 'Emily Davis', role: 'Recruiter', jobs: 5, lastActive: '3 hours ago' },
            ].map((member, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="py-4">
                  <div className="flex items-center">
                    <img
                      src={`https://ui-avatars.com/api/?name=${member.name.replace(' ', '+')}`}
                      alt={member.name}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    {member.name}
                  </div>
                </td>
                <td className="py-4">{member.role}</td>
                <td className="py-4">{member.jobs}</td>
                <td className="py-4">
                  <span className="text-gray-500">{member.lastActive}</span>
                </td>
                <td className="py-4">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }