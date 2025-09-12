import React from 'react';
import ProjectHeader from '../layouts/components/Projects/ProjectHeader';
import ProjectSearch from '../layouts/components/Projects/ProjectSearch';
import ProjectRender from '../layouts/components/Projects/ProjectRender';

const Projects: React.FC = () => {
  return (
    <>
      <ProjectHeader/>
      <ProjectSearch/>
      <ProjectRender/>
    </>
  );
};

export default Projects;
