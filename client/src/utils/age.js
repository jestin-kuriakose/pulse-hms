import dayjs from "dayjs";

export const calculateAge = (dob) => {
  const currentDate = dayjs();
  const birthDate = dayjs(dob);
  const age = currentDate.diff(birthDate, "year");
  return age;
};
