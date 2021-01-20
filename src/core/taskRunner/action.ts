import { TaskProgressActionPayload } from './types';

export const TASK_PROGRESS_UPDATE = 'TASK_PROGRESS_UPDATE';

export function taskProgressUpdateAction(actionPayload: TaskProgressActionPayload): [string, TaskProgressActionPayload] {
  return [
    TASK_PROGRESS_UPDATE,
    actionPayload,
  ];
}
