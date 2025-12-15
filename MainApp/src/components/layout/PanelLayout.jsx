import Sidebar from './Sidebar';
import Header from './Header';

const PanelLayout = ({ children, role = 'freelancer', title = 'Dashboard' }) => {
    return (
        <div className="min-h-screen bg-background font-sans">
            <Sidebar role={role} />
            <div className="md:ml-64 min-h-screen flex flex-col">
                <Header title={title} />
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default PanelLayout;
