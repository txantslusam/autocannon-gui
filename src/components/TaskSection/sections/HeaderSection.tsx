import React from 'react';
import {SectionContainer} from "./Section.styled";
import Table from "../../Table/Table";

interface HeaderSectionProps {

}

const HeaderSection: React.FC<HeaderSectionProps> = () => {
    return (
        <SectionContainer>
            <Table data={[]}/>
        </SectionContainer>
    );
}

export default HeaderSection;