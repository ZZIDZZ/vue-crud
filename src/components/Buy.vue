<template>
  <div v-if="currentProduct" class="edit-form py-3">
    <p class="headline">Edit Buy Order</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentProduct.product_code"
        :rules="[(v) => !!v || 'Product Code is Required']"
        label="Product Code"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentProduct.product_name"
        :rules="[(v) => !!v || 'Product Name is Required']"
        label="Product Name"
        required
      ></v-text-field>

      <div v-if="currentUom" class="edit-form py-3" > Uom Id <br>
        <select v-model="currentUomId" > 
          <option v-for="(item, index) in uomOptions" :value="item.id" :key="index">{{ item.uom_name }}</option>
        </select>
      </div>
      <div v-else>
        <p>uom unavailable</p>
      </div>
      <v-text-field
        v-model="currentProduct.description"
        :rules="[(v) => !!v || 'Description is required']"
        label="Description"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentProduct.unit_price"
        :rules="[(v) => !!v || 'Unit Price is Required']"
        label="Unit Price"
        required
      ></v-text-field>

      <!-- <label><strong>Status:</strong></label>
      {{ currentProduct.published ? "Published" : "Pending" }} -->

      <v-divider class="my-5"></v-divider>

      <!-- <v-btn v-if="currentProduct.published"
        @click="updatePublished(false)"
        color="primary" small class="mr-2"
      >
        UnPublish
      </v-btn>

      <v-btn v-else
        @click="updatePublished(true)"
        color="primary" small class="mr-2"
      >
        Publish
      </v-btn> -->

      <v-btn color="error" small class="mr-2" @click="deleteProduct">
        Delete
      </v-btn>

      <v-btn color="success" small @click="updateProduct">
        Update
      </v-btn>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a Product...</p>
  </div>
</template>

<script>
import ProductDataService from "../services/ProductDataService";

export default {
  name: "product",
  data() {
    return {
      currentProduct: null,
      uomOptions: [],
      currentUom: null,
      currentUomId: null,
      message: "",
    };
  },
  methods: {
    getProduct(id) {
      ProductDataService.get(id)
        .then((response) => {
          this.currentProduct = response.data;
          this.getUomById();
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getUomById(){
      ProductDataService.getUom(this.currentProduct.uom_id)
        .then((response) => {
          this.currentUom = response.data;
          this.currentUomId = this.currentUom.id;
          console.log("mantappppp")
          console.log(this.currentUom);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getUomOptions(){
      ProductDataService.getUoms()
        .then((response) => {
          this.uomOptions = response.data.map(this.getDisplayUom);
          console.log("mantap");
          console.log(this.uomOptions);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateUom(uom_id){
      this.currentUomId = uom_id;
    },
    getDisplayUom(uom) {
      return {
        id: uom.id,
        uom_code: uom.uom_code,
        uom_name: uom.uom_name.length > 30 ? uom.uom_name.substr(0, 30) + "..." : uom.uom_name,
      };
    },
    // updatePublished(status) {
    //   var data = {
    //     id: this.currentProduct.id,
    //     title: this.currentProduct.title,
    //     description: this.currentProduct.description,
    //     published: status,
    //   };

    //   ProductDataService.update(this.currentProduct.id, data)
    //     .then((response) => {
    //       this.currentProduct.published = status;
    //       console.log(response.data);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },

    updateProduct() {
      this.currentProduct.uom_id = this.currentUomId;
      ProductDataService.update(this.currentProduct.id, this.currentProduct)
        .then((response) => {
          console.log("this.currentProduct.uom_id");
          console.log(this.currentProduct.uom_id);
          console.log(this.currentUom.id);
          console.log(this.currentUomId);
          console.log(response.data);
          this.message = "The product was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteProduct() {
      ProductDataService.delete(this.currentProduct.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "products" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getProduct(this.$route.params.id);
    this.getUomOptions();
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
