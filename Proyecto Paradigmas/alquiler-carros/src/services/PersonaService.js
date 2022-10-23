import http from "../http-common";
const getAll = () => {
 return http.get("/personas");
};
const get = id => {
 return http.get(`/personas/${id}`);
};
const create = data => {
 return http.post("/personas", data);
};
const update = (id, data) => {
console.log(data);
 return http.put(`/personas/${id}`, data);
};

const remove = id => {
 return http.delete(`/personas/${id}`);
};
const PersonaService = {
    getAll,
    get,
    create,
    update,
    remove
   };
export default PersonaService;