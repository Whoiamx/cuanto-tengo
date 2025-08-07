const options = [
  { label: "Dolares", total: 0 },
  { label: "Criptomonedas", total: 0 },
  { label: "CEDEARS / ACCIONES", total: 0 },
];
export const Categories = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        {options.map((option) => (
          <div className="flex justify-between">
            <span className="text-sm text-gray-600"> {option.label}</span>
            <span className="text-sm font-medium">$ {option.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
