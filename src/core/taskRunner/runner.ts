import autocannon from 'autocannon';
import { ipcMain, IpcMainInvokeEvent } from 'electron';
import { TaskRunnerParameters } from './types';
import { assignBody, assignHeaders, assignTestParams } from './utils';
import { taskProgressUpdateAction } from './action';

function getProgress(start: number, duration: number) {
  return ((new Date()).getTime() - start) / 1000 / duration;
}

export async function run(event: IpcMainInvokeEvent, { task }: TaskRunnerParameters) {
  return new Promise((resolve) => {
    const options: autocannon.Options = {
      method: task.method,
      url: task.url,
    };

    assignTestParams(task, options);
    assignHeaders(task, options);
    assignBody(task, options);

    const start = (new Date()).getTime();
    const instance = autocannon(options, (e, results) => {
      resolve(results);
    });

    instance.on('start', () => {
      event.sender.send(...taskProgressUpdateAction({
        task,
        progress: {
          isDone: false,
          progress: 0,
        },
      }));
    });

    instance.on('tick', () => {
      event.sender.send(...taskProgressUpdateAction({
        task,
        progress: {
          isDone: false,
          progress: getProgress(start, parseFloat(`${options.duration}`)),
        },
      }));
    });

    instance.on('done', () => {
      event.sender.send(...taskProgressUpdateAction({
        task,
        progress: {
          isDone: true,
        },
      }));
    });

    ipcMain.on('closed', () => {
      // @ts-ignore
      instance.stop();
    });
  });
}
