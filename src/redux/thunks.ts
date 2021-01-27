import { AppThunk } from './store.types';
import { Task } from './types';
import { editTaskInProject } from './actions';

export const cancelInProgressTasks = (): AppThunk => (dispatch, getState) => {
  const state = getState();
  const tasksInProgress = state.project.projects.reduce<Task[]>((tasks, currentProject) => {
    currentProject.tasks.forEach((task) => {
      if (task.progress?.progress) {
        tasks.push(task);
      }
    });
    return tasks;
  }, []);

  tasksInProgress.forEach((task) => {
    dispatch(editTaskInProject(task.projectId, {
      ...task,
      progress: null,
    }));
  });
};
