import React, { CSSProperties, useMemo, useState } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import { Collapse } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ActionsContainer,
  LabelContainer,
  ProjectContainer,
  StyledIconButton,
  StyledListItem,
  StyledListItemText,
  StyledMenuItem,
  TasksList,
} from './MenuElement.styled';
import colors from '../../utils/styles/colors';
import { Task } from '../../redux/types';
import * as projectActions from '../../redux/actions';
import Dropdown from '../Dropdown/Dropdown';
import Modal from '../Modal/Modal';

interface MenuElementProps {
  id: string;
  name: string;
  tasks: Task[];
  currentSelection: string;
  onClick: (id: string) => void;
}

const iconStyle: CSSProperties = {
  color: colors.darkGrey02,
  marginRight: '0.75rem',
};

const actionIconsStyle: CSSProperties = {
  color: colors.darkGrey02,
  fontSize: '1.5rem',
};

const MenuElement: React.FC<MenuElementProps> = ({
  name, id, tasks, currentSelection, onClick,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { projects } = useSelector(state => state.project);

  const handleOnAdd = () => {
    dispatch(projectActions.addTaskToProject(id));
  };

  const handleOnClickMenuElement = (taskId: string) => {
    if (currentSelection !== taskId) {
      onClick(taskId);
      history.push(`/${id}/${taskId}`);
    }
  };

  const handleOnClickResultsElement = (projectId: string) => {
    if (currentSelection !== projectId) {
      onClick(projectId);
      history.push(`/${id}/results`);
    }
  };

  const selectedIdCloseProject = useMemo(() => {
    if (open) {
      return '';
    }
    if (currentSelection === id) {
      return id;
    }
    const selectedProject = projects.find(project => project.id === id);

    if (!selectedProject) {
      return '';
    }

    if (selectedProject.tasks.some(task => task.id === currentSelection)) {
      return id;
    }
  }, [currentSelection, projects, id, open]);

  return (
    <div>
      <ProjectContainer>
        <StyledMenuItem
          isSelected={selectedIdCloseProject === id}
          button
          onClick={() => setOpen(!open)}
          disableGutters
        >
          <LabelContainer>
            {open ? <KeyboardArrowUpIcon style={iconStyle} />
              : <KeyboardArrowDownIcon style={iconStyle} />}
            <ListItemText primary={name} secondary={`${tasks.length} Tasks`} />
          </LabelContainer>
        </StyledMenuItem>
        <ActionsContainer>
          <StyledIconButton
            fullWidth
            onClick={handleOnAdd}
            isSelected={selectedIdCloseProject === id}
            borderBottom
          >
            <AddIcon style={actionIconsStyle} />
          </StyledIconButton>
          <Dropdown
            fullWidth
            projectId={id}
            onClickEditName={() => setIsModalOpen(true)}
            onClickDelete={() => dispatch(projectActions.removeProject(id))}
            activator={(
              <StyledIconButton fullWidth isSelected={selectedIdCloseProject === id}>
                <MoreVertIcon style={actionIconsStyle} />
              </StyledIconButton>
            )}
          />
        </ActionsContainer>
      </ProjectContainer>
      <Collapse in={open} timeout="auto" unmountOnExit style={{ width: '100%' }}>
        <Divider />
        <TasksList disablePadding>
          {tasks.map(task => (
            <StyledListItem
              isSelected={task.id === currentSelection}
              button
              onClick={() => handleOnClickMenuElement(task.id)}
            >
              <StyledListItemText primary={task.name} />
            </StyledListItem>
          ))}
          {tasks.length
            ? (
              <StyledListItem
                isSelected={id === currentSelection}
                button
                onClick={() => handleOnClickResultsElement(id)}
              >
                <StyledListItemText primary="Results" />
              </StyledListItem>
            ) : null}
        </TasksList>
      </Collapse>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialProjectName={name}
          projectId={id}
        />
      )}
    </div>
  );
};

export default MenuElement;
