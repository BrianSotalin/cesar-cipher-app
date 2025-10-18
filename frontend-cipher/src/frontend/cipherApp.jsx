import React, { useState } from 'react';
import { callCifrar, callDescifrar } from '../services/cipher.js';

// Asegúrate de instalar axios: npm install axios

const CipherApp = () => {
    // Estado para manejar si estamos en modo 'cifrar' o 'descifrar'
    const [mode, setMode] = useState('cifrar'); 
    
    // Estados para la entrada de datos
    const [inputText, setInputText] = useState('');
    const [clave, setClave] = useState(1); 
    
    // Estado para el resultado y mensajes
    const [resultado, setResultado] = useState('');
    const [loading, setLoading] = useState(false);

    // NUEVO ESTADO: Para el texto copiable (sin el prefijo "Resultado: ")
    const [copiableText, setCopiableText] = useState('');

    // NUEVO ESTADO: Para el mensaje de confirmación de copia
    const [copyMessage, setCopyMessage] = useState('');

    // Lista de opciones para el selector de clave
    const claveOptions = Array.from({ length: 9 }, (_, i) => i + 1);

    // --- FUNCIÓN DE COPIA AL PORTAPAPELES ---
    const handleCopy = () => {
        if (copiableText) {
            // Usa el API del navegador para escribir en el portapapeles
            navigator.clipboard.writeText(copiableText).then(() => {
                setCopyMessage('✅ ¡Copiado al portapapeles!');
                // Limpia el mensaje después de 2 segundos
                setTimeout(() => setCopyMessage(''), 2000);
            }).catch(err => {
                setCopyMessage('❌ Error al copiar.');
                console.error('Error al copiar:', err);
            });
        }
    };


    // --- MANEJADORES DE ACCIÓN ---

    const handleCipher = async () => {
        setLoading(true);
        setResultado('');
        setCopiableText('')
        if (!inputText.trim()) {
            setResultado('Por favor, ingresa el texto a cifrar.');
            setLoading(false);
            return;
        }

        const cipheredText = await callCifrar(inputText, clave);
        //setResultado(`Resultado Cifrado: ${cipheredText}`);
        // Si hay error (string), lo mostramos en resultado
        if (typeof cipheredText === 'string' && cipheredText.startsWith('Error')) {
            setResultado(cipheredText);
        } else {
            // Si es éxito, guardamos el texto limpio para copiar
            const textToCopy = cipheredText;
            setResultado(`Resultado Cifrado: ${textToCopy}`);
            setCopiableText(textToCopy); // Guarda el texto sin el prefijo
            console.log('Texto para copiar:', cipheredText);
        }
        setLoading(false);
    };

    const handleDecipher = async () => {
        setLoading(true);
        setResultado('');
        setCopiableText('');
        if (!inputText.trim()) {
            setResultado('Por favor, ingresa el texto cifrado.');
            setLoading(false);
            return;
        }

        const decipheredText = await callDescifrar(inputText);
        //setResultado(`Resultado Descifrado: ${decipheredText}`);
        // Si hay error (string), lo mostramos en resultado
        if (typeof decipheredText === 'string' && decipheredText.startsWith('Error')) {
            setResultado(decipheredText);
        } else {
            // Si es éxito, guardamos el texto limpio para copiar
            const textToCopy = decipheredText;
            setResultado(`Resultado Descifrado: ${textToCopy}`);
            setCopiableText(textToCopy); // Guarda el texto sin el prefijo
        }
        setLoading(false);
    };

    // --- INTERFAZ DINÁMICA ---

    const RenderInputs = () => {
        if (mode === 'cifrar') {
            return (
                <>
                    <label>
                        Clave (1-9):
                        <select
                            value={clave}
                            onChange={(e) => setClave(parseInt(e.target.value))}
                            disabled={loading}
                        >
                            {claveOptions.map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                    </label>
                    <button onClick={handleCipher} disabled={loading}>
                        {loading ? 'Cifrando...' : 'Cifrar'}
                    </button>
                </>
            );
        } else { // mode === 'descifrar'
            return (
                <button onClick={handleDecipher} disabled={loading}>
                    {loading ? 'Descifrando...' : 'Descifrar'}
                </button>
            );
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', fontFamily: 'Arial',color: '#B6B1E5' }}>
            <h2 style={{ color: '#3291E3' }}>Cifrado César con API Python</h2>
            
            {/* TOGGLE BUTTON */}
            <div>
                <button 
                    onClick={() => { setMode('cifrar'); setResultado(''); setInputText(''); }}
                    style={{ fontWeight: mode === 'cifrar' ? 'bold' : 'normal', marginRight: '10px' }}
                >
                    Cifrar 🔒
                </button>
                <button 
                    onClick={() => { setMode('descifrar'); setResultado(''); setInputText(''); }}
                    style={{ fontWeight: mode === 'descifrar' ? 'bold' : 'normal' }}
                >
                    Descifrar 🔓
                </button>
            </div>

            <hr />

            {/* INPUT PRINCIPAL */}
            <div style={{ margin: '20px 0' }}>
                <label style={{ display: 'block', marginBottom: '10px' }}>
                    {mode === 'cifrar' ? 'Texto a Cifrar:' : 'Texto Cifrado (con clave):'}
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={mode === 'cifrar' ? 'Escribe tu mensaje secreto' : 'Ej: KRND3'}
                        disabled={loading}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </label>
            </div>

            {/* OPCIONES DINÁMICAS Y BOTÓN */}
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                {RenderInputs()}
            </div>

            <hr style={{ marginTop: '20px' }} />

            {/* RESULTADO */}
            {/* <h3 style={{ wordWrap: 'break-word' }}>
                {resultado || 'El resultado aparecerá aquí...'}
            </h3> */}
            <div style={{ marginTop: '20px' ,color:'#32BCE3'}}>
                <h3 style={{ wordWrap: 'break-word', display: 'inline-block', marginRight: '10px' }}>
                    {resultado || 'El resultado aparecerá aquí...'}
                </h3>
                
                {/* BOTÓN DE COPIAR: Solo visible si hay texto copiable */}
                {copiableText && (
                    <button 
                        onClick={handleCopy} 
                        style={{ padding: '5px 10px', marginLeft: '10px', cursor: 'pointer' }}
                    >
                        📋 Copiar
                    </button>
                )}
                
                {/* MENSAJE DE CONFIRMACIÓN */}
                {copyMessage && (
                    <span style={{ marginLeft: '10px', color: copyMessage.startsWith('✅') ? 'green' : 'red' }}>
                        {copyMessage}
                    </span>
                )}
            </div>
        </div>
    );
};

export default CipherApp;