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

const items = [
    {
        id: '1',
        name: 'Task 1',
        projectId: '1',
    },
    {
        id: '2',
        name: 'Task 1',
        projectId: '2',
    },
]

interface MenuElementProps {
}

const iconStyle: CSSProperties = {
    color: colors.darkGrey02,
    marginRight: '0.75rem',
}

const actionIconsStyle: CSSProperties = {
    color: colors.darkGrey02,
    fontSize: '1.5rem',
}

const MenuElement: React.FC<MenuElementProps> = ({ }) => {
    const history = useHistory();
    const [open, setOpen] = React.useState(true);

    return (
        <div>
            <ProjectContainer>
                <StyledMenuItem button onClick={() => setOpen(!open)} disableGutters>
                    <LabelContainer>
                        {open ? <KeyboardArrowUpIcon style={iconStyle} /> : <KeyboardArrowDownIcon style={iconStyle} />}
                        <ListItemText  primary={"New project 1"} secondary={"4 Tasks"}/>
                    </LabelContainer>
                </StyledMenuItem>
                <ActionsContainer>
                    <StyledIconButton>
                        <AddIcon style={actionIconsStyle}/>
                    </StyledIconButton>
                    <StyledIconButton>
                        <MoreVertIcon style={actionIconsStyle}/>
                    </StyledIconButton>
                </ActionsContainer>
            </ProjectContainer>
            <Collapse in={open} timeout="auto" unmountOnExit style={{width: '100%'}}>
                <Divider />
                <TasksList disablePadding>
                    {items.map((item, index) => (
                        <StyledListItem button onClick={() => history.push(`/${item.projectId}/${item.id}`)}>
                            <StyledListItemText primary={item.name} />
                        </StyledListItem>
                    ))}
                    {items.length && (
                        <StyledListItem button onClick={() => history.push(`/${1}/results`)}>
                            <StyledListItemText primary="Results" />
                        </StyledListItem>
                    )}
                </TasksList>
            </Collapse>
        </div>
    );
}

export default MenuElement;