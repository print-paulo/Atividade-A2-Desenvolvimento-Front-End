function desenharNoCanvas() {
    const canvas = document.getElementById('meuCanvas');

    if (!canvas || !canvas.getContext) {
        console.error("O navegador não suporta canvas ou ID está incorreto");
        return;
    }

    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(255, 0, 0, 1)';

    ctx.fillRect(50, 50, 500, 100);

    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';


    ctx.fillText('Seu canvas está funcionando!', canvas.width / 2, 100);
}

window.onload = desenharNoCanvas;