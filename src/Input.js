import React, { useState } from 'react';

const Input = () => {
    // TODO => write unit tests
    const loadPreviousTasks = localStorage.getItem('todoList');
    const [input, setInput] = useState('');
    const [list, setList] = useState(loadPreviousTasks.split(',') || []);

    const addToList = (newItem) => {
        setList(current => [...current, newItem]);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addToList(event.target[0].value.trim());
        setInput('');
    }

    const handleChange = (event) => {
        setInput(event.target.value);
    }

    window.addEventListener("beforeunload", (ev) => {
        if (list) localStorage.setItem('todoList', list);
    });

    const removeAllTasks = () => {
        setList([]);
    } 

    return (
        <div className='form'>
            <form onSubmit={handleSubmit} className=''>
                <label>
                    New task:
                    <input type="text" value={input} onChange={handleChange} className='button'/>
                </label>
                <input type="submit" value="Submit" disabled={input === ''} className='button'/>
            </form>
            {
                list?.map((task, index) => <div className='button' style={{backgroundColor: (index % 2 === 0)? 'lightgrey' : 'lightblue'}} key={index}>{task}</div>)
            }

            <input type="submit" value="Remove All Tasks" onClick={removeAllTasks} className='button'/>
        </div>
    );
};

export default Input;