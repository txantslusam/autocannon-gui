import React, {useEffect, useMemo, useState} from 'react';
import {MethodRequestContainer, TaskSectionContainer, InputAddress, SelectMethodRequest } from './TaskSection.styled';
import {AppBar, Box, Button, createStyles, MenuItem, TextField, withStyles} from "@material-ui/core";
import {Avatar, Card, CardContent, Tab, Tabs, Typography} from "@material-ui/core";
import ParamsSection from "./sections/ParamsSection";
import BodySection from "./sections/BodySection";
import HeaderSection from "./sections/HeaderSection";
import TestParams from "./sections/TestParams";
import ResultSection from "./sections/ResultSection";
import {useDispatch, useSelector} from "react-redux";
import { useParams } from 'react-router-dom';
import {Task} from "../../redux/types";
import * as projectActions from '../../redux/actions';

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

    const [value, setValue] = React.useState('Params');
    const { projects } = useSelector(state => state.project);
    const { projectId, taskId } = useParams<{ projectId: string, taskId: string }>();
    const [task, setTask] = useState<Task>();

    useEffect(() => {
        const currentProject = projects.find(project => project.id === projectId);
        if (!currentProject) {
            return undefined;
        }
        setTask(currentProject.tasks.find(task => task.id === taskId));
    }, [projectId, taskId]);

    const handleOnChange = (value: string) => {
        if (task) {
            const currentTask = {...task};
            currentTask.name = value;
            setTask(currentTask);
            dispatch(projectActions.editTaskInProject(projectId, currentTask));
        }
    }

    if (!task) {
        return <>This task does not exists</>;
    }

    return (
        <TaskSectionContainer>
            <TextField
                error={Boolean(!task.name)}
                placeholder="Enter name"
                onChange={event => handleOnChange(event.target.value)}
                value={task.name}
                inputProps={{style: {
                    fontSize: '2.5rem',
                }}}
                helperText={Boolean(!task.name) ? "Task name must have minimum 1 of length" : ''}
            />
            <MethodRequestContainer>
                <SelectMethodRequest
                    select
                    variant="outlined"
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </SelectMethodRequest>
                <InputAddress
                    variant="outlined"
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
                <ParamsSection />
            </TabPanel>
            <TabPanel value={value} index="Header">
                <HeaderSection />
            </TabPanel>
            <TabPanel value={value} index="Body">
                <BodySection />
            </TabPanel>
            <TabPanel value={value} index="Test params">
                <TestParams data={testParamsInitialData}/>
            </TabPanel>
            </Card>
            <ResultSection />
        </TaskSectionContainer>
    );
}

export default TaskSection;