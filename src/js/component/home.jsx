import React, { useEffect, useState } from "react";

const urlBase = "https://playground.4geeks.com/apis/fake/todos/user/";
const apiUsername = "patriciaacpd";



const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [tareaName, settareaName] = useState("");

  const fetchTodoApi = async () => {
    try {
      const response = await fetch(`${urlBase}${apiUsername}`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };


  const updateTodos = async (newTasks) => {
    try {
      const response = await fetch(`${urlBase}${apiUsername}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTasks),
      });
      if (response.ok === true) { 
        const res = await response.json();
        console.log(res)
      } 
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddClick = () => {
    if (tareaName === "") {
      alert("Your task can not be empty");
      return;
    }
    const newTarea = {
      label: tareaName,
      done: false
    };
    const newTasks = [...tasks, newTarea];
    setTasks(newTasks);
    settareaName("");
  };

  const handleRemoveTask = (id) => {
    let newTasks = tasks.filter((item, index) => index != id);
    setTasks(newTasks);
  };

  const handleDeleteList = () => {
    setTasks([{ label: "example task", done: false }]);
  };

  const handleAddEnter = (event) => {
    console.log(event.key);

    if (event.key === "Enter") {
      const newTarea = {
        label: tareaName,
        done: false
      };
      const newTasks = [...tasks, newTarea];
      setTasks(newTasks);
      settareaName("");
      console.log(event);
    }
  };

  useEffect(() => {
    fetchTodoApi();
  }, []);
  useEffect(() => {
    updateTodos(tasks);
  }, [tasks]);
  console.log(tasks);
  return (
    <div className="text-center">
      <h1 className="text-center mt-5">TODOS</h1>
      <div className="card m-5">
        <div className="card-header d-flex justify-content-center">
          <input
            className="mx-2 my-2"
            type="text"
            name="label"
            placeholder="New task"
            onChange={(event) => settareaName(event.target.value)}
            onKeyDown={(event) => handleAddEnter(event)}
            value={tareaName}
          />
          <button className="my-2" onClick={() => handleAddClick()}>
            Add task
          </button>
          <button
            className="btn btn-outline-danger ms-2"
            onClick={() => handleDeleteList()}
          >
            Delete List
          </button>
        </div>

        <div className="card-body">
          <ul className="list-group list-group-flush">
            {tasks && tasks.length > 0 && tasks.map((tareaName, index) => {
              return (
                <li className="list-group-item d-flex justify-content-between">
                  <p key={index}>{tareaName.label}</p>
                  <button
                    className="btn-close "
                    aria-label="Close"
                    onClick={() => handleRemoveTask(index)}
                  ></button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="card-footer">
          {tasks.length === 0 && <p>There are no tasks, add new tasks</p>}
          {tasks.length} item left
        </div>
      </div>
    </div>
  );
};

export default Home;
