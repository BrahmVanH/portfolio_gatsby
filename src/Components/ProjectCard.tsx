import * as React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  border-radius: 6px;
  width: 200px;
  height: 400px;
  background-color: black;
`
const ProjectCard: React.FC = () => {
  return (
    <Card>
      <p>
        Template text
      </p>
    </Card>
  )
}

export default ProjectCard;