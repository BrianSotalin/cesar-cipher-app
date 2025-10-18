from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

from cipher_cesar import cifrar_cesar, descifrar_cesar

# --- ENDPOINTS DE LA API --

@app.route('/api/cifrar', methods=['POST'])
def cifrar_api():
    """
    Endpoint para cifrar el texto. Espera { "texto": "...", "clave": ... }
    """
    data = request.get_json()
    texto = data.get('texto', '')
    clave = data.get('clave', 0)
    
    # Validaciones básicas
    if not texto or not isinstance(clave, int):
        return jsonify({"error": "Faltan datos o la clave no es un número entero."}), 400

    texto_cifrado = cifrar_cesar(texto, clave)
    
    # Devuelve el resultado en formato JSON
    return jsonify({
        "original": texto,
        "clave_usada": clave % 10,
        "cifrado": texto_cifrado
    })

@app.route('/api/descifrar', methods=['POST'])
def descifrar_api():
    """
    Endpoint para descifrar el texto. Espera { "texto_cifrado": "..." }
    """
    data = request.get_json()
    texto_cifrado = data.get('texto_cifrado', '')

    if not texto_cifrado:
        return jsonify({"error": "Falta el texto cifrado para descifrar."}), 400
    
    texto_descifrado = descifrar_cesar(texto_cifrado)

    # Manejar el posible error de formato devuelto por la función
    if texto_descifrado.startswith("Error:"):
         return jsonify({"error": texto_descifrado}), 400

    return jsonify({
        "cifrado_original": texto_cifrado,
        "descifrado": texto_descifrado
    })


# --- INICIO DEL SERVIDOR ---

if __name__ == '__main__':
    # Flask se ejecuta en el puerto 5000 por defecto
    # En Docker, este puerto es el que mapearemos
    app.run(host='0.0.0.0', port=5000, debug=True)


