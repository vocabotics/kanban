import { motion } from 'framer-motion';

export function ChristmasLights() {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
  
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between px-4">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: colors[i % colors.length] }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}
