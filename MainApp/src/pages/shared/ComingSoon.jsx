import PanelLayout from "../../components/layout/PanelLayout";
import { Construction } from "lucide-react";

const ComingSoon = ({ role = 'freelancer' }) => {
    return (
        <PanelLayout role={role} title="Coming Soon">
            <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl border border-gray-100 shadow-sm min-h-[400px]">
                <div className="bg-primary/10 p-6 rounded-full mb-6">
                    <Construction size={48} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Under Construction</h2>
                <p className="text-gray-500 max-w-md">
                    We are currently working on this feature. Please check back later for updates.
                </p>
            </div>
        </PanelLayout>
    );
};

export default ComingSoon;
