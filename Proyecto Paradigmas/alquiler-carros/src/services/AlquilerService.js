import http from "../http-common";
const getAll = () => {
 return http.get("/alquilar");
};
const get = id => {
 return http.get(`/alquilar/${id}`);
};
const create = data => {
 return http.post("/alquilar", data);
};
const update = (id, data) => {
 return http.put(`/alquilar`, data);
};
const remove = id => {
 return http.delete(`/alquilar/${id}`);
};
const AlquilerService = {
    getAll,
    get,
    create,
    update,
    remove
   };
   export default AlquilerService;