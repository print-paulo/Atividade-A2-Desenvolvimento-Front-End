// Adiciona item ao carrinho
function adicionarAoCarrinho(nome, preco) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert(`${nome} adicionado à cesta!`);
}

// Atualiza a lista do carrinho na página da cesta
function atualizarCarrinho() {
    const lista = document.getElementById('lista-carrinho');
    const totalSpan = document.getElementById('total');
    lista.innerHTML = '';
    let total = 0;

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.style.marginBottom = "10px";

        const nomeSpan = document.createElement('span');
        nomeSpan.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        li.appendChild(nomeSpan);

        const diminuirBtn = document.createElement('button');
        diminuirBtn.textContent = '−';
        diminuirBtn.style.margin = "0 5px";
        diminuirBtn.onclick = () => {
            if (item.quantidade > 1) {
                item.quantidade -= 1;
            } else {
                carrinho.splice(index, 1);
            }
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            atualizarCarrinho();
        };
        li.appendChild(diminuirBtn);

        const quantidadeSpan = document.createElement('span');
        quantidadeSpan.textContent = ` ${item.quantidade} `;
        li.appendChild(quantidadeSpan);

        const aumentarBtn = document.createElement('button');
        aumentarBtn.textContent = '+';
        aumentarBtn.style.margin = "0 5px";
        aumentarBtn.onclick = () => {
            item.quantidade += 1;
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            atualizarCarrinho();
        };
        li.appendChild(aumentarBtn);

        const subtotalSpan = document.createElement('span');
        subtotalSpan.textContent = ` Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2)}`;
        subtotalSpan.style.marginLeft = "10px";
        li.appendChild(subtotalSpan);

        lista.appendChild(li);
        total += item.preco * item.quantidade;
    });

    totalSpan.textContent = total.toFixed(2);
}

// Limpar carrinho
function limparCarrinho() {
    if (confirm('Deseja realmente esvaziar a cesta?')) {
        localStorage.removeItem('carrinho');
        atualizarCarrinho();
    }
}

// Finalizar compra
function finalizarCompra() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (carrinho.length === 0) {
        alert('Sua cesta está vazia!');
        return;
    }
    alert('Compra finalizada! Total: R$ ' + carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0).toFixed(2));
    localStorage.removeItem('carrinho');
    atualizarCarrinho();
}

// Inicializa a página da cesta se os elementos existirem
if (document.getElementById('lista-carrinho')) {
    document.getElementById('limpar').addEventListener('click', limparCarrinho);
    document.getElementById('finalizar').addEventListener('click', finalizarCompra);
    atualizarCarrinho();
}

// =========================
// Fatia de pizza no header
// =========================
function desenharFatiaDePizza() {
    const canvasIcone = document.getElementById('iconeHeader');
    
    if (!canvasIcone) return;

    canvasIcone.width = 50; 
    canvasIcone.height = 50; 
    const ctxIcone = canvasIcone.getContext('2d');

    const centerX = 49; 
    const centerY = 43; 
    const raio = 30; 

    ctxIcone.beginPath(); 
    ctxIcone.moveTo(centerX, centerY); 

    const anguloInicial = 200 * (Math.PI / 180);
    ctxIcone.arc(centerX, centerY, raio, anguloInicial, anguloInicial + Math.PI * 0.30);
    ctxIcone.lineTo(centerX, centerY); 

    ctxIcone.fillStyle = '#ffd882'; 
    ctxIcone.fill(); 

    ctxIcone.strokeStyle = '#d6ad55ff'; 
    ctxIcone.lineWidth = 2;
    ctxIcone.stroke();
    
    const posicoesTopping = [
        {x: 38, y:23},
        {x: 40, y:33},
        {x: 30, y:30}
    ];

    for (const pos of posicoesTopping) {
        ctxIcone.beginPath();
        ctxIcone.arc(pos.x, pos.y, 2.7, 0, Math.PI * 2);
        ctxIcone.fillStyle = "#bd3623";
        ctxIcone.fill();
        ctxIcone.closePath();
    }
}

// =========================
// Pizza principal
// =========================
const canvasPizza = document.getElementById('pizzaCanvas');

if (canvasPizza) {
    const ctxPizza = canvasPizza.getContext('2d');

    const centroX = canvasPizza.width / 2;
    const centroY = canvasPizza.height / 2;
    const raioPizza = 200; 

    const COLORS = {
        crosta: '#d4a259',     
        massa: '#fff5d1',      
        molho: '#bd3623',      
        queijo: '#ffd882',     
        pepperoni: '#8f0000',
        cogumelo: '#b3a08d',
        azeitona: '#30471e'    
    };

    let ingredientes = {
        molho: true,
        queijo: false,
        pepperoni: false,
        cogumelos: false,
        azeitonas: false
    };

    function drawBasePizza() {
        ctxPizza.clearRect(0, 0, canvasPizza.width, canvasPizza.height);

        ctxPizza.beginPath();
        ctxPizza.arc(centroX, centroY, raioPizza, 0, Math.PI * 2, true);
        ctxPizza.fillStyle = COLORS.crosta;
        ctxPizza.fill();

        ctxPizza.beginPath();
        ctxPizza.arc(centroX, centroY, raioPizza * 0.93, 0, Math.PI * 2, true);
        ctxPizza.fillStyle = COLORS.massa;
        ctxPizza.fill();

        if (ingredientes.molho) {
            ctxPizza.beginPath();
            ctxPizza.arc(centroX, centroY, raioPizza * 0.9, 0, Math.PI * 2, true);
            ctxPizza.fillStyle = COLORS.molho;
            ctxPizza.fill();
        }
    }

    function drawCheese() {
        ctxPizza.beginPath();
        ctxPizza.arc(centroX, centroY, raioPizza * 0.88, 0, Math.PI * 2, true); 
        ctxPizza.fillStyle = COLORS.queijo;
        ctxPizza.fill();
    }

    function drawTopping(x, y, color) {
        ctxPizza.beginPath();
        ctxPizza.arc(x, y, 12, 0, Math.PI * 2, true);
        ctxPizza.fillStyle = color;
        ctxPizza.fill();
    }

    function drawPepperonis() {
        const coords = [
            { x: centroX - 80, y: centroY - 60 },
            { x: centroX + 90, y: centroY - 20 },
            { x: centroX - 20, y: centroY + 80 },
            { x: centroX + 40, y: centroY + 10 },
            { x: centroX - 100, y: centroY + 10 },
            { x: centroX + 10, y: centroY - 100 },
            { x: centroX + 120, y: centroY + 50 }, 
            { x: centroX - 40, y: centroY - 140 }, 
            { x: centroX + 5, y: centroY + 5 }, 
            { x: centroX - 140, y: centroY - 30 }, 
            { x: centroX + 100, y: centroY + 130 } 
        ];
        coords.forEach(t => drawTopping(t.x, t.y, COLORS.pepperoni));
    }

    function drawMushrooms() {
        const coords = [
            { x: centroX - 60, y: centroY - 100 },
            { x: centroX + 80, y: centroY + 50 },
            { x: centroX - 10, y: centroY - 30 },
            { x: centroX + 20, y: centroY + 100 },
            { x: centroX - 130, y: centroY + 20 },
            { x: centroX + 100, y: centroY - 40 },
            { x: centroX - 30, y: centroY + 150 }
        ];
        coords.forEach(t => {
            ctxPizza.beginPath();
            ctxPizza.arc(t.x, t.y, 18, 0, Math.PI * 1.8, true); 
            ctxPizza.strokeStyle = COLORS.cogumelo;
            ctxPizza.lineWidth = 8;
            ctxPizza.stroke();
        });
    }

    function drawOlives() {
        const coords = [
            { x: centroX - 120, y: centroY + 20 },
            { x: centroX + 50, y: centroY - 120 },
            { x: centroX + 110, y: centroY + 70 },
            { x: centroX - 10, y: centroY - 120 },
            { x: centroX - 50, y: centroY + 120 },
            { x: centroX + 150, y: centroY - 10 }, 
            { x: centroX - 20, y: centroY + 150 }, 
            { x: centroX - 100, y: centroY - 70 }, 
            { x: centroX + 70, y: centroY + 40 }, 
            { x: centroX - 140, y: centroY + 100 } 
        ];
        
        coords.forEach(t => {
            ctxPizza.beginPath();
            ctxPizza.arc(t.x, t.y, 8, 0, Math.PI * 2, true);
            ctxPizza.fillStyle = COLORS.azeitona;
            ctxPizza.fill();

            ctxPizza.beginPath();
            ctxPizza.arc(t.x, t.y, 3, 0, Math.PI * 2, true);
            ctxPizza.fillStyle = COLORS.massa; 
            ctxPizza.fill();
        });
    }

    function drawPizza() {
        drawBasePizza(); 
        if (ingredientes.queijo) drawCheese();
        if (ingredientes.pepperoni) drawPepperonis();
        if (ingredientes.cogumelos) drawMushrooms();
        if (ingredientes.azeitonas) drawOlives();
    }

    document.querySelectorAll('.botoes-ingredientes button').forEach(button => {
        button.addEventListener('click', (event) => {
            const ingrediente = event.target.dataset.ingrediente;
            ingredientes[ingrediente] = !ingredientes[ingrediente]; 
            const acao = ingredientes[ingrediente] ? `Remover` : `Adicionar`;
            const nomeIngrediente = ingrediente.charAt(0).toUpperCase() + ingrediente.slice(1);
            event.target.textContent = `${acao} ${nomeIngrediente}`;
            drawPizza(); 
        });
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
        ingredientes = {
            molho: true,
            queijo: false,
            pepperoni: false,
            cogumelos: false,
            azeitonas: false
        };
        document.querySelectorAll('.botoes-ingredientes button').forEach(button => {
            const ingrediente = button.dataset.ingrediente;
            const nomeIngrediente = ingrediente.charAt(0).toUpperCase() + ingrediente.slice(1);
            button.textContent = `Adicionar ${nomeIngrediente}`;
        });
        drawPizza(); 
    });

    document.getElementById('addToCartBtn').addEventListener('click', () => {
        const ingredientesSelecionados = Object.keys(ingredientes)
            .filter(key => ingredientes[key] && key !== 'molho') 
            .join(', ');  
        alert(`Pizza Personalizada Adicionada à Cesta! Ingredientes: Molho, ${ingredientesSelecionados || 'Base Simples'}.`);
    });

    drawPizza();
}

// Inicia a fatia do header
window.onload = desenharFatiaDePizza;
