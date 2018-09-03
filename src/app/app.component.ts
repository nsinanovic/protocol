import { Component } from '@angular/core';
import * as fs from 'fs';
import * as path from 'path';

import { Settings } from './model/settings';
import { TheDb } from './model/thedb';

// tslint:disable-next-line:no-implicit-dependencies
import { remote, OpenDialogOptions } from 'electron';


// Importing style.scss allows webpack to bundle stylesheet with application
import '../assets/sass/style.scss';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
})
export class AppComponent {
    public connected: boolean;

    constructor() {
        this.connected = false;
        Settings.initialize();

        if (fs.existsSync(Settings.dbPath)) {
            this.openDb(Settings.dbPath);
        } else if (Settings.hasFixedDbLocation) {
            this.createDb(Settings.dbPath);
        } else {
            this.createDb();
        }
    }
    public openDb(filename: string) {
        TheDb.openDb(filename)
            .then(() => {
                if (!Settings.hasFixedDbLocation) {
                    Settings.dbPath = filename;
                    Settings.write();
                }
            })
            .then(() => {
                this.connected = true;
            })
            .catch((reason) => {
                // Handle errors
                console.log('Error occurred while opening database: ', reason);
            });
    }

    public createDb(filename?: string) {
        if (!filename) {
            const options: OpenDialogOptions = {
                title: 'Create file',
                defaultPath: remote.app.getPath('documents'),
                filters: [
                    {
                        name: 'Database',
                        extensions: ['db'],
                    },
                ],
            };
            filename = remote.dialog.showSaveDialog(remote.getCurrentWindow(), options);
        }

        if (!filename) {
            return;
        }

        TheDb.createDb(filename)
            .then((dbPath) => {
                if (!Settings.hasFixedDbLocation) {
                    Settings.dbPath = dbPath;
                    Settings.write();
                }
            })
            .then(() => {
                this.connected = true;
            })
            .catch((reason) => {
                console.log(reason);
            });
    }

    public onRestoreDb() {
        TheDb.importJson(path.join(Settings.dbFolder, 'database.init.json'), false)
            .then(() => {
                
            });
    }

}
