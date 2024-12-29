import React, { useState } from 'react';

function Form({ onSubmit }) {
    const [title, setTitle] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(title);
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex justify-center items-center p-4">
            <input
                type="text"
                placeholder="Add a task"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="p-2 m-2 border-2 border-slate-200/50 rounded-lg"
            />
            <button
                type="submit"
                className="p-2 m-2 bg-slate-200/50 text-slate-400 rounded-lg"
            >
                Add Task
            </button>
        </form>
    );
}

export default Form;
