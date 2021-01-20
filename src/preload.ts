import { ipcRenderer, contextBridge } from 'electron';
import autocannon from 'autocannon';
import fs from 'fs';
import { TaskRunnerParameters } from './core/taskRunner/types';
import { Project } from './redux/types';

declare global {
  interface Window {
    api: {
      runTask: (arg: TaskRunnerParameters) => Promise<autocannon.Result>;
      readStoreFile: () => Project[];
      saveStoreToFile: (projects: Project[]) => void;
    }
  }
}

// Adds an object 'api' to the global window object:
contextBridge.exposeInMainWorld('api', {
  runTask: (arg: TaskRunnerParameters) => ipcRenderer.invoke('run-task', arg),

  readStoreFile: () => {
    if (fs.existsSync('store.json')) {
      const dataFromFile: Project[] = JSON.parse(fs.readFileSync('store.json').toString());
      return dataFromFile;
    }

    return [];
  },

  saveStoreToFile: (projects: Project[]) => {
    fs.writeFile('store.json', JSON.stringify(projects), (err) => {
      if (err) {
        console.log(err);
      }
    });
  },
});
