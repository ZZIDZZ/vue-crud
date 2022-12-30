<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add Product</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
        v-model="product.product_code"
        :rules="[(v) => !!v || 'Product Code is Required']"
        label="Product Code"
        required
      ></v-text-field>

      <v-text-field
        v-model="product.product_name"
        :rules="[(v) => !!v || 'Product Name is Required']"
        label="Product Name"
        required
      ></v-text-field>

      <div v-if="currentUomId" class="edit-form py-3" > Uom Id <br>
        <select v-model="currentUomId" > 
          <option v-for="(item, index) in uomOptions" :value="item.id" :key="index">{{ item.uom_name }}</option>
        </select>
      </div>
      <div v-else>
        <p>uom unavailable</p>
      </div>
      <v-text-field
        v-model="product.description"
        :rules="[(v) => !!v || 'Description is required']"
        label="Description"
        required
      ></v-text-field>

      <v-text-field
        v-model="product.unit_price"
        :rules="[(v) => !!v || 'Unit Price is Required']"
        label="Unit Price"
        required
      ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveProduct">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>

        <v-card-subtitle>
          Click the button to add new Product.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newProduct">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import ProductDataService from "../services/ProductDataService";

export default {
  name: "add-product",
  data() {
    return {
      product:{
        product_code: "",
        product_name: "",
        uom_id: "",
        description: "",
        unit_price: "",
      },
      uomOptions: [],
      currentUomId: null,
      submitted: false,
    };
  },
  methods: {
    getDisplayUom(uom) {
      return {
        id: uom.id,
        uom_code: uom.uom_code,
        uom_name: uom.uom_name.length > 30 ? uom.uom_name.substr(0, 30) + "..." : uom.uom_name,
      };
    },
    getUomOptions(){
      ProductDataService.getUoms()
        .then((response) => {
          this.uomOptions = response.data.map(this.getDisplayUom);
          this.currentUomId = this.uomOptions[0].id
          console.log("mantap");
          console.log(this.uomOptions);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    saveProduct() {
      var data = {
        product_code: this.product.product_code,
        product_name: this.product.product_name,
        uom_id: this.currentUomId,
        description: this.product.description,
        unit_price: this.product.unit_price,
      };

      ProductDataService.create(data)
        .then((response) => {
          this.product.id = response.data.id;
          console.log("deeznuts");
          console.log(this.currentUomId);
          console.log(data);
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newProduct() {
      this.submitted = false;
      this.product = {};
    },
  },
  mounted() {
    this.message = "";
    this.getUomOptions();
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>
