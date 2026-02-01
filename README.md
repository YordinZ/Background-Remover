> Instalación y uso


1️⃣ Clonar el repositorio
git clone https://github.com/YordinZ/background-remover.git
cd background-remover

2️⃣ Frontend (React)
npm install
npm run dev

3️⃣ Backend (Streamlit)

Instala las dependencias:
pip install streamlit rembg onnxruntime pillow

Ejecuta la app:
streamlit run src/code/background.py

> Notas técnicas

rembg utiliza modelos ONNX para la eliminación de fondo

Si tienes problemas con ONNX:
pip install rembg[cpu]
