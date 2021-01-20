import {Task} from "../../redux/types";
import autocannon from "autocannon";
import {TestParams} from "./types";

export function assignTestParams(task: Task, options: autocannon.Options) {
    const defaultOptions = {
        duration: 10,
        connections: 10,
        pipelining: 1,
        timeout: 10,
    };

    const taskOptions = task.testParams.reduce<TestParams>((params, param) => {
        params[param.key] = param.value;
        return params;
    }, {} as any);

    Object.assign(options, defaultOptions, taskOptions);
}