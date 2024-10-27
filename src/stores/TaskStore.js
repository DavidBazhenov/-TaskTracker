
import { makeAutoObservable } from "mobx";

class TaskStore {
    tasks = [];

    constructor() {
        makeAutoObservable(this);
        this.initializeTasks();
    }

    initializeTasks() {
        this.tasks = [
            { id: 1, title: "Task 1", priority: "low", deadline: "2024-10-13", status: "new" },
            { id: 2, title: "Task 2", priority: "medium", deadline: "2024-10-14", status: "new" },
            { id: 3, title: "Task 3", priority: "high", deadline: "2024-10-15", status: "in-progress" },
            { id: 4, title: "Task 4", priority: "low", deadline: "2024-10-16", status: "completed" },
            { id: 5, title: "Task 5", priority: "medium", deadline: "2024-10-17", status: "new" },
            { id: 6, title: "Task 6", priority: "high", deadline: "2024-10-18", status: "in-progress" },
            { id: 7, title: "Task 7", priority: "low", deadline: "2024-10-19", status: "completed" },
            { id: 8, title: "Task 8", priority: "medium", deadline: "2024-10-20", status: "new" },
            { id: 9, title: "Task 9", priority: "high", deadline: "2024-10-21", status: "new" },
            { id: 10, title: "Task 10", priority: "low", deadline: "2024-10-22", status: "completed" },
        ];
    }

    addTask(title, priority, deadline) {
        const newTask = {
            id: Date.now(),
            title,
            priority,
            deadline,
            status: "new",
        };
        this.tasks.push(newTask);
    }

    updateTaskStatus(taskId, newStatus) {
        const taskIndex = this.tasks.findIndex((task) => task.id === parseInt(taskId, 10));
        if (taskIndex !== -1) {
            this.tasks[taskIndex].status = newStatus;
        }
    }

    toggleTaskStatus(taskId) {
        const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
            this.tasks[taskIndex].status =
                this.tasks[taskIndex].status === "completed" ? "new" : "completed";
        }
    }

    removeTask(taskId) {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
    }
}

const taskStore = new TaskStore();
export default taskStore;
