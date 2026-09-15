/**
 * LearnStack Home Dashboard Data
 * 
 * Centralized data source for the home page overview.
 * This can be easily replaced or hooked into an API/backend in the future.
 */

export const homeData = {
  user: {
    name: "Alex",
    greeting: "Good morning 👋",
    subtitle: "Ready to continue learning? You have 3 tasks and 3 lectures scheduled for today.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    initials: "AJ",
    continueActionText: "Continue Learning"
  },

  stats: [
    {
      id: "courses",
      title: "Courses",
      value: 4,
      icon: "BookOpen",
      description: "Active enrolled courses",
      badge: "In Progress"
    },
    {
      id: "tasks",
      title: "Tasks",
      value: 7,
      icon: "CheckSquare",
      description: "3 tasks due today",
      badge: "Pending"
    },
    {
      id: "notes",
      title: "Notes",
      value: 12,
      icon: "FileText",
      description: "Quick revision notes",
      badge: "Updated"
    },
    {
      id: "streak",
      title: "Day Streak",
      value: 7,
      icon: "Flame",
      description: "Keep the momentum going!",
      badge: "Personal Best"
    }
  ],

  currentCourse: {
    title: "C Programming",
    category: "Computer Science",
    topic: "Switch Statement",
    lessonNumber: "Module 3 • Lesson 4",
    progress: 68,
    estimatedTimeRemaining: "18 mins remaining",
    buttonText: "Continue →",
    badge: "In Progress"
  },

  tasks: [
    {
      id: "task-1",
      title: "Complete C operators practice",
      category: "C Programming",
      completed: false,
      priority: "High",
      due: "Today, 5:00 PM"
    },
    {
      id: "task-2",
      title: "Revise switch statement",
      category: "C Programming",
      completed: false,
      priority: "Medium",
      due: "Today, 8:00 PM"
    },
    {
      id: "task-3",
      title: "Complete React lesson",
      category: "Frontend Dev",
      completed: true,
      priority: "Low",
      due: "Completed"
    }
  ],

  lectures: [
    {
      id: "lec-1",
      subject: "Physics",
      time: "10:00 AM",
      professor: "Dr. Eleanor Vance",
      room: "Hall B",
      status: "Upcoming"
    },
    {
      id: "lec-2",
      subject: "C Programming",
      time: "1:00 PM",
      professor: "Prof. Rajesh Verma",
      room: "Lab 3",
      status: "Upcoming"
    },
    {
      id: "lec-3",
      subject: "Mathematics",
      time: "3:00 PM",
      professor: "Dr. Alan Mercer",
      room: "Lecture Hall A",
      status: "Upcoming"
    }
  ],

  recentNotes: [
    {
      id: "note-1",
      title: "Pointers in C",
      subject: "C Programming",
      updatedAt: "2 hours ago",
      snippet: "Memory addresses, dereference operator (*), and pointer arithmetic rules."
    },
    {
      id: "note-2",
      title: "Newton's Laws",
      subject: "Physics",
      updatedAt: "Yesterday",
      snippet: "Inertia, F=ma, and action-reaction pairs with practical mechanics examples."
    },
    {
      id: "note-3",
      title: "React useState",
      subject: "Frontend Dev",
      updatedAt: "3 days ago",
      snippet: "Component state management, updater functions, and batching in React 19."
    }
  ],

  learningProgress: {
    overallPercentage: 72,
    completedTopics: 18,
    totalTopics: 25,
    weeklyGoal: {
      targetHours: 15,
      currentHours: 11.5
    },
    streakDays: 7
  }
};
