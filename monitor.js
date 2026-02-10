// monitor.js - El corazón de CORE Road

// 1. Importamos la función de la interfaz. 
// Asegúrate de que la ruta sea exacta a como tienes la carpeta.
import { showEmergencyUI } from './ui-alerts.js';

/**
 * Función principal que procesa los objetos detectados por la IA
 */
export const monitorSecurity = (detectedObjects) => {
    if (!detectedObjects || !Array.isArray(detectedObjects)) return;

    detectedObjects.forEach(obj => {
        // Filtramos por clases comunes de vehículos
        const validClasses = ['car', 'truck', 'motorcycle', 'bus'];
        
        if (validClasses.includes(obj.class)) {
            // Calculamos qué tan rápido se agranda el objeto en el video
            const growthRate = calculateGrowth(obj.previousArea, obj.currentArea);
            
            // Lógica de activación:
            // growthRate > 1.15 (Aproximación rápida)
            // isInDangerZone (Está en el centro de nuestra trayectoria)
            if (growthRate > 1.15 && isInDangerZone(obj.x)) {
                triggerEmergencyProtocol();
            }
        }
    });
};

/**
 * Calcula la tasa de crecimiento entre el frame anterior y el actual
 */
const calculateGrowth = (prev, curr) => {
    if (!prev || prev === 0) return 0;
    return curr / prev;
};

/**
 * Determina si el objeto está en el carril central (Zona de Peligro)
 */
const isInDangerZone = (x) => {
    // Siendo 0 la izquierda y 1 la derecha de la pantalla
    // El centro crítico está entre 0.35 y 0.65
    return x > 0.35 && x < 0.65;
};

/**
 * Dispara la alerta visual y auditiva
 */
const triggerEmergencyProtocol = () => {
    console.warn("⚠️ CORE Road: ¡PELIGRO DE COLISIÓN DETECTADO!");
    showEmergencyUI();
};