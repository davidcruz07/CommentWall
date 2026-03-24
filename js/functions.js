const BASE_URL = 'https://commentwall.onrender.com/comments';

const API = {
    async getComments() {
        try {
            const res = await fetch(BASE_URL);
            if (!res.ok) throw new Error('Error al obtener comentarios');
            return await res.json();
        } catch (err) {
            console.error("GET Error:", err);
            return [];
        }
    },

    async postComment(comment) {
        try {
            const res = await fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(comment)
            });
            return res.ok;
        } catch (err) {
            console.error("POST Error:", err);
            return false;
        }
    },

    async deleteComment(id) {
        try {
            const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
            return res.ok;
        } catch (err) {
            console.error("DELETE Error:", err);
            return false;
        }
    }
};

const UI = {
    formatTime(isoDate) {
        const diff = new Date() - new Date(isoDate);
        const mins = Math.floor(diff / 1000 / 60);
        if (mins < 1) return 'Justo ahora';
        if (mins < 60) return `Hace ${mins} min`;
        const hours = Math.floor(mins / 60);
        if (hours < 24) return `Hace ${hours} h`;
        return new Date(isoDate).toLocaleDateString();
    },

    async refreshList() {
        const container = document.getElementById('comments-list');
        const emptyMsg = document.getElementById('empty-state');
        const comments = await API.getComments();

        if (comments.length === 0) {
            emptyMsg.classList.remove('hidden');
            container.innerHTML = '';
            return;
        }

        emptyMsg.classList.add('hidden');

        const sorted = comments.sort((a, b) => new Date(b.date) - new Date(a.date));

        container.innerHTML = sorted.map(c => `
            <div class="bg-white rounded-lg p-4 flex flex-col shadow-lg mb-4 border-l-4 border-purple-500 animate-fade-in">
                <div class="flex justify-between items-center mb-2">
                    <div class="flex items-center">
                        <img src="https://ui-avatars.com/api/?name=${c.username}&background=random" class="rounded-full w-10 h-10 mr-3 shadow-sm">
                        <div>
                            <h3 class="text-purple-600 font-bold text-lg">@${c.username}</h3>
                            <span class="text-gray-400 text-xs">${this.formatTime(c.date)}</span>
                        </div>
                    </div>
                    <button onclick="handleDelete(${c.id})" class="text-red-400 hover:text-red-600 transition-colors p-2">
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
                <p class="text-gray-700 text-lg ml-1 leading-relaxed">${c.message}</p>
            </div>
        `).join('');
    }
};


window.handleDelete = async (id) => {
    if (confirm("¿Estás seguro de que quieres eliminar este comentario?")) {
        const success = await API.deleteComment(id);
        if (success) UI.refreshList();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('comment-form');


    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username-input').value.trim();
        const message = document.getElementById('message-input').value.trim();


        if (!username) return alert("El nombre es obligatorio");
        if (message.length < 5) return alert("El mensaje debe tener al menos 5 caracteres");

        const newComment = {
            username,
            message,
            date: new Date().toISOString()
        };

        const result = await API.postComment(newComment);
        if (result) {
            form.reset();
            UI.refreshList();
        }
    });

    UI.refreshList();
    
    const refreshBtn = document.getElementById('refresh-btn');
    refreshBtn.addEventListener('click', () => {
        console.log("Actualizando comentarios manualmente...");
        UI.refreshList();
    });

});
