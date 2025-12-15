import PanelLayout from "../../components/layout/PanelLayout";
import { Search, MapPin, Star } from "lucide-react";

const freelancers = [
    {
        id: 1,
        name: "Alex Johnson",
        title: "Senior Full Stack Dev",
        rate: "$65/hr",
        rating: 4.9,
        reviews: 120,
        skills: ["React", "Node.js", "AWS"],
        location: "New York, USA",
        avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=random"
    },
    {
        id: 2,
        name: "Sarah Miller",
        title: "UX/UI Designer",
        rate: "$55/hr",
        rating: 5.0,
        reviews: 85,
        skills: ["Figma", "Sketch", "Prototyping"],
        location: "London, UK",
        avatar: "https://ui-avatars.com/api/?name=Sarah+Miller&background=random"
    },
    {
        id: 3,
        name: "David Chen",
        title: "Mobile Developer (Flutter)",
        rate: "$60/hr",
        rating: 4.8,
        reviews: 45,
        skills: ["Flutter", "Dart", "Firebase"],
        location: "Toronto, Canada",
        avatar: "https://ui-avatars.com/api/?name=David+Chen&background=random"
    }
];

const FreelancerCard = ({ freelancer }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-start">
        <img src={freelancer.avatar} alt={freelancer.name} className="size-16 rounded-full object-cover" />
        <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-900 text-lg">{freelancer.name}</h3>
                <span className="font-bold text-gray-900">{freelancer.rate}</span>
            </div>
            <p className="text-primary font-medium text-sm mb-2">{freelancer.title}</p>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    {freelancer.location}
                </div>
                <div className="flex items-center gap-1 text-yellow-500 font-medium">
                    <Star size={16} fill="currentColor" />
                    {freelancer.rating} ({freelancer.reviews})
                </div>
            </div>

            <div className="flex gap-2">
                {freelancer.skills.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md border border-gray-200">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
        <div className="flex flex-col gap-2 min-w-[120px]">
            <button className="w-full bg-primary text-white text-sm font-medium py-2 rounded-lg hover:bg-primary-hover transition-colors" onClick={() => alert('Hiring request sent to ' + freelancer.name + '!')}>
                Hire Now
            </button>
            <button className="w-full bg-white text-gray-700 border border-gray-200 text-sm font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors">
                View Profile
            </button>
        </div>
    </div>
);

const FreelancerSearch = () => {
    return (
        <PanelLayout role="client" title="Find Freelancers">
            <div className="mb-8 relative max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search freelancers by skills, name, or title..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm"
                />
            </div>

            <div className="space-y-4">
                {freelancers.map(f => (
                    <FreelancerCard key={f.id} freelancer={f} />
                ))}
            </div>
        </PanelLayout>
    );
};

export default FreelancerSearch;
