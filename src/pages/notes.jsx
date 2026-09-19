import { useState } from "react";
import { useOutletContext } from "react-router";
import { Container, Button, Input, NotesCard } from "../components";
import { Plus, BookOpen } from "lucide-react";

function Notes() {
    const { notes, addNote, editNote, deleteNote } = useOutletContext();
    const today = new Date().toISOString().split("T")[0];
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(today);
    const [error, setError] = useState("");

    const handleAddNote = (e) => {
        e.preventDefault();
        const trimmed = title.trim();
        if (!trimmed) {
            setError("Note name is required");
            return;
        }
        if (!date) {
            setError("Date is required");
            return;
        }

        addNote({
            title: trimmed,
            date,
        });

        setTitle("");
        setDate(today);
        setError("");
    };

    return (
        <Container>
            <div className="flex flex-col gap-6">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border pb-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
                            Notes
                        </h1>
                        <p className="text-sm text-text-muted mt-1">
                            Organize revision notes, lecture summaries, and study cards.
                        </p>
                    </div>

                    {notes.length > 0 && (
                        <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary self-start sm:self-auto">
                            {notes.length} {notes.length === 1 ? "note" : "notes"} saved
                        </span>
                    )}
                </div>

                {/* Add Note Form */}
                <form
                    onSubmit={handleAddNote}
                    className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 rounded-xl border border-border bg-surface p-4 shadow-xs"
                >
                    <div className="flex-1">
                        <Input
                            label="Note Name"
                            id="new-note-input"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                if (error) setError("");
                            }}
                            placeholder="e.g. Operating Systems: Deadlocks & Semaphores"
                            error={error}
                            required
                        />
                    </div>

                    <div className="sm:w-48">
                        <Input
                            label="Date"
                            id="new-note-date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="h-[38px] px-4 shrink-0"
                    >
                        <Plus className="mr-1.5 h-4 w-4" /> Add Note
                    </Button>
                </form>

                {/* Notes Grid */}
                {notes.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-border p-8 text-center bg-surface/30">
                        <BookOpen className="mx-auto h-10 w-10 text-text-muted/60 mb-2" />
                        <h3 className="text-base font-semibold text-text-primary">
                            No notes yet.
                        </h3>
                        <p className="mt-1 text-xs text-text-muted">
                            Capture key concepts and revision items using the form above.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {notes.map((note) => (
                            <NotesCard
                                key={note.id}
                                note={note}
                                onEdit={editNote}
                                onDelete={deleteNote}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Container>
    );
}

export default Notes;