import PanelLayout from "../../components/layout/PanelLayout";
import { Users, FileText, Briefcase, CheckCircle } from "lucide-react";
import { cn } from "../../lib/utils";
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, Cell } from "recharts";

const stats = {
    postedJobs: 5,
    activeContracts: 3,
    hiredFreelancers: 12,
    totalSpent: "$14,500"
};

const hiringData = [
    { name: 'Jan', count: 2 },
    { name: 'Feb', count: 4 },
    { name: 'Mar', count: 1 },
    { name: 'Apr', count: 5 },
    { name: 'May', count: 3 },
    { name: 'Jun', count: 6 },
];

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

const ClientDashboard = () => {
    return (
        <PanelLayout role="client" title="Client Dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Posted Jobs" value={stats.postedJobs} icon={Briefcase} color="bg-blue-600" />
                <StatCard title="Active Contracts" value={stats.activeContracts} icon={FileText} color="bg-slate-600" />
                <StatCard title="Hired Freelancers" value={stats.hiredFreelancers} icon={Users} color="bg-emerald-500" />
                <StatCard title="Total Spent" value={stats.totalSpent} icon={CheckCircle} color="bg-amber-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-6">Hiring Activity</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={hiringData}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="count" radius={[4, 4, 4, 4]} barSize={40}>
                                    {hiringData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill='#2563EB' />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
                    <button className="w-full bg-primary text-white font-medium py-3 rounded-xl mb-3 hover:bg-primary-hover transition-colors shadow-lg shadow-indigo-200">
                        Post a New Job
                    </button>
                    <button className="w-full bg-white text-gray-700 border border-gray-200 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors">
                        Find Freelancers
                    </button>
                </div>
            </div>
        </PanelLayout>
    );
};

export default ClientDashboard;
