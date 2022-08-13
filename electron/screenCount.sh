#!/bin/bash

#获取已经连接的屏幕数量
script='print(screenCount)'

export DBUS_SESSION_BUS_ADDRESS="unix:path=/run/user/1000/bus"
qdbus org.kde.plasmashell /PlasmaShell org.kde.PlasmaShell.evaluateScript "$script"
