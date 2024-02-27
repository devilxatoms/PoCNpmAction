#!/bin/bash

# Nombre del archivo que contiene la versión
ENV_FILE="./.env"

# Verificar si el archivo de versión existe
if [ -f "$ENV_FILE" ]; then
    # Cargar las variables de entorno desde el archivo
    . "$ENV_FILE"
else
    # Si el archivo no existe, establecer la versión inicial como 1.0
    export SCRIPT_VERSION=1.0
fi

# Debug: Imprimir la versión antes de incrementar
echo "Antes de incrementar: SCRIPT_VERSION=$SCRIPT_VERSION"

# Incrementar la versión
export SCRIPT_VERSION=$(echo "$SCRIPT_VERSION + 0.1" | bc)

# Debug: Imprimir la versión después de incrementar
echo "Después de incrementar: SCRIPT_VERSION=$SCRIPT_VERSION"

# Guardar la versión en el archivo .env
echo "SCRIPT_VERSION=$SCRIPT_VERSION" > "$ENV_FILE"

# Debug: Imprimir mensaje de confirmación
echo "Versión guardada en el archivo .env"

# Instalar dependencias y compilar el script
echo "Instalando dependencias..."
npm install
echo "Compilando el script..."
ncc build index.js --license licenses.txt

# Añadir todos los cambios al repositorio
echo "Añadiendo cambios al repositorio..."
git add .

# Realizar un commit con el número de versión actualizado
echo "Realizando commit con la versión actualizada: $SCRIPT_VERSION"
git commit -m "Actualización de la versión a $SCRIPT_VERSION"
git tag -a "v$SCRIPT_VERSION" -m "Versión $SCRIPT_VERSION"
git push --follow-tags

