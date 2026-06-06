#!/bin/bash

CONTAINER="moveit-keycloak-1"
EXPORT_DIR="/opt/keycloak/data/export"
EXPORT_FILE="MoveIT.json"
LOCAL_DIR="./docker"

echo "Exporting Keycloak realm..."

docker exec "$CONTAINER" /opt/keycloak/bin/kc.sh export \
  --file "$EXPORT_DIR/$EXPORT_FILE"

if [ $? -ne 0 ]; then
  echo "Export failed."
  exit 1
fi

echo "Copying export file to host..."

docker cp \
  "$CONTAINER:$EXPORT_DIR/$EXPORT_FILE" \
  "$LOCAL_DIR/$EXPORT_FILE"

if [ $? -ne 0 ]; then
  echo "Failed to copy export file."
  exit 1
fi

echo "Export completed:"
echo "$LOCAL_DIR/$EXPORT_FILE"
