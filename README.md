[![Netlify Status](https://api.netlify.com/api/v1/badges/f1eced7e-b053-4935-ae0c-8b898f8f58d2/deploy-status)](https://app.netlify.com/projects/lettecraft/deploys)
# ✉ Lettercraft

> Transforma tus ideas en correos impecables con IA.

Lettercraft es una aplicación React que usa Ollama Cloud para convertir borradores en correos profesionales con el tono que elijas.

---

## 🚀 Instalación y uso

### 1. Clona o descarga el proyecto

```bash
cd lettercraft
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Configura tu API key

Copia el archivo de ejemplo y agrega tu clave:

```bash
cp .env.example .env
```

Luego abre `.env` y reemplaza el valor:

```env
OLLAMA_API_KEY=tu_api_key_ollama
```

Opcionalmente puedes definir el modelo:

```env
OLLAMA_MODEL=gpt-oss:120b
VITE_OLLAMA_MODEL=gpt-oss:120b
```

### 4. Inicia el servidor de desarrollo

```bash
npm run dev:netlify
```

La app estará disponible en **http://localhost:8888** (Netlify Dev) y el frontend en Vite.

---

## 📁 Estructura del proyecto

```
lettercraft/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── EmailComposer.jsx       # Componente principal
│   │   ├── EmailComposer.module.css
│   │   ├── EmailOutput.jsx         # Panel de resultado
│   │   ├── EmailOutput.module.css
│   │   ├── Header.jsx
│   │   ├── Header.module.css
│   │   ├── ToneSelector.jsx        # Selector de tonos
│   │   └── ToneSelector.module.css
│   ├── hooks/
│   │   └── useEmailGenerator.js    # Lógica de llamada a la API
│   ├── constants.js                # Tonos, prompts y helpers
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
├── .env.example
└── .gitignore
```

---

## 🛠 Scripts disponibles

| Comando         | Descripción                        |
|-----------------|------------------------------------|
| `npm run dev`   | Solo Vite (sin funciones serverless) |
| `npm run dev:netlify` | Vite + Netlify Functions (recomendado) |
| `npm run build` | Build de producción en `/dist`     |
| `npm run preview` | Preview del build de producción  |

---

## ⚠️ Nota de seguridad

La API key de Ollama Cloud se usa desde la Netlify Function y no se expone en el navegador.

---

## ✨ Funcionalidades

- **6 tonos disponibles**: Formal, Conciso, Cálido, Persuasivo, Diplomático, Asertivo
- **Contexto de respuesta** (opcional): pega el correo original para generar una respuesta adecuada
- **Copiar al portapapeles** con confirmación visual
- **Regenerar** el correo sin perder los inputs
- Diseño responsivo con paleta azul/blanco/gris
