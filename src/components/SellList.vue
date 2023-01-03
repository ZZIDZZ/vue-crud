<template>
  <v-row align="center" class="list px-3 mx-auto">
    <!-- <v-col cols="12" md="8">
      <v-text-field v-model="title" label="Search by Title"></v-text-field>
    </v-col> -->

    <!-- <v-col cols="12" md="4">
      <v-btn small @click="searchTitle">
        Search
      </v-btn>
    </v-col> -->
    
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Buy Orders</v-card-title>
        <v-btn to="/sells/add"  depressed color="primary" text>
          Add
        </v-btn>

        <v-data-table
          :headers="headers"
          :items="products"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editProduct(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteProduct(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <!-- <v-card-actions v-if="products.length > 0">
          <v-btn small color="error" @click="removeAllProducts">
            Remove All
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ProductDataService from "../services/ProductDataService";
export default {
  name: "products-list",
  data() {
    return {
      products: [],
      title: "",
      headers: [
        { text: "Product Code", align: "start", sortable: false, value: "product_code" },
        { text: "Product Name", value: "product_name", sortable: false },
        { text: "Uom Id", value: "uom_id", sortable: false },
        { text: "Description", value: "description", sortable: false },
        { text: "Unit Price", value: "unit_price", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveProducts() {
      ProductDataService.getAll()
        .then((response) => {
          this.products = response.data.map(this.getDisplayProduct);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveProducts();
    },

    // removeAllProducts() {
    //   ProductDataService.deleteAll()
    //     .then((response) => {
    //       console.log(response.data);
    //       this.refreshList();
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },

    // searchTitle() {
    //   ProductDataService.findByTitle(this.title)
    //     .then((response) => {
    //       this.products = response.data.map(this.getDisplayProduct);
    //       console.log(response.data);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },

    editProduct(id) {
      this.$router.push({ name: "sell-details", params: { id: id } });
    },

    deleteProduct(id) {
      ProductDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayProduct(product) {
      return {
        id: product.id,
        product_code: product.product_code,
        product_name: product.product_name.length > 30 ? product.product_name.substr(0, 30) + "..." : product.product_name,
        uom_id: product.uom_id,
        description: product.description.length > 30 ? product.description.substr(0, 30) + "..." : product.description,
        unit_price: product.unit_price,
      };
    },
  },
  mounted() {
    this.retrieveProducts();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>
