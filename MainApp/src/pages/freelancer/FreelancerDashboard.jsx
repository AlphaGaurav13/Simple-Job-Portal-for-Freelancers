import PanelLayout from "../../components/layout/PanelLayout";
import { freelancerStats, incomeData, acceptanceData, activeProjects } from "../../data/mock";
import { Briefcase, FileText, Send, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { cn } from "../../lib/utils";

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div>
            <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className={cn("p-3 rounded-lg", color)}>
            <Icon size={24} className="text-white" />
        </div>
    </div>
);

const FreelancerDashboard = () => {
    return (
        <PanelLayout role="freelancer" title="Welcome Back, Kartik!">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Active Projects" value={freelancerStats.activeProjects} icon={Briefcase} color="bg-blue-600" />
                <StatCard title="Invoices Pending" value={freelancerStats.invoicesPending} icon={FileText} color="bg-emerald-500" />
                <StatCard title="Proposals Sent" value={freelancerStats.proposalsSent} icon={Send} color="bg-slate-500" />
                <StatCard title="Pending Quotes" value={freelancerStats.pendingQuotes} icon={Clock} color="bg-amber-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Income Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-800">Project Income</h3>
                        <select className="text-sm border-gray-200 rounded-lg text-gray-500 bg-gray-50 border px-3 py-1">
                            <option>This month</option>
                        </select>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={incomeData}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="income" radius={[4, 4, 4, 4]} barSize={32}>
                                    {incomeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#2563EB' : '#94A3B8'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Acceptance Rate */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center">
                    <h3 className="font-bold text-gray-800 w-full mb-4">Proposal Acceptance Rate</h3>
                    <div className="h-48 w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={acceptanceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    startAngle={90}
                                    endAngle={-270}
                                >
                                    <Cell fill="#2563EB" />
                                    <Cell fill="#E2E8F0" />
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-bold text-gray-900">54</span>
                            <span className="text-xs text-gray-500">Total Proposals</span>
                        </div>
                    </div>
                    <div className="flex gap-4 mt-6 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="size-3 rounded-full bg-slate-200"></span>
                            <span className="text-gray-600">Sent</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="size-3 rounded-full bg-blue-600"></span>
                            <span className="text-gray-600">Accepted</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Projects Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="font-bold text-gray-800">Project Progress Overview</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-medium">
                            <tr>
                                <th className="px-6 py-4">Project</th>
                                <th className="px-6 py-4">Client</th>
                                <th className="px-6 py-4">Due Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {activeProjects.map((project) => (
                                <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-900">{project.name}</p>
                                        <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                                            <div
                                                className={cn("h-full rounded-full",
                                                    project.status === 'On track' ? 'bg-green-500' :
                                                        project.status === 'At risk' ? 'bg-yellow-500' : 'bg-red-500'
                                                )}
                                                style={{ width: `${project.progress}%` }}
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{project.client}</td>
                                    <td className="px-6 py-4 text-gray-600">{project.dueDate}</td>
                                    <td className="px-6 py-4">
                                        <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium",
                                            project.status === 'On track' ? 'bg-green-100 text-green-700' :
                                                project.status === 'At risk' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-red-700'
                                        )}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-primary hover:text-indigo-700 font-medium text-xs">View -{'>'}</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </PanelLayout>
    );
};

export default FreelancerDashboard;
