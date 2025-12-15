import { LayoutDashboard, Briefcase, FileText, Settings, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';

const Sidebar = ({ role = 'freelancer' }) => {
    const links = role === 'freelancer' ? [
        { name: 'Dashboard', href: '/freelancer', icon: LayoutDashboard },
        { name: 'Find Work', href: '/freelancer/jobs', icon: Briefcase },
        { name: 'My Proposals', href: '/freelancer/proposals', icon: FileText },
        { name: 'Profile', href: '/freelancer/profile', icon: User },
        { name: 'Settings', href: '/freelancer/settings', icon: Settings },
    ] : [
        { name: 'Dashboard', href: '/client', icon: LayoutDashboard },
        { name: 'Post a Job', href: '/client/post-job', icon: Briefcase },
        { name: 'Find Freelancers', href: '/client/search', icon: User },
        { name: 'Contracts', href: '/client/contracts', icon: FileText },
        { name: 'Settings', href: '/client/settings', icon: Settings },
    ];

    return (
        <aside className="w-64 bg-surface border-r border-gray-200 min-h-screen p-6 fixed top-0 left-0 hidden md:block">
            <div className="flex items-center gap-2 mb-8">
                <div className="size-8 rounded-lg bg-gray-900 flex items-center justify-center text-white font-bold text-xl">
                    T
                </div>
                <span className="text-xl font-bold text-gray-900">TaskLance</span>
            </div>

            <nav className="space-y-1">
                {links.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.href}
                        end={link.href === '/freelancer' || link.href === '/client'}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )
                        }
                    >
                        <link.icon size={20} />
                        {link.name}
                    </NavLink>
                ))}
            </nav>


        </aside>
    );
};

export default Sidebar;
