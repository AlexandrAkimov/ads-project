<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm8 offset-sm2>
        <v-card class="mt-12">
          <v-img :src="ad.imageSrc"></v-img>
          <v-card-text>
            <h1 class="text--primary">{{ad.title}}</h1>
            <p>{{ad.description}}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-edit-ad-modal :ad="ad" v-if="isMyAdd"></app-edit-ad-modal>
            <app-buy-modal :ad="ad"></app-buy-modal>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import EditAdModal from './EditAdModal'
export default {
  props: ["id"],
  computed: {
    ad() {
      const id = this.id;
      return this.$store.getters.adById(id);
    },
    isMyAdd(){
      return this.ad.ownerId === this.$store.getters.user.id
    }
  },
  components: {
    appEditAdModal: EditAdModal
  }
};
</script>