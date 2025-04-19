interface WheelColors {
  [key: string]: string;
}

// Define specific colors for special segments
export const SPECIAL_SEGMENTS: WheelColors = {
  'ROSVO': '#000000',    // Black for Rosvo
  'OHI': '#455A64'       // Blue-grey for Ohi
};

// Define colors for money segments - darker spectrum for better text contrast
export const MONEY_COLORS = [
  '#CC3333',  // Darker red
  '#2A8C84',  // Darker turquoise
  '#2980B9',  // Darker blue
  '#2E8B57',  // Sea green
  '#B8860B',  // Dark goldenrod
  '#8B4513',  // Saddle brown
  '#6A1B9A',  // Deep purple
  '#1E5799',  // Navy blue
  '#1F6032',  // Forest green
  '#B7950B'   // Darker gold
]; 