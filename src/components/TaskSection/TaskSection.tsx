import React, { useMemo } from 'react';
import {
  AppBar, Box, Button, Card, IconButton, MenuItem, Tab, Tabs, TextField, Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { MoreHoriz } from '@material-ui/icons';
import {
  InputAddress, MethodRequestContainer, SelectMethodRequest, TaskSectionContainer,
} from './TaskSection.styled';
import ParamsSection from './sections/ParamsSection';
import BodySection from './sections/BodySection';
import HeaderSection from './sections/HeaderSection';
import TestParams from './sections/TestParams';
import ResultSection from './sections/ResultSection';
import * as projectActions from '../../redux/actions';
import Dropdown from '../Dropdown/Dropdown';
import { Task } from '../../redux/types';

const methods = [
  {
    value: 'GET',
    label: 'GET',
  },
  {
    value: 'OPTIONS',
    label: 'OPTIONS',
  },
  {
    value: 'POST',
    label: 'POST',
  },
  {
    value: 'PUT',
    label: 'PUT',
  },
  {
    value: 'PATCH',
    label: 'PATCH',
  },
  {
    value: 'DELETE',
    label: 'DELETE',
  },
];

interface TabPanelProps {
  index: string;
  value: string;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const TaskSection: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedTab, setSelectedTab] = React.useState('Test params');
  const { projects } = useSelector(state => state.project);
  const { projectId, taskId } = useParams<{ projectId: string, taskId: string }>();

  const task = useMemo(() => {
    const currentProject = projects.find(project => project.id === projectId);
    if (!currentProject) {
      return undefined;
    }
    return currentProject.tasks.find(savedTask => savedTask.id === taskId);
  }, [projects, projectId, taskId]);

  const handleOnChange = (key: keyof Task, value: any) => {
    const currentTask = { ...task };
    currentTask[key] = value;
    dispatch(projectActions.editTaskInProject(projectId, currentTask));
  };

  const handleOnStart = async () => {
    const currentTask = { ...task };
    currentTask.results = await window.api.runTask({ projectId, task });
    dispatch(projectActions.editTaskInProject(projectId, currentTask));
  };

  if (!task) {
    return <>This task does not exists</>;
  }

  return (
    <TaskSectionContainer>
      <Dropdown
        projectId={projectId}
        onClickDelete={() => { dispatch(projectActions.removeTaskInProject(projectId, taskId)); history.push('/'); }}
        taskId={taskId}
        activator={(
          <IconButton style={{
            fontSize: '3rem', width: '3rem', position: 'absolute', top: '-20px', right: '8px', height: '2.5rem',
          }}
          >
            <MoreHoriz style={{ fontSize: '3rem', width: '3rem' }} />
          </IconButton>
                )}
      />

      <TextField
        error={Boolean(!task.name)}
        placeholder="Enter name"
        onChange={event => handleOnChange('name', event.target.value)}
        value={task.name}
        inputProps={{
          style: {
            fontSize: '2.5rem',
          },
        }}
        helperText={!task.name ? 'Task name must have minimum 1 of length' : ''}
      />
      <MethodRequestContainer>
        <SelectMethodRequest
          select
          defaultValue="GET"
          variant="outlined"
          value={task.method}
          onChange={event => handleOnChange('method', event.target.value)}
        >
          {methods.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectMethodRequest>
        <InputAddress
          variant="outlined"
          defaultValue=""
          value={task.url || ''}
          onChange={event => handleOnChange('url', event.target.value)}
        />
        <Button onClick={handleOnStart} style={{ marginLeft: '2rem', padding: '2px 16px' }} variant="contained" color="primary">Start</Button>
      </MethodRequestContainer>
      <AppBar position="static" style={{ marginTop: '1rem', zIndex: 1 }}>
        <Tabs value={selectedTab} onChange={(_, value) => setSelectedTab(value)} indicatorColor="secondary">
          <Tab label="Test params" value="Test params" />
          <Tab label="Params" value="Params" />
          <Tab label="Headers" value="Headers" />
          <Tab label="Body" value="Body" />
        </Tabs>
      </AppBar>
      <Card style={{ borderRadius: 0, padding: 0 }}>
        <TabPanel value={selectedTab} index="Test params">
          <TestParams task={task} projectId={projectId} />
        </TabPanel>
        <TabPanel value={selectedTab} index="Params">
          <ParamsSection task={task} projectId={projectId} />
        </TabPanel>
        <TabPanel value={selectedTab} index="Headers">
          <HeaderSection task={task} projectId={projectId} />
        </TabPanel>
        <TabPanel value={selectedTab} index="Body">
          <BodySection task={task} projectId={projectId} />
        </TabPanel>
      </Card>
      {task.results && <ResultSection results={task.results} />}
    </TaskSectionContainer>
  );
};

export default TaskSection;
