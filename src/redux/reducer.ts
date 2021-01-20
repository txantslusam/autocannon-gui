import { Reducer } from 'redux';
import { v4 as uuid } from 'uuid';
import {
  ADD_PROJECT,
  ADD_TASK,
  EDIT_PROJECT,
  EDIT_TASK,
  ProjectAction,
  ProjectState,
  REMOVE_PROJECT,
  REMOVE_TASK,
  SET_PROJECTS,
  Task,
} from './types';
import initialState from './state';

const projectReducer: Reducer<ProjectState, ProjectAction> = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };

    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };

    case EDIT_PROJECT: {
      const editedProjectIndex = state.projects.findIndex(project => project.id === action.payload.id);
      if (editedProjectIndex != -1) {
        const currentProjects = [...state.projects];
        currentProjects[editedProjectIndex] = action.payload;
        return {
          ...state,
          projects: currentProjects,
        };
      }
      return {
        ...state,
      };
    }

    case REMOVE_PROJECT: {
      const projectToRemoveIndex = state.projects.findIndex(project => project.id === action.payload);
      if (projectToRemoveIndex !== -1) {
        const currentProjects = [...state.projects];
        currentProjects.splice(projectToRemoveIndex, 1);
        return {
          ...state,
          projects: currentProjects,
        };
      }
      return {
        ...state,
      };
    }

    case ADD_TASK: {
      const projectToAddTaskIndex = state.projects.findIndex(project => project.id === action.payload);
      if (projectToAddTaskIndex !== -1) {
        const currentProjects = [...state.projects];
        const newTask: Task = {
          id: uuid(),
          name: `New task ${currentProjects[projectToAddTaskIndex].tasks.length + 1}`,
          method: 'GET',
        };
        currentProjects[projectToAddTaskIndex].tasks = [...currentProjects[projectToAddTaskIndex].tasks, newTask];
        return {
          ...state,
          projects: currentProjects,
        };
      }
      return {
        ...state,
      };
    }

    case REMOVE_TASK: {
      const projectToRemoveTaskIndex = state.projects.findIndex(project => project.id === action.payload.projectId);
      if (projectToRemoveTaskIndex === -1) {
        return {
          ...state,
        };
      }

      const taskToRemoveIndex = state.projects[projectToRemoveTaskIndex].tasks.findIndex(task => task.id === action.payload.taskId);
      if (taskToRemoveIndex === -1) {
        return {
          ...state,
        };
      }

      const currentProjects = [...state.projects];
      currentProjects[projectToRemoveTaskIndex].tasks.splice(taskToRemoveIndex, 1);

      return {
        ...state,
        projects: currentProjects,
      };
    }

    case EDIT_TASK: {
      const projectToEditTaskIndex = state.projects.findIndex(project => project.id === action.payload.projectId);
      if (projectToEditTaskIndex === -1) {
        return {
          ...state,
        };
      }

      const taskToEditIndex = state.projects[projectToEditTaskIndex].tasks.findIndex(task => task.id === action.payload.task.id);
      if (taskToEditIndex === -1) {
        return {
          ...state,
        };
      }
      const currentProjects = [...state.projects];
      currentProjects[projectToEditTaskIndex].tasks[taskToEditIndex] = action.payload.task;

      return {
        ...state,
        projects: currentProjects,
      };
    }

    default:
      return state;
  }
};

export default projectReducer;
