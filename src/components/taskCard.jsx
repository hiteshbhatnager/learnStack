import { useState } from "react";
import { Check, Edit2, Trash2, X, CheckSquare, Square } from "lucide-react";
import Button from "./button";
import Input from "./input";

function TaskCard({ task, onToggle, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedPriority, setEditedPriority] = useState(task.priority || "Medium");
    const [editError, setEditError] = useState("");

    const handleStartEdit = () => {
        setEditedTitle(task.title);
        setEditedPriority(task.priority || "Medium");
        setEditError("");
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setEditedTitle(task.title);
        setEditedPriority(task.priority || "Medium");
        setEditError("");
        setIsEditing(false);
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        const trimmed = editedTitle.trim();
        if (!trimmed) {
            setEditError("Task title cannot be empty");
            return;
        }
        onEdit(task.id, {
            title: trimmed,
            priority: editedPriority,
        });
        setIsEditing(false);
    };

    const priorityStyles = {
        High: "text-error bg-error/10 border-error/20",
        Medium: "text-warning bg-warning/10 border-warning/20",
        Low: "text-success bg-success/10 border-success/20",
    };

    if (isEditing) {
        return (
            <form
                onSubmit={handleSaveEdit}
                className="flex flex-col gap-3 rounded-lg border border-primary/40 bg-surface p-3.5 shadow-xs transition-all"
            >
                <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                        value={editedTitle}
                        onChange={(e) => {
                            setEditedTitle(e.target.value);
                            if (editError) setEditError("");
                        }}
                        error={editError}
                        placeholder="Task title"
                        className="flex-1"
                        autoFocus
                    />
                    <select
                        value={editedPriority}
                        onChange={(e) => setEditedPriority(e.target.value)}
                        className="h-[38px] rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                    >
                        <option value="High">High Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="Low">Low Priority</option>
                    </select>
                </div>
                <div className="flex items-center justify-end gap-2">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={handleCancelEdit}
                        className="px-2.5 py-1 text-xs"
                    >
                        <X className="mr-1 h-3.5 w-3.5" /> Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        className="px-3 py-1 text-xs"
                    >
                        <Check className="mr-1 h-3.5 w-3.5" /> Save
                    </Button>
                </div>
            </form>
        );
    }

    return (
        <div
            className={`
                group
                flex
                items-center
                justify-between
                gap-3
                rounded-lg
                border
                border-border
                bg-surface
                p-3.5
                transition-all
                hover:border-primary/30
                ${task.completed ? "bg-surface/50 opacity-80" : ""}
            `}
        >
            {/* Left: Completion Checkbox & Title */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
                <button
                    type="button"
                    onClick={() => onToggle(task.id)}
                    className="shrink-0 text-primary hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-primary rounded p-0.5 cursor-pointer"
                    aria-label={task.completed ? "Mark task as pending" : "Mark task as completed"}
                >
                    {task.completed ? (
                        <CheckSquare className="h-5 w-5 text-success fill-success/15" />
                    ) : (
                        <Square className="h-5 w-5 text-text-muted hover:text-primary" />
                    )}
                </button>

                <span
                    className={`
                        text-sm
                        font-medium
                        truncate
                        select-none
                        ${task.completed ? "line-through text-text-muted" : "text-text-primary"}
                    `}
                    title={task.title}
                >
                    {task.title}
                </span>
            </div>

            {/* Right: Priority Badge & Actions */}
            <div className="flex items-center gap-2 shrink-0">
                <span
                    className={`
                        rounded-md
                        border
                        px-2
                        py-0.5
                        text-xs
                        font-medium
                        ${priorityStyles[task.priority] || priorityStyles.Medium}
                    `}
                >
                    {task.priority || "Medium"}
                </span>

                <div className="flex items-center gap-1 opacity-90 sm:opacity-75 sm:group-hover:opacity-100 transition-opacity">
                    <button
                        type="button"
                        onClick={handleStartEdit}
                        className="rounded p-1 text-text-muted hover:bg-surface-hover hover:text-text-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                        title="Edit task"
                        aria-label="Edit task"
                    >
                        <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => onDelete(task.id)}
                        className="rounded p-1 text-text-muted hover:bg-error/10 hover:text-error focus:outline-none focus:ring-1 focus:ring-error cursor-pointer"
                        title="Delete task"
                        aria-label="Delete task"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskCard;