import React, {useEffect} from "react";
import {DropdownAction, DropdownButton, DropdownContainer, Wrapper} from "./Dropdown.styled";
import {Typography} from "@material-ui/core";
import useOnClickOutside from "../../utils/hooks/useOnClickOutside";

interface Props {
    activator: React.ReactNode;
    taskId?: string;
    projectId?: string;
    onClickDelete?: () => void;
    onClickEditName?: () => void;
    fullWidth?: boolean;
}

const Dropdown: React.FC<Props> = ({ onClickDelete, onClickEditName, children, activator, taskId, projectId }) => {
    const dropdownWrapper = React.useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = React.useState(false);

    const handleActivatorClick = () => {
        setIsOpen(!isOpen);
    };

    useOnClickOutside(dropdownWrapper, () => setIsOpen(false));

    return (
        <Wrapper ref={dropdownWrapper} fullWidth>
            <DropdownButton type="button" onKeyDown={handleActivatorClick} onClick={handleActivatorClick}>
                {activator}
            </DropdownButton>
            <DropdownContainer isOpen={isOpen}>
                {taskId
                ? (<>
                        <DropdownAction onClick={() => onClickDelete()}>
                            <Typography>Delete</Typography>
                        </DropdownAction>
                    </>)
                : (<>
                        <DropdownAction onClick={() => onClickEditName()}>
                            <Typography>Edit name</Typography>
                        </DropdownAction>
                        <DropdownAction onClick={() => onClickDelete()}>
                            <Typography>Delete</Typography>
                        </DropdownAction>
                    </>)}
            </DropdownContainer>
        </Wrapper>
    );
};

export default Dropdown;
