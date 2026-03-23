# ✉ Lettercraft

> Transforma tus ideas en correos impecables con IA.

Lettercraft es una aplicación React que usa la API de Claude (Anthropic) para convertir borradores en correos profesionales con el tono que elijas.

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
VITE_ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx
```

> Puedes obtener tu API key en: https://console.anthropic.com/

### 4. Inicia el servidor de desarrollo

```bash
npm run dev
```

La app estará disponible en **http://localhost:3000**

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
| `npm run dev`   | Servidor de desarrollo (puerto 3000) |
| `npm run build` | Build de producción en `/dist`     |
| `npm run preview` | Preview del build de producción  |

---

## ⚠️ Nota de seguridad

La API key se expone en el cliente (navegador). Esto es aceptable para uso **local o personal**.  
Para un entorno de producción público, mueve las llamadas a la API a un backend (Node.js, Express, etc.) y nunca expongas la key en el frontend.

---

## ✨ Funcionalidades

- **6 tonos disponibles**: Formal, Conciso, Cálido, Persuasivo, Diplomático, Asertivo
- **Contexto de respuesta** (opcional): pega el correo original para generar una respuesta adecuada
- **Copiar al portapapeles** con confirmación visual
- **Regenerar** el correo sin perder los inputs
- Diseño responsivo con paleta azul/blanco/gris
