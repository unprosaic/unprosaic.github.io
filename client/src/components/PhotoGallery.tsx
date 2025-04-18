import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useConfig } from "@/context/ConfigContext";

interface Photo {
  id: string;
  src: string;
  description: string;
}

const PhotoGallery: React.FC = () => {
  const { config } = useConfig();
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    fetch("/api/images")
      .then((response) => response.json())
      .then((data) => setPhotos(data))
      .catch((error) => console.error("Error loading images:", error));
  }, []);

  const displayPhotos = photos.length > 0 ? photos : config.photos;

  return (
    <section className="mb-16">
      <h2
        className="font-pacifico text-3xl mb-6 text-center"
        style={{ color: "var(--primary)" }}
      >
        Memories :)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            className="gallery-item bg-white rounded-xl shadow-md overflow-hidden relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={photo.src}
              alt="Memory"
              className="w-full h-96 object-cover"
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0"
              style={{
                backgroundColor: `${getComputedStyle(document.documentElement).getPropertyValue("--primary")}cc`,
              }}
            >
              <p className="font-quicksand text-center">{photo.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PhotoGallery;
