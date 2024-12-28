import api from "../../../utils/api";
import { userRequest } from "../../../utils/requests";
import serverURL from "../../../utils/url";

export const createNewPatient = async ({formData}) => {
  const { data } = await api.post(`/patients`, formData);
  return data;
};

export const createNewConsultation = async (body) => {
    const { data } = await api.post(`/consultations`, body);
    return data;
  };