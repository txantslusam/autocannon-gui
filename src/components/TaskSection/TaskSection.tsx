import React, {useMemo} from 'react';
import {InputAddress, MethodRequestContainer, SelectMethodRequest, TaskSectionContainer} from './TaskSection.styled';
import {AppBar, Box, Button, Card, IconButton, MenuItem, Tab, Tabs, TextField, Typography} from "@material-ui/core";
import ParamsSection from "./sections/ParamsSection";
import BodySection from "./sections/BodySection";
import HeaderSection from "./sections/HeaderSection";
import TestParams from "./sections/TestParams";
import ResultSection from "./sections/ResultSection";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from 'react-router-dom';
import * as projectActions from '../../redux/actions';
import {MoreHoriz} from "@material-ui/icons";
import Dropdown from "../Dropdown/Dropdown";

interface TaskSectionProps {

}

const currencies = [
    {
        value: 'GET',
        label: 'GET',
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
        value: 'DELETE',
        label: 'DELETE',
    },
];

const testParamsInitialData = [
    {
        key: 'connection',
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
    {
        key: '',
        value: '',
    }
]

interface TabPanelProps {
    children?: React.ReactNode;
    index: string;
    value: string;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

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
}




const TaskSection: React.FC<TaskSectionProps> = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [value, setValue] = React.useState('Params');
    const { projects } = useSelector(state => state.project);
    const { projectId, taskId } = useParams<{ projectId: string, taskId: string }>();

   const task = useMemo(() => {
        const currentProject = projects.find(project => project.id === projectId);
        if (!currentProject) {
            return undefined;
        }
        return currentProject.tasks.find(task => task.id === taskId);
    }, [projects, projectId, taskId]);

    const handleOnChangeName = (value: string) => {
        const currentTask = {...task};
        currentTask.name = value;
        dispatch(projectActions.editTaskInProject(projectId, currentTask));
    }

    const handleOnChangeMethod = (value: string) => {
        const currentTask = {...task};
        currentTask.method = value;
        dispatch(projectActions.editTaskInProject(projectId, currentTask));
    }

    const handleOnChangeUrl = (value: string) => {
        const currentTask = {...task};
        currentTask.url = value;
        dispatch(projectActions.editTaskInProject(projectId, currentTask));
    }

    if (!task) {
        return <>This task does not exists</>;
    }

    return (
        <TaskSectionContainer>
            <Dropdown
                projectId={projectId}
                onClickDelete={() => {dispatch(projectActions.removeTaskInProject(projectId, taskId)); history.push('/')}}
                taskId={taskId}
                activator={(
                <IconButton  style={{fontSize: '3rem', width: '3rem', position: 'absolute', top: '-20px', right: '8px', height: '2.5rem'}}>
                    <MoreHoriz style={{fontSize: '3rem', width: '3rem'}}/>
                </IconButton>
                )}
            />

            <TextField
                error={Boolean(!task.name)}
                placeholder="Enter name"
                onChange={event => handleOnChangeName(event.target.value)}
                value={task.name}
                inputProps={{style: {
                    fontSize: '2.5rem',
                }}}
                helperText={Boolean(!task.name) ? "Task name must have minimum 1 of length" : ''}
            />
            <MethodRequestContainer>
                <SelectMethodRequest
                    select
                    defaultValue={'GET'}
                    variant="outlined"
                    value={task.method}
                    onChange={event => handleOnChangeMethod(event.target.value)}
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </SelectMethodRequest>
                <InputAddress
                    variant="outlined"
                    defaultValue=""
                    value={task.url || ''}
                    onChange={event => handleOnChangeUrl(event.target.value)}
                />
                <Button onClick={() => console.log('start')} style={{marginLeft: '2rem', padding: '2px 16px'}}variant="contained" color="primary">Start</Button>
            </MethodRequestContainer>
            <AppBar position="static" style={{marginTop: '1rem', zIndex: 1}}>
                <Tabs value={value} onChange={(_, value) => setValue(value)} indicatorColor="secondary" >
                    <Tab label="Params" value="Params" />
                    <Tab label="Header" value="Header" />
                    <Tab label="Body" value="Body" />
                    <Tab label="Test params" value="Test params" />
                </Tabs>
            </AppBar>
            <Card style={{borderRadius: 0, padding: 0}}>
            <TabPanel value={value} index="Params">
                <ParamsSection task={task} projectId={projectId} />
            </TabPanel>
            <TabPanel value={value} index="Header">
                <HeaderSection task={task} projectId={projectId}/>
            </TabPanel>
            <TabPanel value={value} index="Body">
                <BodySection task={task} projectId={projectId}/>
            </TabPanel>
            <TabPanel value={value} index="Test params">
                <TestParams task={task} projectId={projectId}/>
            </TabPanel>
            </Card>
            {task.results && <ResultSection results={task.results}/>}
        </TaskSectionContainer>
    );
}

export default TaskSection;