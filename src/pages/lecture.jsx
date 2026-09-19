import { useState } from "react";
import { useOutletContext } from "react-router";
import { Container, Button, Input, LectureCard } from "../components";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import {
    DAYS_OF_WEEK,
    isEndTimeAfterStartTime,
    sortLecturesChronologically
} from "../utils/timeUtils";

function Lecture() {
    const { lectures, addLecture, editLecture, deleteLecture } = useOutletContext();

    const [subject, setSubject] = useState("");
    const [professor, setProfessor] = useState("");
    const [day, setDay] = useState("Monday");
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("10:30");
    const [error, setError] = useState("");

    const handleAddLecture = (e) => {
        e.preventDefault();
        const trimmedSubject = subject.trim();
        const trimmedProf = professor.trim();

        if (!trimmedSubject) {
            setError("Subject is required");
            return;
        }
        if (!trimmedProf) {
            setError("Professor name is required");
            return;
        }
        if (!day) {
            setError("Day is required");
            return;
        }
        if (!startTime) {
            setError("Start time is required");
            return;
        }
        if (!endTime) {
            setError("End time is required");
            return;
        }

        if (!isEndTimeAfterStartTime(startTime, endTime)) {
            setError("End time must be after start time");
            return;
        }

        addLecture({
            subject: trimmedSubject,
            professor: trimmedProf,
            day,
            startTime,
            endTime,
        });

        setSubject("");
        setProfessor("");
        setDay("Monday");
        setStartTime("09:00");
        setEndTime("10:30");
        setError("");
    };

    const sortedLectures = sortLecturesChronologically(lectures);

    return (
        <Container>
            <div className="flex flex-col gap-6">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border pb-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
                            Lectures
                        </h1>
                        <p className="text-sm text-text-muted mt-1">
                            Manage class schedules, professors, lecture timings, and days.
                        </p>
                    </div>

                    {lectures.length > 0 && (
                        <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary self-start sm:self-auto">
                            {lectures.length} {lectures.length === 1 ? "lecture" : "lectures"} scheduled
                        </span>
                    )}
                </div>

                {/* Add Lecture Form */}
                <form
                    onSubmit={handleAddLecture}
                    className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 shadow-xs"
                >
                    <div className="text-xs font-bold uppercase tracking-wider text-text-muted">
                        Add New Lecture
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        <Input
                            label="Subject"
                            id="lecture-subject"
                            value={subject}
                            onChange={(e) => {
                                setSubject(e.target.value);
                                if (error) setError("");
                            }}
                            placeholder="e.g. Algorithms"
                            required
                        />

                        <Input
                            label="Professor"
                            id="lecture-professor"
                            value={professor}
                            onChange={(e) => {
                                setProfessor(e.target.value);
                                if (error) setError("");
                            }}
                            placeholder="e.g. Dr. Vance"
                            required
                        />

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="lecture-day" className="text-xs font-semibold text-text-secondary">
                                Day <span className="text-error">*</span>
                            </label>
                            <select
                                id="lecture-day"
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                className="h-[38px] rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                                required
                            >
                                {DAYS_OF_WEEK.map((d) => (
                                    <option key={d} value={d}>
                                        {d}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Input
                            label="Start Time"
                            id="lecture-start-time"
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
                            id="lecture-end-time"
                            type="time"
                            value={endTime}
                            onChange={(e) => {
                                setEndTime(e.target.value);
                                if (error) setError("");
                            }}
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-xs font-medium text-error">{error}</p>
                    )}

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            variant="primary"
                            className="h-[38px] px-5"
                        >
                            <Plus className="mr-1.5 h-4 w-4" /> Add Lecture
                        </Button>
                    </div>
                </form>

                {/* Lectures Grid */}
                {sortedLectures.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-border p-8 text-center bg-surface/30">
                        <CalendarIcon className="mx-auto h-10 w-10 text-text-muted/60 mb-2" />
                        <h3 className="text-base font-semibold text-text-primary">
                            No lectures scheduled.
                        </h3>
                        <p className="mt-1 text-xs text-text-muted">
                            Add your weekly classes and lecture schedule using the form above.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sortedLectures.map((lecture) => (
                            <LectureCard
                                key={lecture.id}
                                lecture={lecture}
                                onEdit={editLecture}
                                onDelete={deleteLecture}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Container>
    );
}

export default Lecture;