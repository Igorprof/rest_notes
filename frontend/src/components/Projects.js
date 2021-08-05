import React from 'react'


const ProjectItem = ({project}) => {
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
       </tr>
   )
}


const ProjectList = ({projects}) => {
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
           {projects.map((project) => <ProjectItem project={project} />)}
       </table>
   )
}


export default ProjectList