import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { colors } from "@/theme/colors";
import Link from "next/link";
import { useState } from "react";

export default function HeaderView() {
  const [imageError, setImageError] = useState(false);
  
  return (
    <Box 
      as="section" 
      py={10} 
      bg={colors.dark_purple.DEFAULT}
      color={colors.primaryText}
    >
      <Flex 
        direction={{ base: "column", md: "row" }} 
        align="center" 
        justify="space-between"
        maxW="container.xl" 
        mx="auto" 
        px={4}
        gap={8}
      >
        <Box maxW={{ base: "100%", md: "50%" }}>
          <Heading 
            as="h1" 
            size="4xl" 
            mb={4}
            color={colors.xanthous.DEFAULT}
          >
            Happy Little Dinosaurs
          </Heading>
          <Text fontSize="xl" mb={6}>
            Unisciti ai tuoi amici in questo divertente gioco di carte dove dovrai sopravvivere a disastri naturali e alla vita quotidiana come un piccolo dinosauro!
          </Text>
          <Link href="/lobby" passHref>
            <Button
              as="a"
              bg={colors.pigment_green.DEFAULT}
              color={colors.primaryText}
              _hover={{ bg: colors.pigment_green[600] }}
              size="lg"
            >
              Inizia a giocare
            </Button>
          </Link>
        </Box>
        
        <Box 
          maxW={{ base: "80%", md: "45%" }}
          mt={{ base: 8, md: 0 }}
        >
          <img 
            src={imageError ? "https://via.placeholder.com/500x400?text=Dinosaur+Image" : "/dino-hero.png"}
            alt="Happy Little Dinosaurs"
            onError={() => setImageError(true)}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Box>
      </Flex>
    </Box>
  );
}
