import autocannon from 'autocannon';
import { TestParams } from '../core/taskRunner/types';

export interface Values {
  average: number;
  stdev: number;
  max: number;
}

export interface Result {
  request: Values;
  bytes: Values;
  label: string;
}

export interface Param<T = Record<string, any>> {
  key: keyof T;
  value: T[keyof T];
}

export interface Task {
  id: string;
  name: string;
  method?: 'GET' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url?: string;
  header?: Param[];
  body?: any;
  params?: Param[];
  testParams?: Param<TestParams>[];
  results?: autocannon.Result;
}

export interface Project {
  id: string;
  name: string;
  tasks: Task[]
}

export interface ProjectState {
  projects: Project[];
}

export const SET_PROJECTS = 'SET_PROJECTS';
export const EDIT_PROJECT = 'EDIT_PROJECT';
export const ADD_PROJECT = 'ADD_PROJECT';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';
export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const EDIT_TASK = 'EDIT_TASK';

export interface SetProjectsAction {
  type: typeof SET_PROJECTS;
  payload: Project[];
}

export interface EditProjectAction {
  type: typeof EDIT_PROJECT;
  payload: Project;
}

export interface AddProjectAction {
  type: typeof ADD_PROJECT;
  payload: Project;
}

export interface RemoveProjectAction {
  type: typeof REMOVE_PROJECT;
  payload: string;
}

export interface AddTaskAction {
  type: typeof ADD_TASK;
  payload: string;
}

export interface RemoveTaskAction {
  type: typeof REMOVE_TASK;
  payload: {
    projectId: string;
    taskId: string;
  };
}

export interface EditTaskAction {
  type: typeof EDIT_TASK;
  payload: {
    projectId: string;
    task: Task;
  };
}

export type ProjectAction = SetProjectsAction | EditProjectAction | AddProjectAction | RemoveProjectAction | AddTaskAction | RemoveTaskAction | EditTaskAction;
