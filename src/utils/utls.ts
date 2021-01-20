import { Project } from '../redux/types';

export function saveStoreToFile(projects: Project[]) {
  return window.api.saveStoreToFile(projects);
}

export function readStoreFile() {
  return window.api.readStoreFile();
}
