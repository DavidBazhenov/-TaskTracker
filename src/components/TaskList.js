import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import taskStore from "../stores/TaskStore";

const TaskList = observer(() => {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("low");
    const [deadline, setDeadline] = useState("");

    const handleAddTask = () => {
        if (title.trim()) {
            taskStore.addTask(title, priority, deadline);
            setTitle("");
            setPriority("low");
            setDeadline("");
        }
    };

    const onDragEnd = (result) => {
        console.log(result);

        const { source, destination } = result;

        if (!destination) return;

        // Если карточка перемещена в новую колонку, обновляем статус задачи
        if (source.droppableId !== destination.droppableId) {
            const taskId = result.draggableId;
            taskStore.updateTaskStatus(taskId, destination.droppableId);
        }
    };

    const renderTasks = (status) => (
        <Droppable droppableId={status}>
            {(provided) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-col gap-4 p-4 bg-gray-100 rounded"
                >
                    {taskStore.tasks
                        .filter((task) => task.status === status)
                        .map((task, index) => (
                            <Draggable
                                key={task.id.toString()}
                                draggableId={task.id.toString()}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                        className="border p-4 rounded shadow-md bg-white"
                                    >
                                        <h4 className="font-bold">{task.title}</h4>
                                        <p>Id: {task.id}</p>
                                        <p>Priority: {task.priority}</p>
                                        <p>Deadline: {task.deadline}</p>
                                        {/* <button
                                            className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
                                            onClick={() => taskStore.toggleTaskStatus(task.id)}
                                        >
                                            {task.status === "completed" ? "Mark as New" : "Mark as Completed"}
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                                            onClick={() => {
                                                console.log(12);

                                                taskStore.removeTask(task.id)
                                            }}
                                        >
                                            Delete Task
                                        </button> */}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Project Task Tracker</h1>

            {/* Форма для добавления новой задачи */}
            <div className="mb-8">
                <input
                    className="border rounded p-2 mr-2"
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <select
                    className="border rounded p-2 mr-2"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <input
                    className="border rounded p-2 mr-2"
                    type="date"
                    value={deadline || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDeadline(e.target.value)}
                />

                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleAddTask}>
                    Add Task
                </button>
            </div>

            {/* Drag-and-drop контекст */}
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-3 gap-8">
                    <div>
                        <h2 className="text-xl font-semibold mb-4">New Tasks</h2>
                        {renderTasks("new")}
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-4">In Progress</h2>
                        {renderTasks("in-progress")}
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Completed</h2>
                        {renderTasks("completed")}
                    </div>
                </div>
            </DragDropContext>
        </div>
    );
});

export default TaskList;
