import { useState } from "react";
import "./App.css";

const menuItems = [
  "Overview",
  "My Students",
  "Class Schedule",
  "Attendance",
  "My Profile",
];

function App() {
  const [activePage, setActivePage] = useState("Overview");
  const [students, setStudents] = 
  useState([
    "Aarav Sharma",
    "Priya Patel",
    "Rahul Verma",
  ]);

  const [classes, setClasses] = useState([
  {
    id: 1,
    name: "Morning Hatha Yoga",
    type: "Hatha Yoga",
    time: "07:00",
    duration: "60",
    students: "12",
    status: "Scheduled",
  },
  {
    id: 2,
    name: "Mindful Meditation",
    type: "Meditation",
    time: "09:30",
    duration: "45",
    students: "8",
    status: "Completed",
  },
  {
    id: 3,
    name: "Vinyasa Flow",
    type: "Vinyasa Yoga",
    time: "17:00",
    duration: "60",
    students: "15",
    status: "Scheduled",
  },
]);

const [scheduleSearch, setScheduleSearch] = useState("");
const [classForm, setClassForm] = useState({
  name: "",
  type: "Hatha Yoga",
  time: "07:00",
  duration: "60",
  students: "10",
  status: "Scheduled",
});
const [editingClassId, setEditingClassId] = useState(null);

  const [search, setSearch] = useState("");

  const resetClassForm = () => {
  setClassForm({
    name: "",
    type: "Hatha Yoga",
    time: "07:00",
    duration: "60",
    students: "10",
    status: "Scheduled",
  });
  setEditingClassId(null);
};

const saveClass = (e) => {
  e.preventDefault();

  if (!classForm.name.trim()) {
    alert("Please enter class name.");
    return;
  }

  if (editingClassId !== null) {
    setClasses((prev) =>
      prev.map((item) =>
        item.id === editingClassId
          ? { ...classForm, id: editingClassId }
          : item
      )
    );
  } else {
    setClasses((prev) => [
      ...prev,
      { ...classForm, id: Date.now() },
    ]);
  }

  resetClassForm();
};

const editClass = (item) => {
  setClassForm({
    name: item.name,
    type: item.type,
    time: item.time,
    duration: item.duration,
    students: item.students,
    status: item.status,
  });
  setEditingClassId(item.id);
};

const filteredClasses = classes.filter((item) =>
  `${item.name} ${item.type} ${item.status}`
    .toLowerCase()
    .includes(scheduleSearch.toLowerCase())
);

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">✿</span>
          <div>
            <h2>YogaFlow</h2>
            <small>WELLNESS STUDIO</small>
          </div>
        </div>

        <p className="menu-heading">WORKSPACE</p>

        <nav>
          {menuItems.map((item) => (
            <button
              key={item}
              className={`nav-item ${
                activePage === item ? "active" : ""
              }`}
              onClick={() => setActivePage(item)}
            >
              <span>
                {{
                  Overview: "⌂",
                  "My Students": "♧",
                  "Class Schedule": "▦",
                  Attendance: "✓",
                  "My Profile": "♙",
                }[item]}
              </span>
              {item}
            </button>
          ))}
        </nav>

        <div className="trainer">
          <div className="avatar">RK</div>
          <div>
            <strong>Riya Kapoor</strong>
            <small>Yoga Trainer</small>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <span>Workspace / {activePage}</span>
          <div className="top-user">
            <span>🔔</span>
            <div className="avatar">RK</div>
          </div>
        </header>

        <section className="content">
          <p className="eyebrow">YOUR PERSONAL WORKSPACE</p>
          <h1>
            {activePage === "Overview"
              ? "Good morning, Riya ☀️"
              : activePage}
          </h1>
          <p className="subtitle">
            Manage your classes and help your students grow.
          </p>

          {activePage === "Overview" ? (
            <>
              <div className="stats">
                <Stat title="Total Students" value="36" icon="♧" />
                <Stat title="Classes Today" value="03" icon="▦" />
                <Stat title="Attendance" value="85%" icon="✓" />
                <Stat title="Teaching Hours" value="18.5" icon="◷" />
              </div>

              <div className="panel">
                <div className="panel-heading">
                  <div>
                    <h2>Today's Classes</h2>
                    <p>Your schedule for today</p>
                  </div>
                  <button
                    className="view-btn"
                    onClick={() => setActivePage("Class Schedule")}
                  >
                    View all →
                  </button>
                </div>

                <ClassRow
                  time="07:00 AM"
                  title="Morning Hatha Yoga"
                  students="12 students"
                />
                <ClassRow
                  time="09:30 AM"
                  title="Mindful Meditation"
                  students="8 students"
                />
                <ClassRow
                  time="05:00 PM"
                  title="Vinyasa Flow"
                  students="15 students"
                />
              </div>

              <div className="welcome">
                <span>✧ YOUR DAILY REMINDER</span>
                <h2>Teach with presence.<br />
                  Lead with kindness.</h2>
                <p>Every breath is a fresh beginning.</p>
              </div>
            </>
          ) : 
            activePage === "My Students" ? (
  <div className="panel">
    <h2>My Students</h2>
    <p>Manage your yoga students here.</p>

    <div style={{ display: "flex", gap: "10px", margin: "20px 0" }}>
      <input
        type="text"
        placeholder="Enter student name"
        id="studentName"
        style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }}
      />

      <button
        className="view-btn"
        onClick={() => {
          const input = document.getElementById("studentName");
          if (input.value.trim()) {
            setStudents([...students, input.value.trim()]);
            input.value = "";
          }
        }}
      >
        + Add Student
      </button>
    </div>

    {students.map((student, index) => (
      <div
        key={index}
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "14px",
          borderBottom: "1px solid #eee"
        }}
      >
        <span>{index + 1}. {student}</span>
        <button onClick={() => setStudents(students.filter((_, i) => i !== index))}>
          Delete
        </button>
      </div>
    ))}

    <button
      className="view-btn"
      onClick={() => setActivePage("Overview")}
      style={{ marginTop: "20px" }}
    >
      ← Back to Overview
    </button>
  </div>
) : (
  <div className="panel placeholder">
    <span className="placeholder-icon">✿</span>
    <h2>{activePage}</h2>
    
  <div className="panel">
    <div className="panel-heading">
      <div>
        <h2>Class Schedule</h2>
        <p>Manage your yoga classes</p>
      </div>

      <span>{classes.length} Total Classes</span>
    </div>

    <form onSubmit={saveClass} className="schedule-form">
      <h3>
        {editingClassId !== null ? "Edit Class" : "Add New Class"}
      </h3>

      <div className="schedule-grid">
        <input
          placeholder="Class name"
          value={classForm.name}
          onChange={(e) =>
            setClassForm({ ...classForm, name: e.target.value })
          }
          required
        />

        <select
          value={classForm.type}
          onChange={(e) =>
            setClassForm({ ...classForm, type: e.target.value })
          }
        >
          <option>Hatha Yoga</option>
          <option>Vinyasa Yoga</option>
          <option>Power Yoga</option>
          <option>Meditation</option>
          <option>Pranayama</option>
          <option>Restorative Yoga</option>
        </select>

        <label>
          Class time
          <input
            type="time"
            value={classForm.time}
            onChange={(e) =>
              setClassForm({ ...classForm, time: e.target.value })
            }
            required
          />
        </label>

        <label>
          Duration (minutes)
          <input
            type="number"
            min="5"
            value={classForm.duration}
            onChange={(e) =>
              setClassForm({ ...classForm, duration: e.target.value })
            }
            required
          />
        </label>

        <label>
          Students
          <input
            type="number"
            min="1"
            value={classForm.students}
            onChange={(e) =>
              setClassForm({ ...classForm, students: e.target.value })
            }
            required
          />
        </label>

        <select
          value={classForm.status}
          onChange={(e) =>
            setClassForm({ ...classForm, status: e.target.value })
          }
        >
          <option>Scheduled</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>

      <div className="schedule-actions">
        <button type="submit" className="view-btn">
          {editingClassId !== null ? "Save Changes" : "+ Add Class"}
        </button>

        {editingClassId !== null && (
          <button
            type="button"
            className="view-btn"
            onClick={resetClassForm}
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>

    <div className="schedule-search">
      <input
        type="search"
        placeholder="Search by class name, yoga type or status..."
        value={scheduleSearch}
        onChange={(e) => setScheduleSearch(e.target.value)}
      />
    </div>

    <div className="schedule-list">
      {filteredClasses.length === 0 ? (
        <p>No classes found. Try another search.</p>
      ) : (
        filteredClasses.map((item) => (
          <div className="schedule-card" key={item.id}>
            <div className="schedule-info">
              <h3>{item.name}</h3>
              <p>{item.type}</p>
              <p>
                🕒 {item.time} · {item.duration} minutes
              </p>
              <p>👥 {item.students} students</p>

              <select
                aria-label={`Status for ${item.name}`}
                value={item.status}
                onChange={(e) =>
                  setClasses((prev) =>
                    prev.map((c) =>
                      c.id === item.id
                        ? { ...c, status: e.target.value }
                        : c
                    )
                  )
                }
              >
                <option>Scheduled</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>

            <div className="schedule-actions">
              <button
                type="button"
                className="view-btn"
                onClick={() => editClass(item)}
              >
                Edit
              </button>

              <button
                type="button"
                className="view-btn"
                onClick={() => {
                  if (window.confirm(`Delete "${item.name}"?`)) {
                    setClasses((prev) =>
                      prev.filter((c) => c.id !== item.id)
                    );

                    if (editingClassId === item.id) {
                      resetClassForm();
                    }
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>

    <button
      type="button"
      className="view-btn"
      onClick={() => setActivePage("Overview")}
    >
      ← Back to Overview
    </button>
  </div>

  <div className="panel placeholder">
    <span className="placeholder-icon">✿</span>
    <h2>{activePage}</h2>
    <p>This section will be implemented in the next step.</p>
    <button
      className="view-btn"
      onClick={() => setActivePage("Overview")}
    >
      ← Back to Overview
    </button>
  </div>

    <button
      className="view-btn"
      onClick={() => setActivePage("Overview")}
    >
      ← Back to Overview
    </button>
  </div>
)}
        </section>
      </main>
    </div>
  );
}

function Stat({ title, value, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <p>{title}</p>
      <h2>{value}</h2>
      <small>Trainer dashboard summary</small>
    </div>
  );
}

function ClassRow({ time, title, students }) {
  return (
    <div className="class-row">
      <div className="class-time">{time}</div>
      <div className="class-details">
        <strong>{title}</strong>
        <small>{students}</small>
      </div>
      <span className="class-status">Scheduled</span>
    </div>
  );
}

export default App;
