// ui-alerts.js - La interfaz de emergencia de CORE Road

let timerInterval;
let secondsRemaining = 10;

export const showEmergencyUI = () => {
    // 1. Evitar que se abran múltiples alertas si ya hay una activa
    if (document.getElementById('emergency-overlay')) return;

    // 2. Crear el contenedor de la alerta
    const overlay = document.createElement('div');
    overlay.id = 'emergency-overlay';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(220, 0, 0, 0.9); display: flex; flex-direction: column;
        align-items: center; justify-content: center; z-index: 9999;
        color: white; font-family: 'Segoe UI', Arial, sans-serif; text-align: center;
    `;

    overlay.innerHTML = `
        <h1 style="font-size: 3rem; margin-bottom: 20px;">⚠️ ¡PELIGRO DETECTADO!</h1>
        <p style="font-size: 1.5rem;">Llamando a emergencias en:</p>
        <div id="countdown" style="font-size: 8rem; font-weight: bold; margin: 20px 0;">10</div>
        <button id="cancel-btn" style="
            padding: 20px 50px; font-size: 1.8rem; background: white; 
            color: #d00; border: none; border-radius: 50px; cursor: pointer;
            font-weight: bold; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            text-transform: uppercase;
        ">¡ESTOY BIEN, CANCELAR!</button>
    `;

    document.body.appendChild(overlay);

    // 3. Voz Humana de Alerta
    const mensajeVoz = new SpeechSynthesisUtterance("Se ha detectado un riesgo de colisión. Por favor, confirma que te encuentras bien.");
    mensajeVoz.lang = 'es-ES';
    window.speechSynthesis.speak(mensajeVoz);

    // 4. Iniciar la cuenta regresiva
    secondsRemaining = 10;
    const countdownDisplay = document.getElementById('countdown');

    timerInterval = setInterval(() => {
        secondsRemaining--;
        countdownDisplay.innerText = secondsRemaining;

        if (secondsRemaining <= 0) {
            clearInterval(timerInterval);
            executeEmergencyCall();
        }
    }, 1000);

    // 5. Lógica del botón de cancelación
    document.getElementById('cancel-btn').onclick = () => {
        clearInterval(timerInterval);
        window.speechSynthesis.cancel(); // Detiene la voz si sigue hablando
        overlay.remove();
        console.log("Protocolo de emergencia cancelado por el usuario.");
    };
};

const executeEmergencyCall = () => {
    // En el futuro, esto disparará la función de Supabase
    alert("🚨 ACCIÓN: Enviando ubicación GPS y evidencia a contactos de confianza...");
};