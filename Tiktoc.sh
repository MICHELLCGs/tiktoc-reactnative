#!/bin/bash

# Nombre de la imagen y del contenedor
IMAGE_NAME="react-native-app"
CONTAINER_NAME="react-native-container"
PORT_MAPPING="8081:8081"  # Mapea el puerto 8081 del contenedor al puerto 8081 local

# Mensaje de bienvenida
echo "Bienvenido, preparando el entorno de React Native..."

# Pausa para confirmar
read -p "Presiona Enter para continuar..."

# Actualizar el sistema
echo "Actualizando el sistema..."
sudo apt update && sudo apt upgrade -y

# Instalar Docker y Docker Compose si no están instalados
echo "Instalando Docker y Docker Compose..."
sudo apt install -y docker.io docker-compose-v2

# Construye la imagen Docker
echo "Construyendo la imagen Docker..."
sudo docker build -t $IMAGE_NAME .

# Verifica si hay un contenedor en ejecución con el mismo nombre y lo detiene si es necesario
if [ "$(sudo docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "Deteniendo el contenedor en ejecución..."
    sudo docker stop $CONTAINER_NAME
fi

# Verifica si hay un contenedor detenido con el mismo nombre y lo elimina si es necesario
if [ "$(sudo docker ps -a -q -f name=$CONTAINER_NAME)" ]; then
    echo "Eliminando el contenedor detenido..."
    sudo docker rm $CONTAINER_NAME
fi

# Ejecuta el contenedor Docker
echo "Ejecutando el contenedor Docker..."
sudo docker run --rm --name $CONTAINER_NAME -p $PORT_MAPPING -v $(pwd):/app $IMAGE_NAME

echo "El contenedor de React Native está corriendo. Puedes abrir tu aplicación en http://localhost:8081"
