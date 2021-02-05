import React, { Component } from 'react'
import '../App.css';
import { connect } from 'react-redux';
import { addTodo } from '../actions'
import applicationAPI from '../resources/applicationAPI';
import axios from 'axios';

class HeaderView extends Component {
  constructor(props) {
    super(props);
    this.state = { task_name: '' };

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ task_name: event.target.value });
  }

  handleSubmit = async (event) => {
    const task = this.state.task_name;
    console.log(task, "ss")
    try {
      const response = await axios.post(applicationAPI.saveToDo, { task_name: task });
      console.log("respoense", response.data);
      if(response.data.success){
        this.props.getData();
        this.setState({
          task_name: ''
        })
      }

      
      
    } catch (error) {
      console.log(error, "ser");
    } finally { /*this.setState({ loading: false }); */
      event.preventDefault();
    }

  }



  render() {
    console.log("imncomming Props", this.props);
    return (
      <div>
        <header className="header">
          <p className="header-font">ToDo Task List</p>
          <form onSubmit={this.handleSubmit}>
            <label className="task-name">
              Task Name:
          <input type="text" value={this.state.task_name} onChange={this.handleChange} className="text-input" />
            </label>
            <button type='button' className="submit-btn" onClick={this.handleSubmit}>Submit</button>
            {/* <input type="submit" value="Submit" className="submit-btn" /> */}
          </form>
        </header>


      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    todos: state.todos
  }
}

export default connect(mapStateToProps)(HeaderView);