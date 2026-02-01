import { Zap, Scissors, Download, Github, ExternalLink } from "lucide-react";
import ImageDemo from "./components/ImageDemo";
import CodeBlock from "./components/CodeBlock";
import FeatureCard from "./components/FeatureCard";
import TechBadge from "./components/TechBadge";

function App() {
  return (
    <div
      id="inicio"
      className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100"
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              Background
            </span>{" "}
            <span className="text-white">Remover</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Elimina fondos de imágenes automáticamente usando inteligencia artificial.
            Interfaz simple, resultados profesionales.
          </p>
        </header>

        {/* DEMO + CÓDIGO */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1.25fr] xl:grid-cols-[1.3fr_1.2fr] gap-8 mb-16">
          {/* Demo */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="w-5 h-5 text-orange-500" />
              <h2 className="text-xl font-semibold">Demo Interactiva</h2>
            </div>

            <div className="min-h-[520px]">
              <ImageDemo />
            </div>
          </div>

          {/* Código */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-orange-500">&lt;/&gt;</span>
              <h2 className="text-xl font-semibold">Código Principal</h2>
            </div>
            <CodeBlock />
          </div>
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <FeatureCard
            icon={<Zap className="w-6 h-6" />}
            title="Procesamiento Rápido"
            description="Modelo de IA optimizado que procesa imágenes en segundos manteniendo alta calidad."
          />
          <FeatureCard
            icon={<Scissors className="w-6 h-6" />}
            title="Detección Automática"
            description="Identifica automáticamente sujetos, personas y objetos para recortes precisos."
          />
          <FeatureCard
            icon={<Download className="w-6 h-6" />}
            title="Exportación PNG"
            description="Descarga el resultado en formato PNG con fondo transparente listo para usar."
          />
        </div>

        {/* TECH */}
        <div className="text-center mb-12">
          <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-6">
            Tecnologías Utilizadas
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <TechBadge name="Python" color="bg-blue-500" />
            <TechBadge name="Streamlit" color="bg-red-500" />
            <TechBadge name="rembg" color="bg-pink-500" />
            <TechBadge name="ONNX Runtime" color="bg-purple-500" />
            <TechBadge name="PIL" color="bg-green-500" />
          </div>
        </div>

        {/* LINKS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://github.com/YordinZ"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105"
          >
            <Github className="w-5 h-5" />
            Ver en GitHub
          </a>

          <a
            href="#inicio"
            className="group flex items-center gap-2 px-8 py-3 bg-gray-800 border border-gray-700 rounded-lg font-semibold text-white hover:bg-gray-700 transition-all duration-300"
          >
            <ExternalLink className="w-5 h-5" />
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
