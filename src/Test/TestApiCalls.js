import axios from "axios";

export const createTest = (test_id, className) => {
  return axios.post("http://localhost:8080/api/test/create", {
    test_id,
    class: className
  });
};

export const getTestsByClass = (className) => {
  return axios.get("http://localhost:8080/api/test/getbyclass", {
    params: { class: className }
  });
};

export const saveTestMarks = (test_id, className, marksData) => {
  return axios.put("http://localhost:8080/api/test/savemarks", {
    test_id,
    class: className,
    marksData
  });
};

export const getTestDetails = (test_id, className) => {
  return axios.get("http://localhost:8080/api/test/details", {
    params: { test_id, class: className }
  });
};