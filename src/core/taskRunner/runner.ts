import autocannon from "autocannon";
import {TaskRunnerParameters} from "./types";
import {assignTestParams} from "./utils";

export async function run({ task }: TaskRunnerParameters) {
    console.log('start runner')
    const options: autocannon.Options = {
        method: task.method,
        url: task.url,
    };

    assignTestParams(task, options);

    return await autocannon(options);
}