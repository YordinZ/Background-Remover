import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import demoBefore from "../assets/demo-before.png";
import demoAfter from "../assets/demo-after.jpg";

const API_URL = "https://background-remover-backend-0q14.onrender.com/docs";

const ImageDemo = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterUrl, setAfterUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [isDragging, setIsDragging] = useState(false);

  // ✅ Demo guiado: solo cuando no hay imagen subida y no hay resultado
  const isDemoMode = !beforeFile && !afterUrl;

  // Soltar drag aunque el mouse/touch salga del cuadro
  useEffect(() => {
    const onUp = () => setIsDragging(false);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    window.addEventListener("touchcancel", onUp);
    return () => {
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
      window.removeEventListener("touchcancel", onUp);
    };
  }, []);

  const beforeUrl = useMemo(() => {
    if (!beforeFile) return null;
    return URL.createObjectURL(beforeFile);
  }, [beforeFile]);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleRemoveBg = async () => {
    if (!beforeFile) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", beforeFile);

      const response = await fetch(`${API_URL}/remove-bg`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Error al procesar la imagen");
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      if (afterUrl) URL.revokeObjectURL(afterUrl);
      setAfterUrl(imageUrl);
      setSliderPosition(50);
    } catch (error: any) {
      console.error(error);
      alert(error?.message ?? "Error quitando el fondo");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Slider activo en demo (isDemoMode) o cuando hay resultado (afterUrl)
  const isCompareMode = isDemoMode || !!afterUrl;

  // ✅ Base:
  // - demo: demoAfter
  // - resultado: afterUrl
  // - imagen subida sin resultado: beforeUrl
  const baseSrc = isDemoMode ? demoAfter : afterUrl ?? beforeUrl ?? demoAfter;

  // ✅ Capa recortada:
  // - demo: demoBefore
  // - resultado: beforeUrl (con fondo real)
  const overlaySrc = isDemoMode ? demoBefore : beforeUrl ?? demoBefore;

  return (
    <div className="relative select-none">
      {/* Controles */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-4">
        <input
          type="file"
          accept="image/png,image/jpeg"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            setBeforeFile(file);

            if (afterUrl) URL.revokeObjectURL(afterUrl);
            setAfterUrl(null);
            setSliderPosition(50);
          }}
          className="text-sm text-gray-300"
        />

        <button
          onClick={handleRemoveBg}
          disabled={!beforeFile || loading}
          className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:opacity-50 transition"
        >
          {loading ? "Procesando..." : "Quitar fondo"}
        </button>

        {afterUrl && (
          <a
            href={afterUrl}
            download="sin-fondo.png"
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm"
          >
            Descargar PNG
          </a>
        )}
      </div>

      {/* Slider */}
      <div
        ref={containerRef}
        onMouseMove={(e) => {
          if (!isDragging || !isCompareMode) return;
          updatePosition(e.clientX);
        }}
        onTouchMove={(e) => {
          if (!isDragging || !isCompareMode) return;
          updatePosition(e.touches[0].clientX);
        }}
        className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-2xl relative"
      >
        <div className="relative w-full h-[520px] bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden">
          {/* BASE */}
          <img
            src={baseSrc}
            alt="Base"
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />

          {/* ✅ Comparación (solo en demo o con resultado) */}
          {isCompareMode && (
            <>
              {/* Capa recortada */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={overlaySrc}
                  alt={isDemoMode ? "Demo" : "Con fondo"}
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-gray-900/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-300">
                {isDemoMode ? "Demo (antes)" : "Con fondo"}
              </div>

              <div className="absolute top-4 right-4 px-3 py-1 bg-gray-900/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-300">
                {isDemoMode ? "Demo (después)" : "Sin fondo"}
              </div>

              {/* Slider line + handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 via-orange-500 to-red-500"
                style={{
                  left: `${sliderPosition}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <div
                  onMouseDown={() => setIsDragging(true)}
                  onTouchStart={() => setIsDragging(true)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg cursor-grab active:cursor-grabbing"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-900 absolute right-0.5" />
                  <ChevronRight className="w-4 h-4 text-gray-900 absolute left-0.5" />
                </div>
              </div>
            </>
          )}

          {/* ✅ Si NO es compare mode (imagen subida sin resultado), solo label simple */}
          {!isCompareMode && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-gray-900/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-300">
              Original
            </div>
          )}
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-4">
        {afterUrl
          ? "Arrastra para comparar el antes y después"
          : beforeFile
            ? "Presiona “Quitar fondo” para ver la comparación"
            : "Modo demo: arrastra para ver el ejemplo o sube una imagen"}
      </p>
    </div>
  );
};

export default ImageDemo;
