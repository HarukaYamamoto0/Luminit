#!/bin/bash

if ! command -v xrandr &> /dev/null
then
    echo "O xrandr não está instalado. Instalando o pacote necessário..."
    if [ -f /etc/debian_version ]; then
        # Para distribuições baseadas em Debian/Ubuntu
        sudo apt update && sudo apt install -y x11-utils
    elif [ -f /etc/redhat-release ]; then
        # Para distribuições baseadas em Red Hat
        sudo yum install -y xrandr
    else
        echo "Distribuição não suportada diretamente. Instale o xrandr manualmente."
        exit 1
    fi
else
    echo "xrandr já está instalado."
fi
