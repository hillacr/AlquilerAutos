import http from "../http-common";
const getAll = () => {
 return http.get("/vehiculos");
};
const get = id => {
 return http.get(`/vehiculos/${id}`);
};
const create = data => {
 return http.post("/vehiculos", data);
};
const update = (id, data) => {
 return http.put(`/vehiculos/${id}`, data);
};
const remove = id => {
 return http.delete(`/vehiculos/${id}`);
};
const VehiculoService = {
    getAll,
    get,
    create,
    update,
    remove
   };
   export default VehiculoService;