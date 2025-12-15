import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import FreelancerDashboard from './pages/freelancer/FreelancerDashboard';
import FindJobs from './pages/freelancer/FindJobs';
import ClientDashboard from './pages/client/ClientDashboard';
import FreelancerSearch from './pages/client/FreelancerSearch';
import PostJob from './pages/client/PostJob';
import ComingSoon from './pages/shared/ComingSoon';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/freelancer" replace />} />

        {/* Freelancer Routes */}
        <Route path="/freelancer" element={<FreelancerDashboard />} />
        <Route path="/freelancer/jobs" element={<FindJobs />} />

        {/* Client Routes */}
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/client/search" element={<FreelancerSearch />} />
        <Route path="/client/post-job" element={<PostJob />} />


        {/* Placeholder Routes */}
        <Route path="/freelancer/*" element={<ComingSoon role="freelancer" />} />
        <Route path="/client/*" element={<ComingSoon role="client" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
