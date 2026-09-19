import { useState } from "react";
import { useOutletContext } from "react-router";
import { Container, Button, Input, TaskCard } from "../components";
import { Plus, CheckSquare } from "lucide-react";

function Task() {
    const { tasks, addTask, toggleTask, editTask, deleteTask } = useOutletContext();
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [error, setError] = useState("");

    const handleAddTask = (e) => {
        e.preventDefault();
        const trimmed = title.trim();
        if (!trimmed) {
            setError("Task title is required");
            return;
        }

        addTask({
            title: trimmed,
            priority,
        });

        setTitle("");
        setPriority("Medium");
        setError("");
    };

    const completedCount = tasks.filter((t) => t.completed).length;
    const remainingCount = tasks.length - completedCount;

    return (
        <Container>
            <div className="flex flex-col gap-6">
                {/* Page Title & Summary */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border pb-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
                            Tasks
                        </h1>
                        <p className="text-sm text-text-muted mt-1">
                            Keep track of assignments, study goals, and coursework to-dos.
                        </p>
                    </div>

                    {tasks.length > 0 && (
                        <div className="flex items-center gap-3 text-xs font-medium">
                            <span className="rounded-full bg-primary-light px-3 py-1 text-primary">
                                {tasks.length} total
                            </span>
                            <span className="rounded-full bg-success/15 px-3 py-1 text-success">
                                {completedCount} completed
                            </span>
                            <span className="rounded-full bg-warning/15 px-3 py-1 text-warning">
                                {remainingCount} remaining
                            </span>
                        </div>
                    )}
                </div>

                {/* Add Task Form */}
                <form
                    onSubmit={handleAddTask}
                    className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 rounded-xl border border-border bg-surface p-4 shadow-xs"
                >
                    <div className="flex-1">
                        <Input
                            label="New Task"
                            id="new-task-input"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                if (error) setError("");
                            }}
                            placeholder="e.g. Complete chapter 5 reading assignment"
                            error={error}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5 sm:w-44">
                        <label htmlFor="task-priority-select" className="text-xs font-semibold text-text-secondary">
                            Priority
                        </label>
                        <select
                            id="task-priority-select"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="h-[38px] rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                        >
                            <option value="High">High Priority</option>
                            <option value="Medium">Medium Priority</option>
                            <option value="Low">Low Priority</option>
                        </select>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="h-[38px] px-4 shrink-0"
                    >
                        <Plus className="mr-1.5 h-4 w-4" /> Add Task
                    </Button>
                </form>

                {/* Tasks List */}
                <div className="flex flex-col gap-2.5">
                    {tasks.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-border p-8 text-center bg-surface/30">
                            <CheckSquare className="mx-auto h-10 w-10 text-text-muted/60 mb-2" />
                            <h3 className="text-base font-semibold text-text-primary">
                                No tasks yet. Add your first task.
                            </h3>
                            <p className="mt-1 text-xs text-text-muted">
                                Add assignments, readings, or revision tasks using the form above.
                            </p>
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onToggle={toggleTask}
                                onEdit={editTask}
                                onDelete={deleteTask}
                            />
                        ))
                    )}
                </div>
            </div>
        </Container>
    );
}

export default Task;