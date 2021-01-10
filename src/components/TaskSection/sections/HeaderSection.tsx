import React, {useMemo} from 'react';
import {SectionContainer} from "./Section.styled";
import Table from "../../Table/Table";
import {useDispatch} from "react-redux";
import {Param, Task} from "../../../redux/types";
import * as projectActions from "../../../redux/actions";

interface HeaderSectionProps {
    task: Task;
    projectId: string;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ projectId, task}) => {
    const dispatch = useDispatch();

    const handleOnChangeHeader = (params: Param[]) => {
        const currentTask = {...task};
        currentTask.header = params;
        dispatch(projectActions.editTaskInProject(projectId, currentTask));
    }

    if (!task) {
        return <>Task not found</>
    }

    return (
        <SectionContainer>
            <Table
                data={task.header || []}
                onChange={handleOnChangeHeader}
            />
        </SectionContainer>
    );
}

export default HeaderSection;