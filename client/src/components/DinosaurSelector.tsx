import { Box, Text } from "@chakra-ui/react";
import { colors } from "@/theme/colors";

interface DinosaurSelectorProps {
  selectedDinosaur: string;
  onSelect: (dinosaur: string) => void;
  isDisabled?: boolean;
}

const dinosaurs = [
  "T-Rex",
  "Triceratopo",
  "Stegosauro",
  "Velociraptor",
  "Brontosauro",
  "Pterodattilo"
];

const DinosaurSelector = ({ selectedDinosaur, onSelect, isDisabled = false }: DinosaurSelectorProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDinosaur = e.target.value;
    onSelect(newDinosaur);
  };

  return (
    <Box mb={4}>
      <Text mb={2} fontWeight="bold" color={colors.primaryText}>
        Scegli il tuo dinosauro
      </Text>
      <Box position="relative">
        <select
          value={selectedDinosaur}
          onChange={handleChange}
          disabled={isDisabled}
          style={{
            width: '100%',
            padding: '8px 12px',
            backgroundColor: colors.dark_purple[400],
            color: colors.primaryText,
            borderColor: colors.walnut_brown[600],
            borderRadius: '0.375rem',
            borderWidth: '1px',
            outline: 'none',
            appearance: 'none'
          }}
        >
          {dinosaurs.map((dino) => (
            <option key={dino} value={dino} style={{ backgroundColor: colors.dark_purple[500] }}>
              {dino}
            </option>
          ))}
        </select>
        <Box
          position="absolute"
          right="10px"
          top="50%"
          transform="translateY(-50%)"
          pointerEvents="none"
          color={colors.primaryText}
        >
          ▼
        </Box>
      </Box>
    </Box>
  );
};

export default DinosaurSelector;
