import { useState } from "react";

export const useModalActions = () => {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isCripto, setIsCripto] = useState(false);

  return {
    open,
    setOpen,
    selectedType,
    setSelectedType,
    isSubmitting,
    setIsSubmitting,
    isCripto,
    setIsCripto,
  };
};
