#!/bin/bash

declare arch=$(uname -m)
declare conda_mirror="https://repo.anaconda.com/miniconda"
declare conda_script="Miniconda3-py39_4.11.0-Linux-${arch}.sh"

declare app_prefix="/opt/JupyterLab"
declare env_installer="${app_prefix}/resources/env_installer"
declare conda_prefix="${app_prefix}/resources/jlab_server"

/usr/bin/curl -L "${conda_mirror}/${conda_script}" --output "${env_installer}/${conda_script}"

/bin/bash "${env_installer}/${conda_script}" -b -p "${conda_prefix}"
"${conda_prefix}/bin/conda" install --name base --yes "jupyterlab==3.2.9"

/bin/ln -s "${app_prefix}/resources/app/jlab" /usr/bin/jlab
/bin/chmod 755 "${app_prefix}/resources/app/jlab"

exit 0
