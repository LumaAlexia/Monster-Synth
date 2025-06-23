import { Button, Spinner } from "@chakra-ui/react";
import { colors } from "@/theme/colors";
import { FaSync } from "react-icons/fa";
import { useState } from "react";

interface RefreshButtonProps {
  isLoading: boolean;
  onRefresh: () => void;
}

const RefreshButton = ({ isLoading, onRefresh }: RefreshButtonProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRefresh = () => {
    onRefresh();
    setIsAnimating(true);
    
    // Reset animation state after a short delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <Button
      bg={colors.pigment_green.DEFAULT}
      color={colors.primaryText}
      _hover={{ 
        bg: colors.pigment_green[600]
      }}
      transition="all 0.3s"
      onClick={handleRefresh}
      disabled={isLoading}
      _disabled={{
        opacity: 0.7,
        cursor: "not-allowed",
      }}
      style={{
        transform: isAnimating ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.5s ease-in-out"
      }}
    >
      {isLoading ? (
        <>
          <Spinner size="sm" style={{ marginRight: '8px' }} /> Aggiornamento...
        </>
      ) : (
        <>
          <FaSync style={{ marginRight: '8px' }} /> Aggiorna lobby
        </>
      )}
    </Button>
  );
};

export default RefreshButton;
