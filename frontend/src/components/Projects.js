import React from 'react'


const ProjectItem = ({project, deleteProject}) => {
   return (
       <tr>
           <td>
                {project.title}
           </td>
           <td>
                {project.users.map((user) => `${user.username} `)}
           </td>
           <td>
                {project.repository_url}
           </td>
           <td><button type='button' onClick={() => deleteProject(project.id)}>Delete</button></td>
       </tr>
   )
}


const ProjectList = ({projects, deleteProject}) => {
   return (
       <table>
           <th>
               Project Title
           </th>
           <th>
               Users
           </th>
           <th>
               URL
           </th>
           {projects.map((project) => <ProjectItem project={project} deleteProject={(id) => deleteProject(id)}/>)}
       </table>
   )
}


export default ProjectList