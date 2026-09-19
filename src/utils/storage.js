/**
 * LearnStack LocalStorage Persistence Utility
 * 
 * Provides safe getter and setter methods with default initial student data.
 */

const STORAGE_KEYS = {
  TASKS: "learnstack_tasks",
  NOTES: "learnstack_notes",
  LECTURES: "learnstack_lectures",
};

// Initial starter data for first-time students
const DEFAULT_TASKS = [
  {
    id: "task-1",
    title: "Complete Data Structures assignment 3",
    completed: false,
    priority: "High",
  },
  {
    id: "task-2",
    title: "Review Operating Systems chapter 4 slides",
    completed: false,
    priority: "Medium",
  },
  {
    id: "task-3",
    title: "Submit Calculus weekly problem set",
    completed: true,
    priority: "High",
  },
  {
    id: "task-4",
    title: "Download reading material for Physics lab",
    completed: false,
    priority: "Low",
  },
];

const DEFAULT_NOTES = [
  {
    id: "note-1",
    title: "Binary Search Trees & Balancing",
    date: new Date(Date.now() - 86400000).toISOString().split("T")[0], // yesterday
  },
  {
    id: "note-2",
    title: "Process Scheduling Algorithms (Round Robin, FCFS)",
    date: new Date(Date.now() - 2 * 86400000).toISOString().split("T")[0], // 2 days ago
  },
  {
    id: "note-3",
    title: "Linear Transformations & Eigenvectors",
    date: new Date(Date.now() - 4 * 86400000).toISOString().split("T")[0], // 4 days ago
  },
];

const DEFAULT_LECTURES = [
  {
    id: "lec-1",
    subject: "Data Structures & Algorithms",
    professor: "Prof. Alan Mercer",
    day: "Monday",
    startTime: "09:00",
    endTime: "10:30",
  },
  {
    id: "lec-2",
    subject: "Operating Systems",
    professor: "Dr. Eleanor Vance",
    day: "Monday",
    startTime: "11:00",
    endTime: "12:30",
  },
  {
    id: "lec-3",
    subject: "Linear Algebra & Calculus",
    professor: "Prof. Rajesh Verma",
    day: "Wednesday",
    startTime: "14:00",
    endTime: "15:30",
  },
  {
    id: "lec-4",
    subject: "Computer Networks",
    professor: "Dr. Karen Thorne",
    day: "Friday",
    startTime: "10:00",
    endTime: "11:30",
  },
];

function getStoredItem(key, fallback) {
  try {
    if (typeof window === "undefined" || typeof localStorage === "undefined") {
      return fallback;
    }
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch (err) {
    console.warn(`Failed to read ${key} from localStorage:`, err);
    return fallback;
  }
}

function setStoredItem(key, data) {
  try {
    if (typeof window === "undefined" || typeof localStorage === "undefined") {
      return;
    }
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Failed to save ${key} to localStorage:`, err);
  }
}

export const StorageService = {
  loadTasks() {
    return getStoredItem(STORAGE_KEYS.TASKS, DEFAULT_TASKS);
  },
  saveTasks(tasks) {
    setStoredItem(STORAGE_KEYS.TASKS, tasks);
  },

  loadNotes() {
    return getStoredItem(STORAGE_KEYS.NOTES, DEFAULT_NOTES);
  },
  saveNotes(notes) {
    setStoredItem(STORAGE_KEYS.NOTES, notes);
  },

  loadLectures() {
    return getStoredItem(STORAGE_KEYS.LECTURES, DEFAULT_LECTURES);
  },
  saveLectures(lectures) {
    setStoredItem(STORAGE_KEYS.LECTURES, lectures);
  },
};
