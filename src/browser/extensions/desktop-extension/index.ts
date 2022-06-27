/*-----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/

import {
    ICommandPalette
} from '@jupyterlab/apputils';

import {
    IMainMenu
} from '@jupyterlab/mainmenu';

import { IStatusBar } from '@jupyterlab/statusbar';

import {
    JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
    ElectronJupyterLab
} from '../electron-extension';

import {
    asyncRemoteRenderer
} from '../../../asyncremote';

import { IAppRemoteInterface } from '../../../main/app';
import { ISessions } from "../../../main/sessions";


const desktopExtension: JupyterFrontEndPlugin<void> = {
    id: 'jupyterlab-desktop.extensions.desktop',
    requires: [ICommandPalette, IMainMenu, IStatusBar],
    activate: (app: ElectronJupyterLab, palette: ICommandPalette, menu: IMainMenu, statusBar: IStatusBar) => {

        asyncRemoteRenderer.onRemoteEvent(ISessions.navigatedToHash, (hash: string) => {
            console.debug(`Navigate to hash received, navigating to: ${hash}`)
            window.location.hash = hash;
        });

        app.commands.addCommand('open-dev-tools', {
            label: 'Open Developer Tools',
            execute: () => {
                asyncRemoteRenderer.runRemoteMethod(IAppRemoteInterface.openDevTools, void(0));
            }
        });

        menu.helpMenu.addGroup([
            { command: 'open-dev-tools' },
        ], 20);
    },
    autoStart: true
};


export default desktopExtension;
