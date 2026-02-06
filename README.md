# Background Remover 🖼️✨

Aplicación que elimina fondos de imágenes automáticamente utilizando **inteligencia artificial**.  
Incluye una **demo web interactiva** y un **backend en Python** para el procesamiento de imágenes.

---

## 🚀 Demo Web

La aplicación incluye una **demo interactiva** que permite:

- Subir una imagen desde el navegador  
- Eliminar el fondo con un solo clic  
- Comparar **antes / después** mediante un slider interactivo  
- Descargar el resultado en **PNG con fondo transparente**

---

## 🧩 Tecnologías utilizadas

### Frontend
- React + TypeScript  
- Vite  
- Tailwind CSS  
- Fetch API  

### Backend
- Python  
- `rembg`  
- ONNX Runtime  
- FastAPI (API REST)  
- Streamlit (modo local)

---

## 📦 Instalación y uso

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/YordinZ/background-remover.git
cd background-remover
```

##  🌐 Frontend – Demo Web (React)

Instalar dependencias:

```bash
npm install
```

Ejecutar el frontend:

```bash
npm run dev
```

La demo estará disponible en:

```bash
http://localhost:5173
```

## 🧠 Backend – Opción 1: FastAPI (Recomendado para la demo web)

Esta opción permite que el frontend consuma la API mediante fetch.

Instalar dependencias:

```bash
pip install fastapi uvicorn rembg onnxruntime pillow
```

Ejecutar la API:

```bash
cd src/code
uvicorn api:app --reload --port 8000
```

La API estará disponible en:

```bash
http://localhost:8000
```

Documentación automática (Swagger):

```bash
http://localhost:8000/docs
```

## 🖥️ Backend – Opción 2: Streamlit (modo local)

Instalar dependencias:

```bash
pip install streamlit rembg onnxruntime pillow
```

Ejecutar la app:

```bash
streamlit run src/code/background.py
```

---

> 🧪 Notas técnicas

1. rembg utiliza modelos ONNX para la eliminación de fondo
2. La primera ejecución puede tardar debido a la descarga del modelo
3. Si tienes problemas con ONNX, puedes usar la versión CPU:

```bash
pip install rembg[cpu]
```

---

## 📂 Estructura del proyecto (resumen)

background-remover/
├── src/
│   ├── components/        # Componentes React (demo interactiva)
│   ├── assets/            # Imágenes de demostración
│   └── code/
│       ├── api.py         # Backend FastAPI
│       └── background.py  # App Streamlit
├── public/
├── README.md
└── package.json

---

## 🎯 Objetivo del proyecto

Este proyecto fue desarrollado como:

1. Ejercicio práctico de integración Frontend + Backend
2. Demostración de IA aplicada al procesamiento de imágenes
3. Proyecto de portafolio académico y profesional