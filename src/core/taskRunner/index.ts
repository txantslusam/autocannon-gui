import { ipcMain } from 'electron';
import { run } from './runner';
import { TaskRunnerParameters } from './types';

ipcMain.handle('run-task', async (event, runParameters: TaskRunnerParameters) => run(runParameters));
