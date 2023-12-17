type LayoutType = {
  children: React.ReactNode;
  className?: string;
};

const LayoutTemplate = ({ children, className = "" }: LayoutType) => {
  return (
    <div
      className={`bg-accent border-[3px] p-6 rounded-2xl min-h-screen ${className}`}
    >
      {children}
    </div>
  );
};

export default LayoutTemplate;
