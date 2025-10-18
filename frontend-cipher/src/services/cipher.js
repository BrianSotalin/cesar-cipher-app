
import axios from 'axios';

// Asegúrate de que esta URL coincida con dónde está expuesto tu backend.
// En un entorno de desarrollo local, si no usas proxy de Vite, usa http://localhost:5000.
// Si usas Docker Compose, en tu componente debes usar http://backend:5000. 
// Para simplificar la prueba local, usaremos localhost.
const API_URL = import.meta.env.PROD 
    ? '/api' // URL para el contenedor Docker
    : 'http://localhost:5001/api'; // URL para desarrollo local (con proxy si lo usas)

/**
 * Llama al endpoint de cifrado.
 * @param {string} texto - El mensaje a cifrar.
 * @param {number} clave - La clave numérica (1-9).
 * @returns {Promise<string>} El texto cifrado con la clave oculta.
 */
export const callCifrar = async (texto, clave) => {
    try {
        const response = await axios.post(`${API_URL}/cifrar`, {
            texto: texto,
            clave: clave
        });
        return response.data.cifrado;
    } catch (error) {
        console.error("Error en el cifrado:", error.response ? error.response.data : error.message);
        return `Error al cifrar: ${error.response ? error.response.data.error : 'Conexión fallida'}`;
    }
};

/**
 * Llama al endpoint de descifrado.
 * @param {string} texto_cifrado - El mensaje cifrado que contiene la clave al final.
 * @returns {Promise<string>} El texto descifrado.
 */
export const callDescifrar = async (texto_cifrado) => {
    try {
        const response = await axios.post(`${API_URL}/descifrar`, {
            texto_cifrado: texto_cifrado
        });
        return response.data.descifrado;
    } catch (error) {
        console.error("Error en el descifrado:", error.response ? error.response.data : error.message);
        return `Error al descifrar: ${error.response ? error.response.data.error : 'Conexión fallida'}`;
    }
};