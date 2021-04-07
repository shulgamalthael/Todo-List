import React from 'react';
import Task from './Task';
import CreateTaskInput from './CreateTaskInput.jsx'
import { createTask, fetchTasksList, updatedTask, deleteTask } from './tasksGateway.js'



class TasksList extends React.Component {
    state = {
        tasks: [],
    }

    componentDidMount() {
        this.hetchTasks()
    }

    hetchTasks = () => {
        fetchTasksList()
            .then(tasksList =>
                this.setState({
                    tasks: tasksList
                }),
            );
    };


    //CREATE!!!!!!!
    onCreate = text => {
        const newTask = {
            text,
            done: false
        }

        createTask(newTask)
            .then(() => this.hetchTasks())

        // const updatedTasks = tasks.concat(newTask)
        // this.setState({ tasks: updatedTasks });
    }



    //UPDATE!!!!!!!!!!!
    handleTaskStatusChange = id => {
        // find tasks in a list 
        // toggle done value
        // save updated list

        const { done, text } = this.state.tasks.find(task => task.id === id)
        const upTask = {
            ...text,
            done: !done
        };

        updatedTask(id, upTask)
            .then(() => this.hetchTasks())



            
    };
    //DELETE!!!!!!!!!!
    handleTaskDelete = id => {
        deleteTask(id)
        .then(() => this.hetchTasks())
        
    };


    render() {
        const sortedList = this.state.tasks
            .slice()
            .sort((a, b) => a.done - b.done)
        return (
            <div className="todo-list">
                <CreateTaskInput onCreate={this.onCreate} />
                <ul className="list">
                    {sortedList.map(task => (
                        <Task
                            key={task.id}
                            {...task}
                            onDelete={this.handleTaskDelete}
                            onChange={this.handleTaskStatusChange}
                        />
                    ))}

                </ul>
            </div>
        )
    }
}

export default TasksList;