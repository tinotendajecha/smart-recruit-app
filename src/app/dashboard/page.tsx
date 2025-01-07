export default function DashboardPage() {
    return (
      <>
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[
            { title: 'Total Jobs', value: '24', change: '+2 this week' },
            { title: 'Applications', value: '156', change: '+12 today' },
            { title: 'Hires', value: '8', change: '+1 this month' },
            { title: 'Chat Queries', value: '432', change: '+45 today' },
          ].map((stat) => (
            <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-semibold mt-2">{stat.value}</p>
              <p className="text-sm text-green-600 mt-1">{stat.change}</p>
            </div>
          ))}
        </div>
  
        {/* Recent Jobs Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Job Posts</h2>
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-3">Job Title</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Applicants</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { title: 'Senior Developer', status: 'Active', applicants: 12 },
                  { title: 'Product Manager', status: 'Active', applicants: 8 },
                  { title: 'UI/UX Designer', status: 'Archived', applicants: 15 },
                ].map((job, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="py-4">{job.title}</td>
                    <td>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td>{job.applicants}</td>
                    <td>
                      <button className="text-blue-600 hover:text-blue-800">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }