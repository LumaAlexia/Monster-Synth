import { createSystem, defaultConfig } from "@chakra-ui/react";
import { colors as appColors } from "./colors"; // Rinomino l'import per chiarezza

// Mappatura dei colori personalizzati nel formato richiesto da Chakra UI v3
const customTokens = {
  colors: {
    primaryText: { value: appColors.primaryText },
    dark_purple_default: { value: appColors.dark_purple.DEFAULT },
    dark_purple_100: { value: appColors.dark_purple[100] },
    dark_purple_200: { value: appColors.dark_purple[200] },
    dark_purple_300: { value: appColors.dark_purple[300] },
    dark_purple_400: { value: appColors.dark_purple[400] },
    dark_purple_500: { value: appColors.dark_purple[500] },
    dark_purple_600: { value: appColors.dark_purple[600] },
    dark_purple_700: { value: appColors.dark_purple[700] },
    dark_purple_800: { value: appColors.dark_purple[800] },
    dark_purple_900: { value: appColors.dark_purple[900] },
    walnut_brown_default: { value: appColors.walnut_brown.DEFAULT },
    walnut_brown_100: { value: appColors.walnut_brown[100] },
    walnut_brown_200: { value: appColors.walnut_brown[200] },
    walnut_brown_300: { value: appColors.walnut_brown[300] },
    walnut_brown_400: { value: appColors.walnut_brown[400] },
    walnut_brown_500: { value: appColors.walnut_brown[500] },
    walnut_brown_600: { value: appColors.walnut_brown[600] },
    walnut_brown_700: { value: appColors.walnut_brown[700] },
    walnut_brown_800: { value: appColors.walnut_brown[800] },
    walnut_brown_900: { value: appColors.walnut_brown[900] },
    pigment_green_default: { value: appColors.pigment_green.DEFAULT },
    pigment_green_100: { value: appColors.pigment_green[100] },
    pigment_green_200: { value: appColors.pigment_green[200] },
    pigment_green_300: { value: appColors.pigment_green[300] },
    pigment_green_400: { value: appColors.pigment_green[400] },
    pigment_green_500: { value: appColors.pigment_green[500] },
    pigment_green_600: { value: appColors.pigment_green[600] },
    pigment_green_700: { value: appColors.pigment_green[700] },
    pigment_green_800: { value: appColors.pigment_green[800] },
    pigment_green_900: { value: appColors.pigment_green[900] },
    bright_dino_green_default: { value: appColors.bright_dino_green.DEFAULT },
    // Aggiungi le altre tonalità di bright_dino_green se necessario, seguendo lo stesso pattern
    xanthous_default: { value: appColors.xanthous.DEFAULT },
    // Aggiungi le altre tonalità di xanthous se necessario
    bittersweet_default: { value: appColors.bittersweet.DEFAULT },
    // Aggiungi le altre tonalità di bittersweet se necessario
  },
  fonts: {
    heading: { value: "'Montserrat', sans-serif" },
    body: { value: "'Montserrat', sans-serif" },
  },
  // Qui puoi aggiungere altre personalizzazioni di token per componenti specifici se necessario
  // La personalizzazione dei componenti stessi (come Accordion) in v3 avviene diversamente,
  // spesso tramite "recipes" o props direttamente sui componenti.
  // Per ora, ci concentriamo sulla corretta definizione dei token base.
};

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: customTokens,
    // La semantica dei token per i componenti (es. Accordion) va gestita diversamente in v3.
    // Potrebbe essere necessario definire "recipes" o utilizzare props specifiche.
    // Per ora, manteniamo la struttura dei token di base.
  },
});

// Esporta anche i colori grezzi se servono altrove, ma per Chakra usa `system`
export const rawColors = appColors;

