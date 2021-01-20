import {
  Action, Dispatch, Middleware, MiddlewareAPI,
} from 'redux';
import { editTaskInProject } from '../actions';

const createTaskObserverMiddleware: () => Middleware = () => ({ dispatch }: MiddlewareAPI) => {
  window.api.onTaskProgressUpdate((_, { task, progress }) => {
    console.log('New update');
    const currentTask = { ...task };
    currentTask.progress = progress;
    dispatch(editTaskInProject(task.projectId, currentTask));
  });

  return (next: Dispatch) => (action: Action) => {
    next(action);
  };
};

export default createTaskObserverMiddleware;
