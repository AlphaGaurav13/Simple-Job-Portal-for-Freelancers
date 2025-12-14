import { useEffect, useState } from "react";
import ServiceCard from "../components/cards/ServiceCard";

export default function FreelancersPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading services...</p>;
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {services.length === 0 ? (
        <p>No services found</p>
      ) : (
        services.map(service => (
          <ServiceCard key={service._id} data={service} />
        ))
      )}
    </div>
  );
}
