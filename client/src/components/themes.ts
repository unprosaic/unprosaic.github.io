export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
    accent2: string;
  };
  gradient: string;
}

export const themes: Theme[] = [
  {
    id: "pink",
    name: "Pink Dream",
    colors: {
      primary: "#FF87B7",
      secondary: "#A6D0DD",
      accent: "#FFD1DC",
      neutral: "#F9F5F6",
      accent2: "#E3F2FD",
    },
    gradient: "from-[#FF87B7] to-[#FFD1DC]",
  },
  {
    id: "lavender",
    name: "Lavender",
    colors: {
      primary: "#9F7ACE",
      secondary: "#C8B6E2",
      accent: "#E2D5F9",
      neutral: "#F5F0FF",
      accent2: "#E7DFFF",
    },
    gradient: "from-purple-300 to-purple-200",
  },
  {
    id: "mint",
    name: "Mint Kitty",
    colors: {
      primary: "#77D097",
      secondary: "#B0E6C0",
      accent: "#D4F3DF",
      neutral: "#F0FCEF",
      accent2: "#E0F5E7",
    },
    gradient: "from-green-300 to-blue-200",
  },
  {
    id: "peach",
    name: "Peach",
    colors: {
      primary: "#FFA274",
      secondary: "#FFD1B8",
      accent: "#FFE8DA",
      neutral: "#FFF5F0",
      accent2: "#FFF0E6",
    },
    gradient: "from-orange-200 to-yellow-200",
  },
  {
    id: "blueberry",
    name: "Blueberry",
    colors: {
      primary: "#6E9EFF",
      secondary: "#A5C0FF",
      accent: "#D1E0FF",
      neutral: "#F0F5FF",
      accent2: "#E2ECFF",
    },
    gradient: "from-blue-300 to-indigo-200",
  },
  {
    id: "default",
    name: "Birthday Cake",
    colors: {
      primary: "#FF7EB9",
      secondary: "#7AFCFF",
      accent: "#FEFF9C",
      neutral: "#FFF8F0",
      accent2: "#FFC4FF",
    },
    gradient: "from-red-200 via-green-200 to-blue-200",
  },
];

export function getThemeById(id: string): Theme {
  return themes.find((theme) => theme.id === id) || themes[0];
}
