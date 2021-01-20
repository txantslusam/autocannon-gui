import autocannon from 'autocannon';
import { Task } from '../../redux/types';
import { TestParams } from './types';

export function assignTestParams(task: Task, options: autocannon.Options) {
  const defaultOptions = {
    duration: 10,
    connections: 10,
    pipelining: 1,
    timeout: 10,
  };

  const taskOptions = task.testParams?.reduce<TestParams>((params, param) => {
    params[param.key] = param.value;
    return params;
  }, {} as any) ?? {};

  Object.assign(options, defaultOptions, taskOptions);
}

export function assignHeaders(task: Task, options: autocannon.Options) {
  const headers = task.header?.reduce<Record<string, string>>((newHeaders, header) => {
    newHeaders[header.key] = header.value as string;
    return newHeaders;
  }, {});

  options.headers = headers;
}

export function assignBody(task: Task, options: autocannon.Options) {
  const { body } = task;

  if (body) {
    options.body = JSON.stringify(body);
    if (options.headers) {
      options.headers['Content-Type'] = 'application/json';
    } else {
      options.headers = {
        'Content-Type': 'application/json',
      };
    }
  }
}
