import React from 'react';
import {SectionContainer} from "./Section.styled";
import Table from "../../Table/Table";
import {Param, Task} from "../../../redux/types";
import {useDispatch} from "react-redux";
import * as projectActions from "../../../redux/actions";

interface TestParamsProps {
    task: Task;
    projectId: string;
}

const initialTestParams: Param[] = [
    {
        key: 'duration',
        value: '100'
    },
    {
        key: 'pipelining',
        value: '1'
    },
    {
        key: 'duration',
        value: '30'
    },
]

const TestParams: React.FC<TestParamsProps> = ({ projectId, task }) => {
    const dispatch = useDispatch();

    const handleOnChangeTestParams = (params: Param[]) => {
        const currentTask = {...task};
        currentTask.testParams = params;
        dispatch(projectActions.editTaskInProject(projectId, currentTask));
    }

    if (!task) {
        return <>Task not found</>
    }

    return (
        <SectionContainer>
            <Table
                data={task.testParams || initialTestParams}
                onChange={handleOnChangeTestParams}
            />
        </SectionContainer>
    );
}

export default TestParams;