import React, { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode; // For JSX elements/icons
  title: string;   // For the title
  description: string; // For the description
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default FeatureCard;
