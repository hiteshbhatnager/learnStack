import { Container } from "../components";
import { CheckSquare, Calendar, BookOpen, HardDrive } from "lucide-react";

function About() {
    return (
        <Container>
            <div className="flex flex-col gap-6 max-w-3xl mx-auto">
                <div className="border-b border-border pb-4">
                    <h1 className="text-2xl font-bold tracking-tight text-text-primary">
                        About LearnStack
                    </h1>
                    <p className="text-sm text-text-muted mt-1">
                        A focused, purposeful academic organizer built for students.
                    </p>
                </div>

                <div className="flex flex-col gap-4 text-sm text-text-secondary leading-relaxed">
                    <p>
                        <strong className="text-text-primary">LearnStack</strong> helps students organize their coursework, lecture timetables, and study notes in one predictable, uncluttered workspace.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                        <div className="rounded-xl border border-border bg-surface p-4">
                            <div className="flex items-center gap-2 font-semibold text-text-primary">
                                <CheckSquare className="h-4 w-4 text-primary" />
                                <span>Tasks</span>
                            </div>
                            <p className="mt-1 text-xs text-text-muted">
                                Track homework, problem sets, and deadlines with clear priority levels.
                            </p>
                        </div>

                        <div className="rounded-xl border border-border bg-surface p-4">
                            <div className="flex items-center gap-2 font-semibold text-text-primary">
                                <Calendar className="h-4 w-4 text-primary" />
                                <span>Lectures</span>
                            </div>
                            <p className="mt-1 text-xs text-text-muted">
                                Maintain your weekly class timetable and instantly see your next upcoming lecture.
                            </p>
                        </div>

                        <div className="rounded-xl border border-border bg-surface p-4">
                            <div className="flex items-center gap-2 font-semibold text-text-primary">
                                <BookOpen className="h-4 w-4 text-primary" />
                                <span>Notes</span>
                            </div>
                            <p className="mt-1 text-xs text-text-muted">
                                Keep quick study notes and revision summaries organized by date.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl border border-border bg-surface p-4 mt-2">
                        <div className="flex items-center gap-2 font-semibold text-text-primary text-sm mb-1">
                            <HardDrive className="h-4 w-4 text-primary" />
                            <span>Privacy & Local Storage</span>
                        </div>
                        <p className="text-xs text-text-muted">
                            All your tasks, lectures, and notes are saved locally in your browser’s storage. Your academic data stays private on your machine and persists between visits.
                        </p>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default About;