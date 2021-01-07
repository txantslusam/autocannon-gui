import React from 'react';
import clsx from 'clsx';
import {createStyles, makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuElement from "../MenuElement/MenuElement";
import {MemoryRouter as Router, Route, Switch,} from "react-router-dom";
import ResultsSection from "../ResultsSection/ResultsSection";
import TaskSection from "../TaskSection/TaskSection";
import CoverSection from "./CoverSection";
import styled from 'styled-components';
import {Button} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Modal from '../Modal/Modal';
import {useSelector} from "react-redux";

interface SidebarProps {
}

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flex: 1,
            height: '100%',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
    }),
);

const NewProjectButton = styled(Button)`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: #e0e0e0;
  width: 282px;
  :hover {
    background-color: #d4d4d4;
  };
  padding: 1rem;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: left;
`;

const SideBar: React.FC<SidebarProps> = ({ }) => {
    const classes = useStyles();
    const theme = useTheme();

    const { projects } = useSelector(state => state.project);

    const [open, setOpen] = React.useState(true);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root} style={{position: 'relative'}}>
            <Router>

            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                style={{zIndex: 2}}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Benchmark app
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List component="div" disablePadding>
                    {projects.map((project) => (
                            <>
                                <MenuElement key={project.id} name={project.name} id={project.id} tasks={project.tasks}/>
                                <Divider />
                            </>
                        ))}
                    <div style={{height: 64, width: '100%'}}/>
                </List>
                <NewProjectButton startIcon={<AddIcon/>} onClick={() => setIsModalOpen(true)}>New Project</NewProjectButton>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <Switch>
                    <Route path="/:projectId/results"  >
                        <ResultsSection />
                    </Route>
                    <Route path="/:projectId/:taskId">
                        <TaskSection />
                    </Route>
                    <Route exact path="/" >
                        <CoverSection />
                    </Route>
                </Switch>
            </main>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </Router>
        </div>
    );
}

export default SideBar;