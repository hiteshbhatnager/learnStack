import { useState } from "react";
import { Calendar, Edit2, Trash2, Check, X, FileText } from "lucide-react";
import Button from "./button";
import Input from "./input";
import { formatDateDisplay } from "../utils/timeUtils";

function NotesCard({ note, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(note.title);
    const [date, setDate] = useState(note.date);
    const [error, setError] = useState("");

    const handleStartEdit = () => {
        setTitle(note.title);
        setDate(note.date);
        setError("");
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setTitle(note.title);
        setDate(note.date);
        setError("");
        setIsEditing(false);
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        const trimmed = title.trim();
        if (!trimmed) {
            setError("Note name cannot be empty");
            return;
        }
        if (!date) {
            setError("Date is required");
            return;
        }
        onEdit(note.id, {
            title: trimmed,
            date,
        });
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <form
                onSubmit={handleSaveEdit}
                className="flex flex-col justify-between rounded-xl border border-primary/40 bg-surface p-4 shadow-xs"
            >
                <div className="flex flex-col gap-3">
                    <Input
                        label="Note Name"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            if (error) setError("");
                        }}
                        placeholder="e.g., Physics Chapter 3 Notes"
                        required
                        autoFocus
                    />
                    <Input
                        label="Date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                    {error && <p className="text-xs font-medium text-error">{error}</p>}
                </div>

                <div className="mt-4 flex items-center justify-end gap-2 pt-2 border-t border-border">
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
        <div className="group flex flex-col justify-between rounded-xl border border-border bg-surface p-4 shadow-xs transition-all hover:border-primary/30 hover:shadow-sm">
            {/* Header: Note Icon & Title */}
            <div>
                <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                            <FileText className="h-4 w-4" />
                        </div>
                        <h3
                            className="text-sm font-semibold text-text-primary line-clamp-2"
                            title={note.title}
                        >
                            {note.title}
                        </h3>
                    </div>

                    <div className="flex items-center gap-1 opacity-90 sm:opacity-60 sm:group-hover:opacity-100 transition-opacity">
                        <button
                            type="button"
                            onClick={handleStartEdit}
                            className="rounded p-1 text-text-muted hover:bg-surface-hover hover:text-text-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                            title="Edit note"
                            aria-label="Edit note"
                        >
                            <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => onDelete(note.id)}
                            className="rounded p-1 text-text-muted hover:bg-error/10 hover:text-error focus:outline-none focus:ring-1 focus:ring-error cursor-pointer"
                            title="Delete note"
                            aria-label="Delete note"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer: Date */}
            <div className="mt-4 flex items-center gap-1.5 pt-3 border-t border-border/60 text-xs text-text-muted">
                <Calendar className="h-3.5 w-3.5 shrink-0 text-text-disabled" />
                <span>{formatDateDisplay(note.date)}</span>
            </div>
        </div>
    );
}

export default NotesCard;