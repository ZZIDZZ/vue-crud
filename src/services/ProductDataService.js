import http from "../http-common";

class ProductDataService {
  getAll() {
    return http.get("/product");
  }

  get(id) {
    return http.get(`/product/${id}`);
  }

  create(data) {
    return http.post("/product", data);
  }

  update(id, data) {
    return http.put(`/product/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/product/delete/${id}`);
  }
  getUoms(){
    return http.get("/uom");
  }
  getUom(id){
    return http.get(`/uom/${id}`);
  }
}

export default new ProductDataService();