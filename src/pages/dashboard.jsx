import { useNavigate, useOutletContext } from "react-router";
import { Container, Card } from "../components";
import {
    CheckSquare,
    Calendar,
    BookOpen,
    Clock,
    User,
    ArrowRight,
    CheckCircle2,
    Circle
} from "lucide-react";
import {
    formatTimeDisplay,
    formatDateDisplay,
    getUpcomingLectures
} from "../utils/timeUtils";

function Dashboard() {
    const navigate = useNavigate();
    const { tasks, lectures, notes } = useOutletContext();

    // 1. Task calculations
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.completed).length;
    const remainingTasks = totalTasks - completedTasks;
    const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Preview tasks (show up to 4, incomplete first)
    const previewTasks = [...tasks]
        .sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1))
        .slice(0, 4);

    // 2. Upcoming lectures (chronological, next first)
    const upcomingLectures = getUpcomingLectures(lectures).slice(0, 3);

    // 3. Recent notes (by date descending)
    const recentNotes = [...notes]
        .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
        .slice(0, 4);

    const priorityColors = {
        High: "text-error bg-error/10 border-error/20",
        Medium: "text-warning bg-warning/10 border-warning/20",
        Low: "text-success bg-success/10 border-success/20",
    };

    // SVG Circular Progress Constants
    const radius = 26;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

    return (
        <Container>
            <div className="flex flex-col gap-6">
                {/* Header Greeting */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border pb-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
                            Student Dashboard
                        </h1>
                        <p className="text-sm text-text-muted mt-0.5">
                            Overview of your current academic tasks, upcoming lectures, and notes.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-medium text-text-secondary border border-border">
                            <span className="h-2 w-2 rounded-full bg-success" />
                            Academic Term Active
                        </span>
                    </div>
                </div>

                {/* 3 Main Columns: Tasks, Lectures, Notes */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    {/* ------------------------------------------------ */}
                    {/* SECTION 1: TASKS OVERVIEW */}
                    {/* ------------------------------------------------ */}
                    <Card
                        title="Tasks"
                        subtitle="Coursework & to-dos"
                        icon={<CheckSquare className="h-5 w-5" />}
                        count={totalTasks}
                        onViewAll={() => navigate("/task")}
                        viewAllText="View all tasks →"
                    >
                        <div className="flex flex-col gap-4">
                            {/* Visual Progress Indicator */}
                            <div className="flex items-center gap-4 rounded-lg bg-surface-hover/50 p-3 border border-border/50">
                                <div className="relative flex items-center justify-center shrink-0">
                                    <svg className="h-16 w-16 -rotate-90 transform" viewBox="0 0 64 64">
                                        <circle
                                            cx="32"
                                            cy="32"
                                            r={radius}
                                            stroke="currentColor"
                                            strokeWidth="5"
                                            className="text-border/60"
                                            fill="transparent"
                                        />
                                        <circle
                                            cx="32"
                                            cy="32"
                                            r={radius}
                                            stroke="currentColor"
                                            strokeWidth="5"
                                            strokeDasharray={circumference}
                                            strokeDashoffset={strokeDashoffset}
                                            strokeLinecap="round"
                                            className="text-primary transition-all duration-500 ease-out"
                                            fill="transparent"
                                        />
                                    </svg>
                                    <span className="absolute text-xs font-bold text-text-primary">
                                        {completionPercentage}%
                                    </span>
                                </div>

                                <div className="flex flex-col text-xs">
                                    <div className="font-semibold text-text-primary text-sm">
                                        {totalTasks} total tasks
                                    </div>
                                    <div className="flex items-center gap-1.5 text-success font-medium mt-0.5">
                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                        <span>{completedTasks} completed</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-text-muted mt-0.5">
                                        <Circle className="h-3.5 w-3.5" />
                                        <span>{remainingTasks} remaining</span>
                                    </div>
                                </div>
                            </div>

                            {/* Task Previews */}
                            <div className="flex flex-col gap-2">
                                <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                                    Recent Tasks
                                </span>

                                {previewTasks.length === 0 ? (
                                    <p className="text-xs text-text-muted py-2 italic">
                                        No tasks yet. Add your first task.
                                    </p>
                                ) : (
                                    previewTasks.map((task) => (
                                        <button
                                            key={task.id}
                                            type="button"
                                            onClick={() => navigate("/task")}
                                            className="group flex items-center justify-between gap-2 rounded-lg border border-border/70 bg-surface px-3 py-2 text-left transition-colors hover:border-primary/40 hover:bg-surface-hover/30 cursor-pointer"
                                            title="Click to view in Tasks"
                                        >
                                            <div className="flex items-center gap-2 min-w-0 flex-1">
                                                <div className="shrink-0">
                                                    {task.completed ? (
                                                        <CheckCircle2 className="h-4 w-4 text-success" />
                                                    ) : (
                                                        <Circle className="h-4 w-4 text-text-muted group-hover:text-primary" />
                                                    )}
                                                </div>
                                                <span
                                                    className={`truncate text-xs font-medium ${
                                                        task.completed
                                                            ? "line-through text-text-muted"
                                                            : "text-text-primary"
                                                    }`}
                                                >
                                                    {task.title}
                                                </span>
                                            </div>

                                            <span
                                                className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold border ${
                                                    priorityColors[task.priority] || priorityColors.Medium
                                                }`}
                                            >
                                                {task.priority || "Medium"}
                                            </span>
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* ------------------------------------------------ */}
                    {/* SECTION 2: LECTURES OVERVIEW */}
                    {/* ------------------------------------------------ */}
                    <Card
                        title="Lectures"
                        subtitle="Upcoming classes"
                        icon={<Calendar className="h-5 w-5" />}
                        count={lectures.length}
                        onViewAll={() => navigate("/lecture")}
                        viewAllText="View all lectures →"
                    >
                        <div className="flex flex-col gap-3">
                            <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                                Next Up
                            </span>

                            {upcomingLectures.length === 0 ? (
                                <div className="rounded-lg border border-dashed border-border p-4 text-center">
                                    <p className="text-xs text-text-muted">
                                        No upcoming lectures scheduled.
                                    </p>
                                </div>
                            ) : (
                                upcomingLectures.map((lec, idx) => (
                                    <div
                                        key={lec.id}
                                        onClick={() => navigate("/lecture")}
                                        className={`group rounded-lg border p-3 transition-colors cursor-pointer ${
                                            idx === 0
                                                ? "border-primary/40 bg-primary-light/40 hover:border-primary"
                                                : "border-border bg-surface hover:border-primary/30 hover:bg-surface-hover/30"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="font-semibold text-sm text-text-primary group-hover:text-primary transition-colors">
                                                {lec.subject}
                                            </span>
                                            <span className="rounded bg-surface px-2 py-0.5 text-[10px] font-semibold text-text-secondary border border-border/80">
                                                {lec.day}
                                            </span>
                                        </div>

                                        <div className="mt-2 flex items-center justify-between text-xs text-text-muted">
                                            <div className="flex items-center gap-1">
                                                <User className="h-3 w-3" />
                                                <span className="truncate max-w-[130px]">
                                                    {lec.professor}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 font-medium text-text-primary">
                                                <Clock className="h-3 w-3 text-primary" />
                                                <span>
                                                    {formatTimeDisplay(lec.startTime)} – {formatTimeDisplay(lec.endTime)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </Card>

                    {/* ------------------------------------------------ */}
                    {/* SECTION 3: NOTES OVERVIEW */}
                    {/* ------------------------------------------------ */}
                    <Card
                        title="Notes"
                        subtitle="Recent study cards"
                        icon={<BookOpen className="h-5 w-5" />}
                        count={notes.length}
                        onViewAll={() => navigate("/notes")}
                        viewAllText="View all notes →"
                    >
                        <div className="flex flex-col gap-3">
                            <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                                Recent Notes
                            </span>

                            {recentNotes.length === 0 ? (
                                <div className="rounded-lg border border-dashed border-border p-4 text-center">
                                    <p className="text-xs text-text-muted">
                                        No notes yet. Add your first note.
                                    </p>
                                </div>
                            ) : (
                                recentNotes.map((note) => (
                                    <div
                                        key={note.id}
                                        onClick={() => navigate("/notes")}
                                        className="group flex flex-col justify-between gap-2 rounded-lg border border-border bg-surface p-3 transition-colors hover:border-primary/30 hover:bg-surface-hover/30 cursor-pointer"
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <h4 className="text-xs font-semibold text-text-primary line-clamp-1 group-hover:text-primary transition-colors">
                                                {note.title}
                                            </h4>
                                        </div>
                                        <div className="flex items-center justify-between text-[11px] text-text-muted pt-1 border-t border-border/50">
                                            <span>{formatDateDisplay(note.date)}</span>
                                            <span className="text-primary font-medium flex items-center gap-0.5 group-hover:underline">
                                                Open <ArrowRight className="h-3 w-3" />
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </Container>
    );
}

export default Dashboard;