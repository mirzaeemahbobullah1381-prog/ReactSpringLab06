import axios from "axios";

const API_URL = "http://localhost:8888/api/v1/courses";

export function getCourses() {
  return axios.get(API_URL);
}

export const updateCourse = (id, course) => {
  return axios.put(`${API_URL}/${id}`, course);
};

export const deleteCourse = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
