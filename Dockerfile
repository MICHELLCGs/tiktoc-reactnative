# Usa una imagen base oficial de Node.js con las herramientas necesarias para React Native
FROM node:current-buster AS build

# Instala herramientas adicionales necesarias
RUN apt-get update && apt-get install -y \
    git \
    openjdk-11-jdk \
    && apt-get clean

# Establece el directorio de trabajo
WORKDIR /app

# Clona el repositorio de tu proyecto de React Native
RUN git clone https://github.com/MICHELLCGs/tiktoc-reactnative.git

# Cambia al directorio del proyecto clonado
WORKDIR /app/tiktoc-reactnative

# Copia el archivo .env desde el host al contenedor
# Asegúrate de que el archivo .env exista en el mismo directorio que este Dockerfile
COPY .env ./

# Instala las dependencias del proyecto
RUN npm install

# Exponer el puerto necesario para React Native
EXPOSE 8081

# Comando por defecto para iniciar el servidor Metro
CMD ["npx", "react-native", "start"]
