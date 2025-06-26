import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Box, Button, Input, Textarea, VStack, Text } from "@chakra-ui/react";
import { colors } from "../theme/colors";
import { useTranslation } from "react-i18next";

export default function ContactForm() {
	const [state, handleSubmit] = useForm("mblypenr");
	const { t } = useTranslation("translation", { useSuspense: false });

	if (state.succeeded) {
		return (
			<Box
				bg={colors.egyptian_blue[200]}
				color={colors.primaryText}
				p={6}
				borderRadius="xl"
				textAlign="center"
				border="2px solid"
				borderColor={colors.orange[500]}
				boxShadow="0 4px 15px rgba(55, 49, 155, 0.3)"
			>
				<Text fontSize="lg" fontWeight="medium">
					{t("feedback.form.success")}
				</Text>
			</Box>
		);
	}

	return (
		<form onSubmit={handleSubmit} style={{ width: "100%" }}>
			<VStack gap={4}>
				<Box w="100%">
					<Text color={colors.primaryText} mb={2} fontWeight="medium">
						{t("feedback.form.email")}
					</Text>
					<Input
						id="email"
						type="email"
						name="email"
						bg="whiteAlpha.100"
						border="2px solid"
						borderColor={colors.egyptian_blue[500]}
						color={colors.primaryText}
						_placeholder={{ color: "whiteAlpha.600" }}
						_focus={{
							borderColor: colors.orange[500],
							boxShadow: `0 0 0 1px ${colors.orange[500]}`,
						}}
						_hover={{
							borderColor: colors.orange[400],
						}}
						placeholder={t("feedback.form.emailPlaceholder")}
						size="lg"
						transition="all 0.3s ease"
					/>
					<ValidationError
						prefix="Email"
						field="email"
						errors={state.errors}
					/>
				</Box>

				<Box w="100%">
					<Text color={colors.primaryText} mb={2} fontWeight="medium">
						{t("feedback.form.message")}
					</Text>
					<Textarea
						id="message"
						name="message"
						rows={6}
						bg="whiteAlpha.100"
						border="2px solid"
						borderColor={colors.egyptian_blue[500]}
						color={colors.primaryText}
						_placeholder={{ color: "whiteAlpha.600" }}
						_focus={{
							borderColor: colors.orange[500],
							boxShadow: `0 0 0 1px ${colors.orange[500]}`,
						}}
						_hover={{
							borderColor: colors.orange[400],
						}}
						placeholder={t("feedback.form.messagePlaceholder")}
						size="lg"
						transition="all 0.3s ease"
						resize="vertical"
					/>
					<ValidationError
						prefix="Message"
						field="message"
						errors={state.errors}
					/>
				</Box>

				<Button
					type="submit"
					disabled={state.submitting}
					bg={`linear-gradient(135deg, ${colors.orange[500]}, ${colors.quinacridone_magenta[500]})`}
					color="white"
					size="lg"
					w="100%"
					_hover={{
						transform: "translateY(-2px)",
						boxShadow: `0 8px 25px ${colors.orange[500]}40`,
						bg: `linear-gradient(135deg, ${colors.orange[400]}, ${colors.quinacridone_magenta[400]})`,
					}}
					_disabled={{
						opacity: 0.6,
						cursor: "not-allowed",
						transform: "none",
					}}
					loading={state.submitting}
					fontWeight="bold"
					transition="all 0.3s ease"
				>
					{state.submitting
						? t("feedback.form.sending")
						: t("feedback.form.submit")}
				</Button>
			</VStack>
		</form>
	);
}
