import React from 'react';
import { useDispatch } from 'react-redux';
import { SectionContainer } from './Section.styled';
import Table from '../../Table/Table';
import { Param, Task } from '../../../redux/types';
import * as projectActions from '../../../redux/actions';
import { TestParams } from '../../../core/taskRunner/types';

interface TestParamsProps {
  task: Task;
  projectId: string;
}

const initialTestParams: Param<TestParams>[] = [
  {
    key: 'duration',
    value: 10,
  },
  {
    key: 'connections',
    value: 100,
  },
  {
    key: 'pipelining',
    value: 1,
  },
  {
    key: 'timeout',
    value: 10,
  },
];

const TestParamsSection: React.FC<TestParamsProps> = ({ projectId, task }) => {
  const dispatch = useDispatch();

  const handleOnChangeTestParams = (params: Param<TestParams>[]) => {
    const currentTask = { ...task };
    currentTask.testParams = params;
    dispatch(projectActions.editTaskInProject(projectId, currentTask));
  };

  if (!task) {
    return <>Task not found</>;
  }

  return (
    <SectionContainer>
      <Table<TestParams>
        data={task.testParams || initialTestParams}
        onChange={handleOnChangeTestParams}
      />
    </SectionContainer>
  );
};

export default TestParamsSection;
