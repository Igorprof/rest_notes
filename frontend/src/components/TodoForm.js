import React from 'react'


class TodoForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        text: '', 
        project: '',
        user: ''
    }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );  
    }

    handleProjectsChange(event) {
        if (!event.target.selectedOptions) {
            this.setState(
                {
                    'project': ''
                }
            )
            return
        }
        // projects.push(event.target.selectedOptions.item(0).value)
        
        this.setState(
            {
                'project': event.target.selectedOptions.item(0).value
            }
        )
    }

    handleUsersChange(event) {
        if (!event.target.selectedOptions) {
            this.setState(
                {
                    'user': ''
                }
            )
            return
        }
        // projects.push(event.target.selectedOptions.item(0).value)
        
        this.setState(
            {
                'user': event.target.selectedOptions.item(0).value
            }
        )
    }

    handleSubmit(event) {
        this.props.createTodo(this.state.text, this.state.project, this.state.user)
        event.preventDefault()
    }

    render() {
        return (
          <form onSubmit={(event)=> this.handleSubmit(event)}>
            <input type="text" name="text" placeholder="text" value={this.state.text} onChange={(event)=>this.handleChange(event)} />         
            <select onChange={(event) => this.handleProjectsChange(event)}>
                {this.props.projects.map((project) => <option value={project.id}>{project.title}</option>)}
            </select>   
            <select onChange={(event) => this.handleUsersChange(event)}>
                {this.props.users.map((user) => <option value={user.id}>{user.first_name}</option>)}
            </select>    
            <input type="submit" value="Create Todo" />
          </form>
        );
      }

}

export default TodoForm