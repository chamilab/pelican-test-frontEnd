import React, { Component } from 'react'
import { getMovies } from './fakeMovieService';
import applicationAPI from '../resources/applicationAPI';
import '../App.css';
import axios from 'axios';
import { connect } from 'react-redux';

class DisplayComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: getMovies()
        }
    }
    _getData = async () => {

        try {
            var dataObj = [];
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

                    console.log("TODOS", dataObj);
                    this.props.dispatch({ type: "ADD_TODOS", payload: dataObj })
                }
                //  console.log(this.state.movies, "cdd")
                // this.setState({
                //     movies: dataObj,
                //     loading: false
                // });
            }
            else {
                console.log("response failed");
            }
        } catch (error) {
            console.log(error, "ser");
        } finally { /*this.setState({ loading: false }); */
        }
    }
    componentDidMount = async () => {
        this._getData()

    }
    render() {
        console.log("incommingProps", this.props)
        return (
            <div className="Middle">
                <ul className="theList">
                {this.props.todos?.todos?.length && this.props.todos?.todos?.map(movie => (
                     <li key={movie.id}> {movie.task_Name}</li>
                     ))}
                </ul>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        todos: state.todos
    }
}

export default connect(mapStateToProps)(DisplayComponent);