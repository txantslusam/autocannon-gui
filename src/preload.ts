import {
  ipcRenderer, contextBridge, IpcRendererEvent,
} from 'electron';
import autocannon from 'autocannon';
import fs from 'fs';

import * as path from 'path';
import { TaskProgressActionPayload, TaskRunnerParameters } from './core/taskRunner/types';
import { Project } from './redux/types';
import { TASK_PROGRESS_UPDATE } from './core/taskRunner/action';

declare global {
  interface Window {
    api: {
      runTask: (arg: TaskRunnerParameters) => Promise<autocannon.Result>;
      readStoreFile: () => Project[];
      saveStoreToFile: (projects: Project[]) => void;
      onTaskProgressUpdate: (listener: (event: IpcRendererEvent, payload: TaskProgressActionPayload) => void) => void;
    }
  }
}

// const userDataPath = app.getPath('userData');
const storeFile = path.join('', 'store.json');

// Adds an object 'api' to the global window object:
contextBridge.exposeInMainWorld('api', {
  runTask: (arg: TaskRunnerParameters) => ipcRenderer.invoke('run-task', arg),

  readStoreFile: () => {
    if (fs.existsSync(storeFile)) {
      const dataFromFile: Project[] = JSON.parse(fs.readFileSync(storeFile).toString());
      return dataFromFile;
    }

    return [];
  },

  saveStoreToFile: (projects: Project[]) => {
    fs.writeFile(storeFile, JSON.stringify(projects), (err) => {
      if (err) {
        console.log(err);
      }
    });
  },

  onTaskProgressUpdate: (listener: (event: IpcRendererEvent, payload: TaskProgressActionPayload) => void) => {
    ipcRenderer.on(TASK_PROGRESS_UPDATE, listener);
  },
});
