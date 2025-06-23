import { Box, Flex, Text } from "@chakra-ui/react";
import { colors } from "@/theme/colors";

interface PlayerCardProps {
  name: string;
  image: string;
  dinosaur: string;
  isReady: boolean;
  isOwner: boolean;
  isCurrentUser: boolean;
}

const PlayerCard = ({ name, image, dinosaur, isReady, isOwner, isCurrentUser }: PlayerCardProps) => {
  return (
    <Box
      bg={colors.dark_purple[400]}
      borderRadius="lg"
      borderWidth="2px"
      borderColor={isCurrentUser ? colors.xanthous.DEFAULT : isOwner ? colors.bittersweet.DEFAULT : colors.walnut_brown[600]}
      p={3}
      mb={3}
      transition="all 0.3s"
      position="relative"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: `0 5px 10px -2px ${colors.dark_purple[700]}`,
      }}
    >
      <Flex align="center">
        <Box 
          width="40px" 
          height="40px" 
          borderRadius="full" 
          overflow="hidden" 
          marginRight="12px"
          backgroundImage={`url(${image || '/default-avatar.png'})`}
          backgroundSize="cover"
          backgroundPosition="center"
        />
        <Box flex="1">
          <Flex align="center">
            <Text fontWeight="bold" color={colors.primaryText} mr={2}>
              {name}
            </Text>
            {isOwner && (
              <Box 
                bg={colors.bittersweet.DEFAULT} 
                color={colors.primaryText} 
                borderRadius="full" 
                px={2}
                fontSize="xs"
                title="Proprietario della lobby"
              >
                Host
              </Box>
            )}
            {isCurrentUser && (
              <Box 
                bg={colors.xanthous.DEFAULT} 
                color={colors.dark_purple.DEFAULT} 
                borderRadius="full" 
                px={2} 
                ml={1}
                fontSize="xs"
                title="Sei tu"
              >
                Tu
              </Box>
            )}
          </Flex>
          <Text fontSize="sm" color={colors.primaryText} opacity={0.8}>
            Dinosauro: {dinosaur}
          </Text>
        </Box>
        <Box>
          {isReady ? (
            <Box 
              bg={colors.pigment_green.DEFAULT} 
              color={colors.primaryText} 
              borderRadius="full" 
              px={2} 
              py={1}
              fontSize="xs"
            >
              Pronto
            </Box>
          ) : (
            <Box 
              bg={colors.walnut_brown.DEFAULT} 
              color={colors.primaryText} 
              borderRadius="full" 
              px={2} 
              py={1}
              fontSize="xs"
            >
              Non pronto
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default PlayerCard;
