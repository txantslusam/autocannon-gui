import React from 'react';
import { useDispatch } from 'react-redux';
import Table from '../../Table/Table';
import { SectionContainer } from './Section.styled';
import { Param, Task } from '../../../redux/types';
import * as projectActions from '../../../redux/actions';

interface ParamsSectionProps {
  projectId: string;
  task: Task;
}

const ParamsSection: React.FC<ParamsSectionProps> = ({ task, projectId }) => {
  const dispatch = useDispatch();

  const handleOnChangeParams = (params: Param[]) => {
    const currentTask = { ...task };
    currentTask.params = params;
    dispatch(projectActions.editTaskInProject(projectId, currentTask));
  };

  if (!task) {
    return <>Task not found</>;
  }

  return (
    <SectionContainer>
      <Table
        data={task.params || []}
        onChange={handleOnChangeParams}
      />
    </SectionContainer>
  );
};

export default ParamsSection;
