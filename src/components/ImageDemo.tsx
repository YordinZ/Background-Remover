import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import demoBefore from "../assets/demo-before.png";
import demoAfter from "../assets/demo-after.jpg";

const ImageDemo = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;

    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updatePosition(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    updatePosition(e.touches[0].clientX);
  };

  return (
    <div className="relative select-none">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-2xl cursor-col-resize relative"
      >
        {/* CONTENEDOR GRANDE (misma altura que el CodeBlock) */}
        <div className="relative w-full h-[520px] bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden">
          {/* BEFORE */}
          <img
            src={demoBefore}
            alt="Original"
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />

          {/* AFTER (recorte por contenedor, sin distorsión) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={demoAfter}
              alt="Sin fondo"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
          </div>

          {/* LABELS */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-gray-900/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-300">
            Original
          </div>

          <div className="absolute top-4 right-4 px-3 py-1 bg-gray-900/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-300">
            Sin fondo
          </div>

          {/* SLIDER LINE */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 via-orange-500 to-red-500"
            style={{
              left: `${sliderPosition}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
              <ChevronLeft className="w-4 h-4 text-gray-900 absolute right-0.5" />
              <ChevronRight className="w-4 h-4 text-gray-900 absolute left-0.5" />
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-4">
        Arrastra para comparar el antes y después
      </p>
    </div>
  );
};

export default ImageDemo;
