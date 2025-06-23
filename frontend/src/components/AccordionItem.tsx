import { RuleSection } from "@/config/rules";
import { colors } from "@/theme/colors";
import { Box, Button, Icon, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { FaMinus, FaPlus } from "react-icons/fa";

export const AccordionItem: React.FC<{
	section: RuleSection;
	isOpen: boolean;
	onToggle: () => void;
}> = ({ section, isOpen, onToggle }) => {
	const MotionBox = motion(Box);

	return (
		<Box mb={4} border="none" overflow="hidden">
			<h2>
				<Button
					onClick={onToggle}
					w="100%"
					bg={
						isOpen
							? colors.bright_dino_green.DEFAULT
							: colors.dark_purple[400]
					}
					color={
						isOpen ? colors.dark_purple.DEFAULT : colors.primaryText
					}
					borderRadius="md"
					p={4}
					_hover={{
						bg: isOpen
							? colors.bright_dino_green[600]
							: colors.dark_purple[300],
					}}
					boxShadow="md"
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					_focus={{ boxShadow: "outline" }}
				>
					<Box
						flex="1"
						textAlign="left"
						fontSize={{ base: "lg", md: "xl" }}
						fontWeight="semibold"
					>
						{section.title}
					</Box>
					<Icon as={isOpen ? FaMinus : FaPlus} fontSize="1.2em" />
				</Button>
			</h2>
			<AnimatePresence initial={false}>
				{isOpen && (
					<MotionBox
						key="content"
						initial="collapsed"
						animate="open"
						exit="collapsed"
						variants={{
							open: { opacity: 1, height: "auto", marginTop: 0 },
							collapsed: { opacity: 0, height: 0, marginTop: -1 },
						}}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						overflow="hidden"
					>
						<Box
							pb={4}
							pt={4}
							px={4}
							bg={colors.dark_purple[500]}
							color={colors.primaryText}
							borderBottomRadius="md"
							border="1px solid"
							borderColor={colors.dark_purple[300]}
						>
							{section.content.map((paragraph, pIndex) => (
								<Text
									key={pIndex}
									mb={3}
									fontSize={{ base: "md", md: "lg" }}
									lineHeight="tall"
								>
									{paragraph}
								</Text>
							))}
						</Box>
					</MotionBox>
				)}
			</AnimatePresence>
		</Box>
	);
};
