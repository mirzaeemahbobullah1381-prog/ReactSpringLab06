import { useEffect, useState } from "react";
// Make sure this import path matches where you saved your service file
import { getCourses, updateCourse, deleteCourse } from "../services/courseApi";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [course, setCourse] = useState({ code: "", title: "", credits: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        if (active) setCourses(response.data);
      } catch (err) {
        if (active) setError("Failed to load courses.");
        console.error(err);
      }
    };
    fetchCourses();
    return () => {
      active = false;
    };
  }, []);

  const loadCourses = async () => {
    const response = await getCourses();
    setCourses(response.data);
  };

  const handleEdit = (selectedCourse) => {
    setEditingId(selectedCourse.id);
    // String() fixes the .trim() error if the backend sends a number
    setCourse({
      code: String(selectedCourse.code ?? ""),
      title: String(selectedCourse.title ?? ""),
      credits: String(selectedCourse.credits ?? ""),
    });
    setMessage("");
    setError("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourse((previous) => ({ ...previous, [name]: value }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const updatedCourse = {
      code: String(course.code ?? "").trim(),
      title: String(course.title ?? "").trim(),
      credits: Number(course.credits),
    };
    try {
      await updateCourse(editingId, updatedCourse);
      await loadCourses();
      setEditingId(null);
      setCourse({ code: "", title: "", credits: "" });
      setError("");
      setMessage("Course updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to update course. Check the API response.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await deleteCourse(id);
      await loadCourses();
      if (editingId === id) setEditingId(null);
      setError("");
      setMessage("Course deleted successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to delete course. Check the API response.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Course Management</h2>

      {/* Success Message */}
      {message && <div className="alert alert-success">{message}</div>}

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Edit Form (Only shows when editingId is not null) */}
      {editingId !== null && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Edit Course</h5>
            <form onSubmit={handleUpdate}>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Code</label>
                  <input
                    type="text"
                    className="form-control"
                    name="code"
                    value={course.code}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={course.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Credits</label>
                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    name="credits"
                    value={course.credits}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary me-2">
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditingId(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Course Table */}
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Title</th>
            <th>Credits</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.code}</td>
              <td>{item.title}</td>
              <td>{item.credits}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Courses;
