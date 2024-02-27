#!/bin/bash

# Nombre del archivo que contiene la versión
ENV_FILE=".env"

# Verificar si el archivo de versión existe
if [ -f "$ENV_FILE" ]; then
    # Leer la versión actual desde el archivo
    source "$ENV_FILE"
else
    # Si el archivo no existe, establecer la versión inicial
    SCRIPT_VERSION=1.0
fi

# Incrementar la versión
SCRIPT_VERSION=$(echo "$SCRIPT_VERSION + 0.1" | bc)

# Guardar la nueva versión en el archivo .env
echo "SCRIPT_VERSION=$SCRIPT_VERSION" > "$ENV_FILE"

# Instalar dependencias y compilar el script
npm install && ncc build index.js --license licenses.txt

# Añadir todos los cambios al repositorio
git add .

# Realizar un commit con el número de versión actualizado
git commit -m "update action with script version: $SCRIPT_VERSION"
