import { useMoneyCategory } from "@/app/hooks/useMoneyCategory";

export const Categories = () => {
  const { options } = useMoneyCategory();

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.id} className="flex justify-between">
            <span className="text-sm text-gray-600"> {option.label}</span>
            <span className="text-sm font-medium">$ {option.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
