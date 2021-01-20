import React, { useEffect, useState } from 'react';
import {
  Button, createStyles, Fade, Modal as MuiModal, TextField, Typography,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { ActionsContainer, ModalBody } from './Modal.styled';
import * as projectActions from '../../redux/actions';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId?: string;
  initialProjectName?: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
  },
}));

const Modal: React.FC<ModalProps> = ({
  isOpen, onClose, initialProjectName, projectId,
}) => {
  const classes = useStyles();

  const { projects } = useSelector(state => state.project);

  const [projectName, setProjectName] = useState<string>(initialProjectName || '');
  const [error, setError] = useState<string>('');
  useEffect(() => {
    setProjectName(initialProjectName);
  }, [initialProjectName]);

  const dispatch = useDispatch();

  const handleOnChange = (value: string) => {
    setProjectName(value);
    if (!value) {
      setError('Project must have a minimum length of 1');
      return;
    }
    setError('');
  };

  const handleOnClose = () => {
    setProjectName('');
    setError('');
    onClose();
  };

  const handleOnSave = () => {
    if (!projectName) {
      setError('Project must have a minimum length of 1');
      return;
    }

    const foundProject = projects.find(project => project.name === projectName.trim());
    if (foundProject) {
      setError(`Project with name ${projectName.trim()} already exists`);
      return;
    }
    const currentProject = projects.find(project => project.id === projectId);
    if (currentProject) {
      currentProject.name = projectName;
      dispatch(projectActions.editProject(currentProject));
      handleOnClose();

      return;
    }

    dispatch(projectActions.addProject(projectName.trim()));
    handleOnClose();
  };

  return (
    <MuiModal
      open={isOpen}
      onClose={handleOnClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      title="Create new project"
      className={classes.modal}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <ModalBody className={classes.paper}>
          <Typography style={{ marginBottom: '1rem' }} variant="h5">{initialProjectName ? 'Edit project name' : 'Create new project'}</Typography>
          <TextField
            error={Boolean(error)}
            onChange={event => handleOnChange(event.target.value)}
            style={{ width: '100%' }}
            label="Name"
            helperText={error}
            autoFocus
            value={projectName}
          />
          <ActionsContainer>
            <Button color="primary" style={{ marginRight: '1rem' }} onClick={handleOnClose}>CANCEL</Button>
            <Button type="submit" color="primary" onClick={handleOnSave}>SAVE</Button>
          </ActionsContainer>
        </ModalBody>
      </Fade>
    </MuiModal>
  );
};

export default Modal;
