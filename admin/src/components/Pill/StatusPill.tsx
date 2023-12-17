import { Badge } from "@/components/ui/badge";

interface StatusPillProps {
  Value: {
    IsActive: number;
  };
}

const StatusPill = ({ Value }: StatusPillProps) => {
  return (
    <Badge
      variant={Value.IsActive === 1 ? "secondary" : "destructive"}
      className='text-xs'
    >
      {Value.IsActive === 1 ? "Active" : "Inactive"}
    </Badge>
  );
};

export default StatusPill;
