export default function JobsPage() {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-semibold mb-6">Jobs Management</h1>
        <div className="mb-6">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Create New Job
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-3">Job Title</th>
              <th className="pb-3">Department</th>
              <th className="pb-3">Location</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { title: 'Senior Developer', department: 'Engineering', location: 'Remote', status: 'Active' },
              { title: 'Product Manager', department: 'Product', location: 'New York', status: 'Active' },
              { title: 'UI/UX Designer', department: 'Design', location: 'London', status: 'Archived' },
            ].map((job, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="py-4">{job.title}</td>
                <td className="py-4">{job.department}</td>
                <td className="py-4">{job.location}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {job.status}
                  </span>
                </td>
                <td className="py-4">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }