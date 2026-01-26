// Función para abrir el sobre y sacar la carta
document.addEventListener('DOMContentLoaded', function() {
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const letterContent = document.getElementById('letterContent');
    const envelopeFlap = document.getElementById('envelopeFlap');
    const heartButton = document.getElementById('heartButton');
    
    let isOpened = false;
    
    // Abrir sobre al hacer clic en cualquier parte
    if (envelopeWrapper) {
        envelopeWrapper.addEventListener('click', function(e) {
            if (!isOpened && e.target !== heartButton) {
                isOpened = true;
                letterContent.classList.add('pull-out');
                envelopeFlap.classList.add('open');
            }
        });
    }
    
    // Redirigir al hacer clic en el corazón
    if (heartButton) {
        heartButton.addEventListener('click', function(e) {
            e.stopPropagation();
            if (isOpened) {
                openLetter();
            }
        });
    }
    
    // Funcionalidad del botón "No" en página 4
    const noBtn = document.getElementById('noBtn');
    
    if (noBtn) {
        let clickCount = 0;
        const messages = [
            "¿En serio? Piénsalo mejor 🥺",
            "Dale, di que sí 💕",
            "¡Vamos! Sabes que quieres 😊",
            "Última oportunidad... 💘"
        ];
    
        noBtn.addEventListener('click', () => {
            if (clickCount < messages.length) {
                alert(messages[clickCount]);
                clickCount++;
            } else {
                const randomX = Math.floor(Math.random() * 200) - 100;
                const randomY = Math.floor(Math.random() * 100) - 50;
                noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
            }
        });
    }
    
    // Añadir animación de salida a botones de navegación
    const buttons = document.querySelectorAll('.navigation button, .answer-btn.yes-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('onclick');
            if (href && href.includes('location.href')) {
                e.preventDefault();
                document.body.style.animation = 'fadeOut 0.5s ease-out';
                
                const url = href.match(/'([^']+)'/)[1];
                
                setTimeout(() => {
                    window.location.href = url;
                }, 500);
            }
        });
    });
});

function openLetter() {
    document.body.style.animation = 'fadeOut 0.5s ease-out';
    setTimeout(() => {
        window.location.href = 'pagina2.html';
    }, 500);
}
function respuestaSi() {
    console.log("🎉 Función respuestaSi ejecutada");
    
    const seccionPregunta = document.getElementById('seccionPregunta');
    const seccionConfirmacion = document.getElementById('seccionConfirmacion');
    
    if (seccionPregunta) {
        seccionPregunta.style.display = 'none';
        console.log("✅ Pregunta ocultada");
    }
    
    if (seccionConfirmacion) {
        seccionConfirmacion.style.display = 'block';
        console.log("✅ Confirmación mostrada");
    }
    
    const ahora = new Date();
    const respuesta = {
        respuesta: 'SI',
        fecha: ahora.toLocaleDateString('es-MX'),
        hora: ahora.toLocaleTimeString('es-MX'),
        timestamp: ahora.getTime()
    };
    
    localStorage.setItem('respuestaSanValentin', JSON.stringify(respuesta));
    console.log("💾 Respuesta guardada:", respuesta);
    
    // Enviar email en segundo plano
    document.getElementById('inputRespuesta').value = '¡SÍ! 💕';
    document.getElementById('inputFecha').value = respuesta.fecha;
    document.getElementById('inputHora').value = respuesta.hora;
    document.getElementById('formularioOculto').submit();
    
    console.log("✅ Email enviado en segundo plano!");
}

// Activar el botón cuando cargue la página
document.addEventListener('DOMContentLoaded', function() {
    console.log("📱 Página cargada");
    
    const botonSi = document.getElementById('botonSi');
    
    if (botonSi) {
        console.log("✅ Botón SÍ encontrado");
        
        // Múltiples eventos para móvil
        botonSi.addEventListener('click', respuestaSi);
        botonSi.addEventListener('touchstart', respuestaSi);
        
        console.log("✅ Eventos agregados");
    } else {
        console.error("❌ No se encontró el botón");
    }
});
