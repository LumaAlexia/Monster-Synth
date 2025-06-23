import { VStack, Icon, Heading, Text, Box } from "@chakra-ui/react";
import { ElementType } from "react";
import { colors } from "../theme/colors";

interface FeatureCardProps {
	icon: ElementType;
	title: string;
	text: string;
	gradient?: string;
}

export const FeatureCard = ({
	icon,
	title,
	text,
	gradient,
}: FeatureCardProps) => (
	<Box
		position="relative"
		overflow="hidden"
		borderRadius="xl"
		_hover={{
			transform: "translateY(-8px) scale(1.02)",
			boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
		}}
		transition="all 0.3s ease"
	>
		{/* Gradient Background */}
		<Box
			position="absolute"
			top={0}
			left={0}
			right={0}
			bottom={0}
			bg={
				gradient ||
				`linear-gradient(135deg, ${colors.egyptian_blue[800]}, ${colors.indigo[800]})`
			}
			opacity={0.9}
		/>

		{/* Glow Effect */}
		<Box
			position="absolute"
			top={0}
			left={0}
			right={0}
			bottom={0}
			bg={
				gradient ||
				`linear-gradient(135deg, ${colors.orange[500]}10, ${colors.blush[500]}10)`
			}
			filter="blur(20px)"
			opacity={0.5}
		/>

		<VStack
			gap={6}
			p={8}
			position="relative"
			zIndex={1}
			border="1px solid"
			borderColor={colors.egyptian_blue[600]}
			borderRadius="xl"
			backdropFilter="blur(10px)"
		>
			<Box
				p={4}
				bg={`${colors.primaryText}15`}
				borderRadius="full"
				border="2px solid"
				borderColor={colors.orange[500]}
			>
				<Icon as={icon} w={8} h={8} color={colors.orange[500]} />
			</Box>

			<VStack gap={3}>
				<Heading
					size="md"
					textAlign="center"
					color={colors.primaryText}
					fontWeight="bold"
				>
					{title}
				</Heading>
				<Text
					textAlign="center"
					color={colors.primaryText}
					opacity={0.8}
					fontSize="sm"
					lineHeight="tall"
				>
					{text}
				</Text>
			</VStack>
		</VStack>
	</Box>
);
