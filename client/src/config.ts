import { Photo } from "@shared/schema";

// Default configuration for the birthday countdown app
export const defaultConfig = {
  recipientName: "Gracelynn",
  birthdayDate: new Date(2025, 3, 18, 0, 0, 0), // April 18, 2025 at 12AM (note: month is 0-indexed)
  birthdayMessage: "Wishing you all the joy, happiness, and cake your heart desires on this special day! I love you and wish all the best. I hope this year is what you've been expecting for yourself. I believe you will make it so, amorcito. <3 HAPPY BIRTHDAY !!!!!",
  age: 22,
  theme: "default",
  photos: [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1532947974358-a218d18d8d14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
      description: "Our first beach trip in Hawaii where we found that cute cat cafe!"
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
      description: "Remember when we got matching flower crowns at the festival?"
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
      description: "The day we adopted Mittens! Look how tiny she was!"
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1508985307703-52d13b2b06b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
      description: "Your beautiful garden last spring. The flowers were amazing!"
    },
    {
      id: "5",
      src: "https://images.unsplash.com/photo-1519750783826-e2420f4d687f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
      description: "Our coffee shop study sessions always turned into giggles!"
    },
    {
      id: "6",
      src: "https://images.unsplash.com/photo-1514863775978-c611132e6691?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
      description: "Your 21st birthday! Can't believe it's been a year already!"
    }
  ] as Photo[]
};

export type Config = typeof defaultConfig;
