interface WheelColors {
  [key: string]: string;
}

// Define specific colors for special segments
export const SPECIAL_SEGMENTS: WheelColors = {
  'ROSVO': '#000000',    // Black for Rosvo
  'OHI': '#455A64'       // Blue-grey for Ohi
};

// Define colors for money segments - vibrant gradient based on value
export const MONEY_COLORS = [
  '#D81B60',  // Deep pink (€900) - Highest value
  '#C2185B',  // Bright crimson (€900)
  '#7B1FA2',  // Vibrant purple (€800)
  '#512DA8',  // Deep purple (€800)
  '#1976D2',  // Bright blue (€700)
  '#0288D1',  // Ocean blue (€700)
  '#0097A7',  // Teal (€600)
  '#00796B',  // Dark teal (€500)
  '#2E7D32',  // Emerald (€500)
  '#1B5E20'   // Forest green (€400)
];

// Define the wheel segments - arranged by value pattern
export const WHEEL_SEGMENTS = [
  'ROSVO',    // Position 0
  '€900',     // Position 1 - High value
  '€800',     // Position 2
  '€700',     // Position 3
  '€600',     // Position 4
  '€500',     // Position 5
  'OHI',      // Position 6 (opposite to ROSVO)
  '€500',     // Position 7
  '€700',     // Position 8
  '€800',     // Position 9
  '€900',     // Position 10 - High value
  '€400'      // Position 11 - Lowest value
]; 