import Logo from "./logo";

function Footer() {
    return (
        <footer className="mt-auto border-t border-border bg-surface/40 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
                <div className="flex items-center gap-2">
                    <Logo showText={false} className="h-6 w-6" />
                    <span className="font-medium text-text-secondary">LearnStack</span>
                    <span>— Academic Workspace for Students</span>
                </div>
                <div className="flex items-center gap-4">
                    <span>Organize Tasks, Lectures & Notes</span>
                    <span className="text-border">|</span>
                    <span>Local & Private</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;