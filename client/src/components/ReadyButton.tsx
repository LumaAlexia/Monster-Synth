import { Button } from "@chakra-ui/react";
import { colors } from "@/theme/colors";
import { useState } from "react";

interface ReadyButtonProps {
  isReady: boolean;
  onToggleReady: () => void;
  isDisabled?: boolean;
}

const ReadyButton = ({ isReady, onToggleReady, isDisabled = false }: ReadyButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleToggle = () => {
    onToggleReady();
    
    // Feedback visivo temporaneo invece di toast
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 300);
  };

  return (
    <Button
      width="100%"
      bg={isReady ? colors.pigment_green.DEFAULT : colors.walnut_brown.DEFAULT}
      color={colors.primaryText}
      _hover={{
        bg: isReady ? colors.pigment_green[600] : colors.walnut_brown[600],
        transform: "scale(1.05)",
      }}
      transition="all 0.3s"
      onClick={handleToggle}
      disabled={isDisabled}
      _disabled={{
        opacity: 0.7,
        cursor: "not-allowed",
      }}
      size="lg"
      fontWeight="bold"
      py={6}
      transform={isClicked ? "scale(0.95)" : "scale(1)"}
    >
      {isReady ? "Pronto ✓" : "Segna come pronto"}
    </Button>
  );
};

export default ReadyButton;
