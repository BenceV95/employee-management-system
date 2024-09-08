import auth from "../firebase/auth";

const BASE_URL = `${import.meta.env.VITE_FB_DATABASE_URL}/equipments`;

const getToken = () => auth?.currentUser?.accessToken ?? "";

const getUriForList = () => `${BASE_URL}/list.json?auth=${getToken()}`;

const getUriForOne = (id) => `${BASE_URL}/list/${id}.json?auth=${getToken()}`;

const _time = (time) => new Date(time).getTime();

export const getAllEquipment = async () => {
  const response = await fetch(getUriForList());
  const equipment = await response.json();

  // Mapping the id-s into the response array
  return Object.keys(equipment ?? {})
    .map((key) => ({
      id: key,
      ...equipment[key],
    }))
    .toSorted((a, b) => _time(b.created) - _time(a.created));
};

export const getOneEquipmentById = async (id) => {
  const response = await fetch(getUriForOne(id));
  const equipment = await response.json();
  return equipment;
};

export const updateEquipment = async (id, data) => {
  const response = await fetch(getUriForOne(id), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Update operation failed");
  }

  return response;
};

export const deleteEquipment = async (id) => {
  const response = await fetch(getUriForOne(id), {
    method: "DELETE",
  });

  if (!response.ok) {
    console.log("delete error");
    
    throw new Error("Delete operation failed");
  }

  return response;
};

export const createEquipment = async (equipment) => {
  const response = await fetch(getUriForList(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...equipment, created: Date.now() }),
  });

  if (!response.ok) {
    throw new Error("Create operation failed");
  }

  return await response.json();
};
