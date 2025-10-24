import { api } from "./http";

const getCertificationCategoryByName = async (name) => {
  const res = await api.get(`/v2/certification-category/name/${name}`);
  return res?.data?.data?.body?.data;
};

const getCreditsByCategory = async (id) => {
  const res = await api.get(`/v2/certification-credit/category/${id}`);
  return res?.data?.data?.body?.data;
};

const getProjectCertificationInput = async (projectId) => {
  const res = await api.get(
    `/v2/project-certification-input/project/${projectId}`
  );
  return res?.data?.data?.body?.data;
};

const updateProjectCertificationInput = async (projectId, body) => {
  const res = await api.put(
    `/v2/project-certification-input/project/${projectId}`,
    body
  );
  return res?.data?.data?.body?.data;
};

const getInputByName = async (name) => {
  const res = await api.get(`/v2/certification-input/name/${name}`);
  return res?.data?.data?.body?.data;
};

const getUploadProgress = async (projectId) => {
  const res = await api.get(
    `/v2/project-certification-input/upload/${projectId}`
  );
  return res?.data?.data?.body?.data;
};

const getCategoryInputs = async (id) => {
  const res = await api.get(`/v2/certification-input/category/${id}`);
  return res?.data?.data?.body?.data;
};

const getCertificationsData = async (projectId) => {
  const response = await api.get(`/v2/projects/${projectId}/certification`);
  return response?.data?.data?.body?.data;
};

const getCategoryCredits = async (categoryId) => {
  const response = await api.get(
    `/v2/certification-credit/category/${categoryId}`
  );
  return response?.data?.data?.body?.data;
};

const getCreditById = async (creditId) => {
  const response = await api.get(`/v2/certification-credit/${creditId}`);
  return response?.data?.data?.body?.data;
};

const getCertificationInputs = async () => {
  const response = await api.get(`/v2/certification-input`);
  return response?.data?.data?.body?.data;
};

const createCertificationUpload = async (payload) => {
  const response = await api.post(`/v2/certification-upload`, payload);
  return response?.data?.data?.body?.data;
};

const fetchCertificationUploadByProject = async (projectId) => {
  const response = await api.get(`/v2/certification-upload/${projectId}`);
  return response?.data?.data?.body?.data;
};

const getCertificationCategories = async () => {
  const response = await api.get(`/v2/certification-category`);
  return response?.data?.data?.body?.data;
};

const deleteCertificationUpload = async (projectId, creditId, uploadId) => {
  const response = await api.delete(
    `/v2/certification-upload/${projectId}/${creditId}/${uploadId}`
  );
  return response?.data?.data?.body?.data;
};

const getCertificationCredits = async () => {
  const response = await api.get(`/v2/certification-credit`);
  return response?.data?.data?.body?.data;
};

export {
  getCertificationInputs,
  getCreditById,
  getCategoryCredits,
  getCertificationsData,
  getCategoryInputs,
  getUploadProgress,
  getCertificationCategoryByName,
  getInputByName,
  getCreditsByCategory,
  getProjectCertificationInput,
  updateProjectCertificationInput,
  createCertificationUpload,
  fetchCertificationUploadByProject,
  getCertificationCategories,
  deleteCertificationUpload,
  getCertificationCredits,
};
