import { useState } from "react";
import { Clock, User, Edit2, Trash2, Check, X } from "lucide-react";
import Button from "./button";
import Input from "./input";
import {
    DAYS_OF_WEEK,
    formatTimeDisplay,
    isEndTimeAfterStartTime
} from "../utils/timeUtils";

function LectureCard({ lecture, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [subject, setSubject] = useState(lecture.subject);
    const [professor, setProfessor] = useState(lecture.professor);
    const [day, setDay] = useState(lecture.day);
    const [startTime, setStartTime] = useState(lecture.startTime);
    const [endTime, setEndTime] = useState(lecture.endTime);
    const [error, setError] = useState("");

    const handleStartEdit = () => {
        setSubject(lecture.subject);
        setProfessor(lecture.professor);
        setDay(lecture.day);
        setStartTime(lecture.startTime);
        setEndTime(lecture.endTime);
        setError("");
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setSubject(lecture.subject);
        setProfessor(lecture.professor);
        setDay(lecture.day);
        setStartTime(lecture.startTime);
        setEndTime(lecture.endTime);
        setError("");
        setIsEditing(false);
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        const trimmedSubject = subject.trim();
        const trimmedProf = professor.trim();

        if (!trimmedSubject || !trimmedProf || !day || !startTime || !endTime) {
            setError("All fields are required");
            return;
        }

        if (!isEndTimeAfterStartTime(startTime, endTime)) {
            setError("End time must be after start time");
            return;
        }

        onEdit(lecture.id, {
            subject: trimmedSubject,
            professor: trimmedProf,
            day,
            startTime,
            endTime,
        });
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <form
                onSubmit={handleSaveEdit}
                className="flex flex-col rounded-xl border border-primary/40 bg-surface p-4 shadow-xs"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                        label="Subject"
                        value={subject}
                        onChange={(e) => {
                            setSubject(e.target.value);
                            if (error) setError("");
                        }}
                        placeholder="e.g. Physics"
                        required
                    />
                    <Input
                        label="Professor"
                        value={professor}
                        onChange={(e) => {
                            setProfessor(e.target.value);
                            if (error) setError("");
                        }}
                        placeholder="e.g. Dr. Vance"
                        required
                    />

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-text-secondary">
                            Day <span className="text-error">*</span>
                        </label>
                        <select
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                            className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            required
                        >
                            {DAYS_OF_WEEK.map((d) => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            label="Start Time"
                            type="time"
                            value={startTime}
                            onChange={(e) => {
                                setStartTime(e.target.value);
                                if (error) setError("");
                            }}
                            required
                        />
                        <Input
                            label="End Time"
                            type="time"
                            value={endTime}
                            onChange={(e) => {
                                setEndTime(e.target.value);
                                if (error) setError("");
                            }}
                            required
                        />
                    </div>
                </div>

                {error && (
                    <p className="mt-2 text-xs font-medium text-error">{error}</p>
                )}

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
            <div>
                {/* Header: Day Badge & Actions */}
                <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md bg-primary-light px-2.5 py-0.5 text-xs font-semibold text-primary">
                        {lecture.day}
                    </span>

                    <div className="flex items-center gap-1 opacity-90 sm:opacity-60 sm:group-hover:opacity-100 transition-opacity">
                        <button
                            type="button"
                            onClick={handleStartEdit}
                            className="rounded p-1 text-text-muted hover:bg-surface-hover hover:text-text-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                            title="Edit lecture"
                            aria-label="Edit lecture"
                        >
                            <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => onDelete(lecture.id)}
                            className="rounded p-1 text-text-muted hover:bg-error/10 hover:text-error focus:outline-none focus:ring-1 focus:ring-error cursor-pointer"
                            title="Delete lecture"
                            aria-label="Delete lecture"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>

                {/* Subject */}
                <h3 className="mt-2.5 text-base font-semibold text-text-primary">
                    {lecture.subject}
                </h3>

                {/* Professor */}
                <div className="mt-1 flex items-center gap-1.5 text-xs text-text-secondary">
                    <User className="h-3.5 w-3.5 text-text-muted shrink-0" />
                    <span>{lecture.professor}</span>
                </div>
            </div>

            {/* Time footer */}
            <div className="mt-4 flex items-center gap-1.5 pt-3 border-t border-border/60 text-xs font-medium text-text-primary">
                <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>
                    {formatTimeDisplay(lecture.startTime)} – {formatTimeDisplay(lecture.endTime)}
                </span>
            </div>
        </div>
    );
}

export default LectureCard;