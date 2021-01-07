import React, {CSSProperties} from 'react';
import ListItemText from "@material-ui/core/ListItemText";
import {Collapse} from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Divider from "@material-ui/core/Divider";
import {
    ActionsContainer,
    LabelContainer,
    ProjectContainer,
    StyledIconButton,
    StyledListItem,
    StyledListItemText,
    StyledMenuItem,
    TasksList
} from './MenuElement.styled';
import colors from "../../utils/styles/colors";
import {useHistory} from "react-router-dom";
import {Task} from "../../redux/types";
import * as projectActions from '../../redux/actions';
import {useDispatch} from "react-redux";

interface MenuElementProps {
    id: string;
    name: string;
    tasks: Task[];
}

const iconStyle: CSSProperties = {
    color: colors.darkGrey02,
    marginRight: '0.75rem',
}

const actionIconsStyle: CSSProperties = {
    color: colors.darkGrey02,
    fontSize: '1.5rem',
}

const MenuElement: React.FC<MenuElementProps> = ({ name, id, tasks}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(true);

    const handleOnAdd = () => {
        dispatch(projectActions.addTaskToProject(id));
    }

    return (
        <div>
            <ProjectContainer>
                <StyledMenuItem button onClick={() => setOpen(!open)} disableGutters>
                    <LabelContainer>
                        {open ? <KeyboardArrowUpIcon style={iconStyle} /> : <KeyboardArrowDownIcon style={iconStyle} />}
                        <ListItemText  primary={name} secondary={`${tasks.length} Tasks`}/>
                    </LabelContainer>
                </StyledMenuItem>
                <ActionsContainer>
                    <StyledIconButton onClick={() => handleOnAdd()}>
                        <AddIcon style={actionIconsStyle} />
                    </StyledIconButton>
                    <StyledIconButton>
                        <MoreVertIcon style={actionIconsStyle}/>
                    </StyledIconButton>
                </ActionsContainer>
            </ProjectContainer>
            <Collapse in={open} timeout="auto" unmountOnExit style={{width: '100%'}}>
                <Divider />
                <TasksList disablePadding>
                    {tasks.map((task, index) => (
                        <StyledListItem button onClick={() => history.push(`/${id}/${task.id}`)}>
                            <StyledListItemText primary={task.name} />
                        </StyledListItem>
                    ))}
                    {tasks.length
                     ? (
                        <StyledListItem button onClick={() => history.push(`/${id}/results`)}>
                            <StyledListItemText primary="Results" />
                        </StyledListItem>
                    ) : null}
                </TasksList>
            </Collapse>
        </div>
    );
}

export default MenuElement;