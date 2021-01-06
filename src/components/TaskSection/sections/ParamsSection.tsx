import React from 'react';
import Table from "../../Table/Table";
import { SectionContainer } from './Section.styled';

interface ParamsSectionProps {

}

let data = [
    {
        key: 'Jill',
        value: 'Smith'

    },
    {
        key: '',
        value: ''
    },
];

const ParamsSection: React.FC<ParamsSectionProps> = () => {
    return (
        <SectionContainer>
            <Table data={data}/>
        </SectionContainer>
    );
}

export default ParamsSection;