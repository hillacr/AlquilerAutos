import http from "../http-common";
const getAll = () => {
 return http.get("/log");
};

const LogService = {
    getAll,
   };
   export default LogService;