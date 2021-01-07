import React from 'react';
import {ChooseTaskContainer} from '../TaskSection/TaskSection.styled';

interface CoverSectionProps {

}

const CoverSection: React.FC<CoverSectionProps> = () => {
    return (
        <ChooseTaskContainer>
            Choose or create task
        </ChooseTaskContainer>
    );
}

export default CoverSection;