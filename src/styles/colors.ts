export const withOpacity = (hex: string, opacity: number) => {
  const [r, g, b] = hex.match(/\w\w/g)!.map((x) => parseInt(x, 16));
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const blackColor = "#000000";

export const mutedColor = withOpacity(blackColor, 0.5);

export const primaryColor = "#a47864";
export const primaryLightColor = withOpacity(primaryColor, 0.2);
export const primaryMiddleColor = withOpacity(primaryColor, 0.5);

export const secondaryColor = "#436573";
export const secondaryLightColor = withOpacity(secondaryColor, 0.2);

export const neutralColor = "#D9D9D9";
export const neutralLightColor = withOpacity(neutralColor, 0.3);
