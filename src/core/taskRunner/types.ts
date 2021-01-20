import { Task } from '../../redux/types';

export interface TaskRunnerParameters {
  projectId: string;
  task: Task;
}

export type RunTaskArgs = [TaskRunnerParameters];

export interface TestParams {
  duration: number;
  pipelining: number;
  connections: number;
  timeout: number;
}
