#!/bin/bash

declare app_prefix="/opt/JupyterLab"
declare env_installer="${app_prefix}/resources/env_installer"
declare conda_prefix="${app_prefix}/resources/jlab_server"

rm -rf "${conda_prefix}"
rm -fr "${env_installer}"
