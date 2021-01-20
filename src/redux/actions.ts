import { v4 as uuid } from 'uuid';
import {
  ADD_PROJECT,
  ADD_TASK,
  AddProjectAction,
  AddTaskAction,
  EDIT_PROJECT,
  EDIT_TASK,
  EditProjectAction,
  EditTaskAction,
  Project,
  REMOVE_PROJECT,
  REMOVE_TASK,
  RemoveProjectAction,
  RemoveTaskAction,
  SET_PROJECTS,
  SetProjectsAction,
  Task,
} from './types';

export const setProjects = (projects: Project[]): SetProjectsAction => ({
  type: SET_PROJECTS,
  payload: projects,
});

export const addProject = (name: string): AddProjectAction => {
  const newProject: Project = {
    id: uuid(),
    name,
    tasks: [],
  };
  return {
    type: ADD_PROJECT,
    payload: newProject,
  };
};

export const editProject = (project: Project): EditProjectAction => ({
  type: EDIT_PROJECT,
  payload: project,
});

export const removeProject = (projectId: string): RemoveProjectAction => ({
  type: REMOVE_PROJECT,
  payload: projectId,
});

export const addTaskToProject = (projectId: string): AddTaskAction => ({
  type: ADD_TASK,
  payload: projectId,
});

export const editTaskInProject = (projectId: string, task: Task): EditTaskAction => ({
  type: EDIT_TASK,
  payload: {
    projectId,
    task,
  },
});

export const removeTaskInProject = (projectId: string, taskId: string): RemoveTaskAction => ({
  type: REMOVE_TASK,
  payload: {
    projectId,
    taskId,
  },
});
