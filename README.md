# 💬 Comment Wall (Fullstack Project)

**🌐 Ver aplicación en vivo:** [https://davidcruz07.github.io/CommentWall/](https://davidcruz07.github.io/CommentWall/)

---

Un muro de comentarios interactivo que permite a los usuarios publicar, visualizar y gestionar mensajes en tiempo real. Este proyecto integra una arquitectura de cliente-servidor completa y segura, diseñada como práctica de desarrollo Fullstack.

## 🚀 Enlaces Rápidos

* **Frontend (GitHub Pages):** [https://davidcruz07.github.io/CommentWall/](https://davidcruz07.github.io/CommentWall/)
* **API Backend (Render):** [https://commentwall.onrender.com](https://commentwall.onrender.com)

---

## 🛠️ Stack Tecnológico

### Frontend
* **HTML5 & JavaScript (ES6+)**: Lógica de cliente y consumo de la API.
* **Tailwind CSS**: Framework de utilidades para un diseño moderno, responsivo y minimalista.
* **GitHub Pages**: Hosting para el cliente.

### Backend
* **Node.js & Express**: Servidor y manejo de rutas REST.
* **CORS**: Seguridad configurada para permitir peticiones exclusivamente desde el origen autorizado.
* **Render**: Hosting para el servicio de backend.

---

## ⚙️ Funcionamiento de la API (Endpoints)

La comunicación se realiza mediante JSON a través de `server.js`:

* **GET `/comments`**: Obtiene la lista completa de comentarios.
* **POST `/comments`**: Envía un nuevo comentario (requiere un objeto con el mensaje).
* **DELETE `/comments/:id`**: Elimina un comentario específico utilizando su ID único.

> **Nota de Rendimiento:** El backend en Render utiliza una instancia gratuita. Si la app ha estado inactiva, el primer proceso de carga puede tardar entre 30 y 50 segundos mientras el servidor se reactiva (Cold Start).

---

## 🔧 Instalación y Desarrollo Local

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/davidcruz07/CommentWall.git](https://github.com/davidcruz07/CommentWall.git)
    ```
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Levantar el servidor:**
    ```bash
    node server.js
    ```
    *El servidor correrá por defecto en `http://localhost:3000`.*

---

## ✒️ Autor

* **David Cruz** - [davidcruz07](https://github.com/davidcruz07)
