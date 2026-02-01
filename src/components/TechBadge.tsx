interface TechBadgeProps {
  name: string;
  color: string;
}

const TechBadge = ({ name, color }: TechBadgeProps) => {
  return (
    <div className="group flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:border-gray-600 transition-all duration-300 hover:scale-105">
      <div className={`w-2 h-2 rounded-full ${color} group-hover:animate-pulse`}></div>
      <span className="text-sm font-medium text-gray-300">{name}</span>
    </div>
  );
};

export default TechBadge;