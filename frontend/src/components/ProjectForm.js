import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        title: '', 
        url: '',
        users: []
    }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );  
    }

    handleUsersChange(event) {
        if (!event.target.selectedOptions) {
            this.setState(
                {
                    'users': []
                }
            )
            return
        }
        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(event.target.selectedOptions.item(i).value)
        }
        
        this.setState(
            {
                'users': users
            }
        )
    }

    handleSubmit(event) {
        this.props.createProject(this.state.title, this.state.url, this.state.users)
        event.preventDefault()
    }

    render() {
        return (
          <form onSubmit={(event)=> this.handleSubmit(event)}>
            <input type="text" name="title" placeholder="title" value={this.state.title} onChange={(event)=>this.handleChange(event)} />        
            <input type="text" name="url" placeholder="url" value={this.state.url} onChange={(event)=>this.handleChange(event)} />    
            <select multiple onChange={(event) => this.handleUsersChange(event)}>
                {this.props.users.map((user) => <option value={user.id}>{user.first_name}</option>)}
            </select>    
              <input type="submit" value="Create Project" />
          </form>
        );
      }

}

export default ProjectForm