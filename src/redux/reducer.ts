import {Reducer} from "redux";
import {ADD_PROJECT, EDIT_PROJECT, ProjectAction, ProjectState, REMOVE_PROJECT, SET_PROJECTS} from "./types";
import initialState from "./state";

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
                projects: [...state.projects, action.payload]
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
            if (projectToRemoveIndex != -1) {
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
        default:
            return state;
    }
}

export default projectReducer;