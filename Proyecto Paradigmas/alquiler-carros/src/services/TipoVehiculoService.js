import http from "../http-common";
const getAll = () => {
 return http.get("/tipovehiculos");
};
const get = id => {
 return http.get(`/tipovehiculos/${id}`);
};
const create = data => {
 return http.post("/tipovehiculos", data);
};
const update = (id, data) => {
 return http.put(`/tipovehiculos/${id}`, data);
};
const remove = id => {
 return http.delete(`/tipovehiculos/${id}`);
};
const TipoVehiculoService = {
    getAll,
    get,
    create,
    update,
    remove
   };
   export default TipoVehiculoService;