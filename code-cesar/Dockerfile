# Usa una imagen base de Python oficial
FROM python:3.11-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo de requisitos e instala dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto del código (incluyendo app.py y tus funciones)
COPY . .

# Expón el puerto que usará Flask/FastAPI (ejemplo: 5000)
EXPOSE 5000

# Comando para iniciar el servidor (ejemplo con Flask)
CMD ["python", "app.py"]