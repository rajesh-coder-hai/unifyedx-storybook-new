// Helper function to generate a random pastel color
export const generatePastelColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const pastel = `hsl(${hue}, 100%, 85%)`; // Light pastel for background
  const dark = `hsl(${hue}, 70%, 50%)`; // Darker shade for text
  return { bg: pastel, text: dark };
};
