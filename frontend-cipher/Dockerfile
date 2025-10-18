# -------------------------------------------------------------
# FASE 1: BUILD (Compilación de la aplicación React)
# Usa la imagen grande de Node.js para compilar (npm run build).
# -------------------------------------------------------------
FROM node:20-alpine as build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración e instala dependencias
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copia el código fuente de React y compila la aplicación
COPY . .
RUN npm run build

# -------------------------------------------------------------
# FASE 2: RUN (Servicio con Nginx)
# Usa la imagen ligera de Nginx para servir los archivos estáticos.
# -------------------------------------------------------------
FROM nginx:alpine

# Copia los archivos estáticos generados en la FASE 1 (el contenido de la carpeta 'build')
# al directorio de servicio de Nginx.
COPY --from=build /app/dist /usr/share/nginx/html
# NOTA: Si usaste Create React App (CRA), la carpeta se llama 'build'.
# Si usaste Vite, la carpeta se llama 'dist'. Ajusta según tu caso. 
# Usaremos 'dist' como es más común en Vite:
# COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto por defecto de Nginx
EXPOSE 80

# El comando por defecto de Nginx ya sirve los archivos
CMD ["nginx", "-g", "daemon off;"]