import PanelLayout from "../../components/layout/PanelLayout";
import { Search, MapPin, DollarSign, Clock } from "lucide-react";

// Mock jobs data
const jobs = [
    {
        id: 1,
        title: "Senior React Developer",
        company: "TechFlow Solutions",
        location: "Remote",
        type: "Contract",
        budget: "$45 - $60 / hr",
        posted: "2 hours ago",
        description: "We are looking for an experienced React developer to help us build a new dashboard...",
        skills: ["React", "Tailwind", "Node.js"]
    },
    {
        id: 2,
        title: "UI/UX Designer for Fintech App",
        company: "Nova Finance",
        location: "London, UK",
        type: "Fixed Price",
        budget: "$3,000",
        posted: "5 hours ago",
        description: "Need a modern, clean design for a fintech mobile application. Figma expertise required...",
        skills: ["Figma", "UI Design", "Mobile"]
    },
    {
        id: 3,
        title: "Full Stack Developer (MERN)",
        company: "StartUp Inc",
        location: "Remote",
        type: "Full-time",
        budget: "$80k - $100k / yr",
        posted: "1 day ago",
        description: "Joining our core team to build the MVP of our new SaaS product...",
        skills: ["MongoDB", "Express", "React", "Node"]
    },
];

const JobCard = ({ job }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors">{job.title}</h3>
                <p className="text-sm text-gray-500">{job.company}</p>
            </div>
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                {job.type}
            </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
                <MapPin size={16} />
                {job.location}
            </div>
            <div className="flex items-center gap-1">
                <DollarSign size={16} />
                {job.budget}
            </div>
            <div className="flex items-center gap-1">
                <Clock size={16} />
                {job.posted}
            </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>

        <div className="flex items-center justify-between mt-auto">
            <div className="flex gap-2">
                {job.skills.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                        {skill}
                    </span>
                ))}
            </div>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                Apply Now
            </button>
        </div>
    </div>
);

const FindJobs = () => {
    return (
        <PanelLayout role="freelancer" title="Find Work">
            <div className="mb-8 flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by keywords, skills, or job title..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm"
                    />
                </div>
                <button className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-colors shadow-sm shadow-indigo-200">
                    Search
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <div className="hidden lg:block space-y-6">
                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                        <h4 className="font-bold text-gray-900 mb-4">Category</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded text-primary focus:ring-primary" checked />
                                <span>Development</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                                <span>Design</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                                <span>Writing</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                                <span>Marketing</span>
                            </label>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                        <h4 className="font-bold text-gray-900 mb-4">Job Type</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                                <span>Fixed Price</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                                <span>Hourly</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Job List */}
                <div className="lg:col-span-3 space-y-4">
                    <h2 className="font-bold text-xl text-gray-800 mb-2">Recommended Jobs</h2>
                    {jobs.map(job => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            </div>
        </PanelLayout>
    );
};

export default FindJobs;
