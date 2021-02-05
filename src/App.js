import logo from './logo.svg';
import './App.css';
import HeaderView from './components/HeaderView';
import DisplayComponent from './components/DisplayComponent'
import { connect } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import applicationAPI from './resources/applicationAPI';

function App(props) {


 
  useEffect(()=>{
    getData();
  },[])

  const getData = async () =>{
    try {
      var dataObj=[];
      const response = await axios.get(applicationAPI.getToDo, null);
      console.log(response, "cdd")
      if (response.data) {
          if (response.data.resultData.length > 0) {
              for (var i = 0; i < response.data.resultData.length; i++) {
                  dataObj.push({
                      id: response.data.resultData[i].id,
                      task_Name: response.data.resultData[i].task_name,
                  })
              }

              console.log( "TODOS", dataObj);
              props.dispatch({type: "ADD_TODOS", payload:dataObj})
          }
        //  console.log(this.state.movies, "cdd")
          // this.setState({
          //     movies: dataObj,
          //     loading: false
          // });
      }
      else{
          console.log("response failed");
      }
    } catch (error) {
      console.log(error, "ser");
    } finally { /*this.setState({ loading: false }); */
    }
  }


  return (
    <div className="App">
      <HeaderView getData = {getData}/>
      <DisplayComponent/>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

const mapStateToProps = state =>{
  return {
     todos: state.todos.todos
  }
}

export default connect(mapStateToProps) (App);
