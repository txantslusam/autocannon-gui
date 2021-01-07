import React from 'react';
import {Button, createStyles, Fade, Modal as MuiModal, TextField, Typography} from '@material-ui/core';
import {makeStyles, Theme} from "@material-ui/core/styles";
import {ActionsContainer, ModalBody } from './Modal.styled';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none'
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            outline: 'none'
        },
    }),
);

const Modal: React.FC<ModalProps> = ({isOpen, onClose}) => {
    const classes = useStyles();
    return (
        <MuiModal
            open={isOpen}
            onClose={onClose}
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
                    <Typography style={{marginBottom: '1rem'}} variant="h5">Create new project</Typography>
                    <TextField style={{width: '100%'}} label="Name" />
                    <ActionsContainer>
                        <Button color="primary" style={{marginRight: '1rem'}}>CANCEL</Button>
                        <Button color="primary">SAVE</Button>
                    </ActionsContainer>
                </ModalBody>
            </Fade>
        </MuiModal>
    );
}

export default Modal;