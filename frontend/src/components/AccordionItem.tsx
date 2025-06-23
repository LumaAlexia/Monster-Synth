import { colors } from "@/theme/colors";
import { Box, Button, Icon, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { FaMinus, FaPlus } from "react-icons/fa";

interface AccordionItemProps {
	title: string;
	content: string[];
	isOpen: boolean;
	onToggle: () => void;
	variant?: "default" | "faq" | "feature";
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
	title,
	content,
	isOpen,
	onToggle,
	variant = "default",
}) => {
	const MotionBox = motion(Box);

	const getVariantStyles = () => {
		switch (variant) {
			case "faq":
				return {
					closedBg: colors.egyptian_blue[700],
					openBg: colors.orange[600],
					closedColor: colors.primaryText,
					openColor: colors.egyptian_blue[900],
					hoverClosedBg: colors.egyptian_blue[600],
					hoverOpenBg: colors.orange[500],
					contentBg: colors.egyptian_blue[800],
					borderColor: colors.orange[500],
				};
			case "feature":
				return {
					closedBg: colors.indigo[700],
					openBg: colors.blush[600],
					closedColor: colors.primaryText,
					openColor: colors.indigo[900],
					hoverClosedBg: colors.indigo[600],
					hoverOpenBg: colors.blush[500],
					contentBg: colors.indigo[800],
					borderColor: colors.blush[500],
				};
			default:
				return {
					closedBg: colors.quinacridone_magenta[700],
					openBg: colors.fandango[600],
					closedColor: colors.primaryText,
					openColor: colors.quinacridone_magenta[900],
					hoverClosedBg: colors.quinacridone_magenta[600],
					hoverOpenBg: colors.fandango[500],
					contentBg: colors.quinacridone_magenta[800],
					borderColor: colors.fandango[500],
				};
		}
	};

	const styles = getVariantStyles();

	return (
		<Box
			mb={4}
			overflow="hidden"
			borderRadius="lg"
			border="2px solid"
			borderColor={isOpen ? styles.borderColor : "transparent"}
			transition="all 0.3s ease"
			_hover={{
				borderColor: styles.borderColor,
				transform: "translateY(-2px)",
				boxShadow: `0 8px 25px ${styles.borderColor}25`,
			}}
		>
			<Button
				onClick={onToggle}
				w="100%"
				bg={isOpen ? styles.openBg : styles.closedBg}
				color={isOpen ? styles.openColor : styles.closedColor}
				borderRadius="lg"
				p={6}
				_hover={{
					bg: isOpen ? styles.hoverOpenBg : styles.hoverClosedBg,
				}}
				boxShadow="md"
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				_focus={{ boxShadow: "outline" }}
				transition="all 0.3s ease"
				fontSize={{ base: "lg", md: "xl" }}
				fontWeight="bold"
				height="auto"
				minH="60px"
			>
				<Box flex="1" textAlign="left">
					{title}
				</Box>
				<MotionBox
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.3, ease: "easeInOut" }}
				>
					<Icon as={isOpen ? FaMinus : FaPlus} fontSize="1.4em" />
				</MotionBox>
			</Button>

			<AnimatePresence initial={false}>
				{isOpen && (
					<MotionBox
						key="content"
						initial="collapsed"
						animate="open"
						exit="collapsed"
						variants={{
							open: {
								opacity: 1,
								height: "auto",
								paddingTop: 24,
								paddingBottom: 24,
							},
							collapsed: {
								opacity: 0,
								height: 0,
								paddingTop: 0,
								paddingBottom: 0,
							},
						}}
						transition={{
							duration: 0.4,
							ease: [0.04, 0.62, 0.23, 0.98],
						}}
						overflow="hidden"
					>
						<Box
							px={6}
							bg={styles.contentBg}
							color={colors.primaryText}
							borderBottomRadius="lg"
							position="relative"
						>
							{/* Decorative gradient line */}
							<Box
								position="absolute"
								top={0}
								left={0}
								right={0}
								height="2px"
								bg={`linear-gradient(90deg, ${styles.borderColor}, transparent)`}
							/>

							{content.map((paragraph, pIndex) => (
								<MotionBox
									key={pIndex}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										delay: pIndex * 0.1,
										duration: 0.4,
									}}
								>
									<Text
										mb={pIndex < content.length - 1 ? 4 : 0}
										fontSize={{ base: "md", md: "lg" }}
										lineHeight="tall"
										opacity={0.9}
									>
										{paragraph}
									</Text>
								</MotionBox>
							))}
						</Box>
					</MotionBox>
				)}
			</AnimatePresence>
		</Box>
	);
};
