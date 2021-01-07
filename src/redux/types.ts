export interface Result {
    average: number;
    stdev: number;
    max: number;
    label: string;
}

export interface Param {
    key: string;
    value: string | number;
}

export interface Task {
    id: string;
    name: string;
    header?: Param[];
    body?: JSON;
    params?: Param[];
    testParams?: Param[];
    results?: Result;
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

export type ProjectAction = SetProjectsAction | EditProjectAction | AddProjectAction | RemoveProjectAction;