import { useEffect, useState } from "react";
import ServiceCard from "../components/cards/ServiceCard";

export default function FreelancersPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // ✅ yahin use hota hai
    console.log("API URL:", import.meta.env.VITE_API_URL);

    fetch(`${import.meta.env.VITE_API_URL}/api/services`)
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {services.map(service => (
        <ServiceCard key={service._id} data={service} />
      ))}
    </div>
  );
}
