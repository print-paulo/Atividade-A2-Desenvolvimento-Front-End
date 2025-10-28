function desenharFatiaDePizza() {
    // 1. O Elemento (Certifique-se de que o ID 'iconeHeader' está correto no seu HTML)
    const canvas = document.getElementById('iconeHeader');
    
    // Configurando o tamanho (como você fez)
    canvas.width = 50; 
    canvas.height = 50; 
    const ctx = canvas.getContext('2d');

    // Centraliza o centro da pizza
    const centerX = 49; 
    const centerY = 43; 
    const raio = 30; 

    // Desenhando a fatia da pizza
    ctx.beginPath(); 
    ctx.moveTo(centerX, centerY); 

    const anguloInicial = 200 * (Math.PI / 180); // Convertendo graus para radianos

    // Desenha o arco da fatia (o lado curvo)
    ctx.arc(
        centerX,
        centerY,
        raio,
        anguloInicial,
        anguloInicial + Math.PI * 0.30   // Um pouco menos que 45 graus para um visual melhor
    );

    ctx.lineTo(centerX, centerY); 

    ctx.fillStyle = '#ffd882'; 
    ctx.fill(); 

    // Adicionando borda e cobertura
    ctx.strokeStyle = '#d6ad55ff'; 
    ctx.lineWidth = 2; // Borda ajustada para 2px para o ícone
    ctx.stroke();
    
    const posicoesTopping = [
        {x: 38, y:23},
        {x: 40, y:33},
        {x: 30, y:30}
    ];

    for (const pos of posicoesTopping) {
        ctx.beginPath();

        ctx.arc(
            pos.x,
            pos.y,
            2.7,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#bd3623";
        ctx.fill();
        ctx.closePath();
    }
}

window.onload = desenharFatiaDePizza;