import PanelLayout from "../../components/layout/PanelLayout";
import { Upload } from "lucide-react";

const PostJob = () => {
    return (
        <PanelLayout role="client" title="Post a New Job">
            <div className="max-w-3xl mx-auto bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Job Details</h2>
                    <p className="text-gray-500 text-sm mt-1">Provide details to find the best freelancers.</p>
                </div>

                <form className="p-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                        <input type="text" placeholder="e.g. React Frontend Developer" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white">
                                <option>Web Development</option>
                                <option>Design</option>
                                <option>Writing</option>
                                <option>Marketing</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Budget ($)</label>
                            <input type="number" placeholder="500" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea rows="5" placeholder="Describe your project requirements..." className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">
                            <Upload size={24} className="mb-2" />
                            <span className="text-sm">Click to upload or drag and drop</span>
                        </div>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3">
                        <button className="px-6 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                        <button className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors shadow-lg shadow-indigo-200">
                            Post Job Now
                        </button>
                    </div>
                </form>
            </div>
        </PanelLayout>
    );
};

export default PostJob;
