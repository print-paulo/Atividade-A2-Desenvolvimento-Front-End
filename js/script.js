function desenharFatiaDePizza() {
    // 1. O Elemento (Certifique-se de que o ID 'iconeHeader' está correto no seu HTML)
    const canvas = document.getElementById('iconeHeader');
    
    // Configurando o tamanho (como você fez)
    canvas.width = 50; 
    canvas.height = 50; 
    const ctx = canvas.getContext('2d');

    // Centraliza o centro da pizza
    const centerX = 20; 
    const centerY = 40; 
    const raio = 30; 

    // Desenhando a fatia da pizza
    ctx.beginPath(); 
    ctx.moveTo(centerX, centerY); 

    const anguloInicial = 280 * (Math.PI / 180); // Convertendo graus para radianos

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

    // Adiciona um topping (círculo vermelho, como um pepperoni)
    ctx.beginPath();
    
    // Posiciona o topping na fatia
    ctx.arc(centerX + 10, centerY -10, 3, 0, Math.PI * 2); 
    ctx.fillStyle = '#bd3623'; 
    ctx.fill();
    
    ctx.closePath(); // Fecha o caminho principal
}

window.onload = desenharFatiaDePizza;