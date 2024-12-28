const SectionHeader = ({ title, subtitle, className = "" }) => {
  return (
    <div className={`mb-6 ${className}`}>
      <h2 className="text-xl font-bold text-pry dark:text-blue-400">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
