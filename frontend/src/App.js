import React from 'react'
import axios from 'axios'
// import logo from './logo.svg';
import './App.css'
import UserList from './components/Users.js'
import TodoList from './components/Todos.js'
import ProjectList from './components/Projects.js'
import LoginForm from './components/LoginForm.js'
import ProjectForm from './components/ProjectForm.js'
import TodoForm from './components/TodoForm.js'
import {HashRouter, Route, Link, Switch, Redirect} from 'react-router-dom'

const NotFound404 = ({ location }) => {
    return (
      <div>
          <h1>Страница по адресу '{location.pathname}' не найдена</h1>
      </div>
    )
  }


class App extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           'users': [],
           'projects': [],
           'todos':[],
           'token': ''
       }
   }   

   is_auth() {
     return !!this.state.token
   }

   get_data() {
    const headers = this.get_headers()

    axios.get('http://127.0.0.1:8000/api/users/', {headers})
        .then(response => {
            const users = response.data.results
                this.setState(
                {
                    'users': users
                }
            )
        }).catch(error => {
          console.log(error)
          this.setState(
            {
                'users': []
            })
        })

    axios.get('http://127.0.0.1:8000/api/todos/', {headers})
        .then(response => {
            const todos = response.data.results
                this.setState(
                {
                    'todos': todos
                }
            )
        }).catch(error => {
          console.log(error)
          this.setState(
            {
                'todos': []
            })
        })
    
    axios.get('http://127.0.0.1:8000/api/projects/', {headers})
        .then(response => {
            const projects = response.data.results
                this.setState(
                {
                    'projects': projects
                }
            )
        }).catch(error => {
          console.log(error)
          this.setState(
            {
                'projects': []
            })
        })
   }

   componentDidMount() {   
    this.get_token_from_storage()
   }   

   deleteProject(id) {
    const headers = this.get_headers()

    axios.delete('http://127.0.0.1:8000/api/projects/' + id, {headers})
    .then(response => {
        this.get_data()
    }).catch(error => {
      console.log(error)
    })
   }

   deleteTodo(id) {
    const headers = this.get_headers()

    axios.delete('http://127.0.0.1:8000/api/todos/' + id, {headers})
    .then(response => {
        this.get_data()
    }).catch(error => {
      console.log(error)
    })
   }

   createProject(title, url, users) {
     console.log(title, url, users);

     const headers = this.get_headers()

     axios.post('http://127.0.0.1:8000/api/projects/?version=v2', 
      {
        'title': title, 
        'repository_url': url,
        'users': users
      },
      {headers})
        .then(response => {
            this.get_data()
        }).catch(error => {
          console.log(error)
        })
   }

   createTodo(text, project, user) {
     console.log(text, project, user)

     const headers = this.get_headers()

     axios.post('http://127.0.0.1:8000/api/todos/?version=v2', 
      {
        'text': text,
        'is_active': true,
        'project': project,
        'user': user
      },
      {headers})
        .then(response => {
            this.get_data()
        }).catch(error => {
          console.log(error)
        })
   }
   
   get_headers() {
     let headers = {
       'Content-Type': 'application/json'
     } 

     headers['Authorization'] = 'Token ' + localStorage.getItem('token')

     return headers
   }

  //  set_token(token) {
  //   localStorage.setItem('token', token)
  //   this.setState({'token': token})
  // }

   get_token_from_storage() {
    this.setState({'token': localStorage.getItem('token')}, this.get_data)
  }

   get_token(login, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', 
      {
        "username": login, 
        "password": password
      })
        .then(response => {
            localStorage.setItem('token', response.data.token)
            this.setState({'token': response.data.token}, this.get_data)
        }).catch(error => console.log(error))
   }

   logout() {
     localStorage.setItem('token', '')
     this.setState({'token': ''}, this.get_data)
   }

    render() {
        return (
            <div>
              <HashRouter>
              <nav>
                <ul>
                  <li>
                    <Link to='/'>Users</Link>
                  </li>
                  <li>
                    <Link to='/todos'>Todos</Link>
                  </li>
                  <li>
                    <Link to='/projects'>Projects</Link>
                  </li>
                  <li>
                    <Link to='/projects/create'>Create Project</Link>
                  </li>
                  <li>
                    <Link to='/todos/create'>Create Todo</Link>
                  </li>
                  <li>
                    {this.is_auth() ? <button onClick={() => this.logout()}>Logout</button> : <Link to='/login'>Login</Link>} 
                  </li>
                </ul>
              </nav>
                <Switch>
                  <Route exact path='/' component={() => <UserList users={this.state.users} />}  />
                  <Route exact path='/todos' component={() => <TodoList todos={this.state.todos} deleteTodo={(id) => this.deleteTodo(id)} />} />
                  <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)} />} />
                  <Route exact path='/projects/create' component={() => <ProjectForm createProject={(title, url, users) => this.createProject(title, url, users)} users={this.state.users}/>} /> 
                  <Route exact path='/todos/create' component={() => <TodoForm createTodo={(text, project, user) => this.createTodo(text, project, user)} projects={this.state.projects} users={this.state.users}/>} />   
                  <Route exact path='/login' component={() => <LoginForm get_token={(login, password) => this.get_token(login, password)} />} />                
                  <Redirect from='/users' to='/' />    
                  <Route component={NotFound404} />
                </Switch>
              </HashRouter>
            </div>
        )
      }
}

export default App;
