<template>
  <v-container
    id="war-ranking"
    fluid
    tag="section"
  >

    <v-dialog
      v-model="confirmDialog"
      persistent
      max-width="400px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Tem certeza que quer resetar a classificação?</span>
        </v-card-title>
        <v-card-text>
          <span class="text-h5">Todos os dados calculados serão permanentemente perdidos!</span>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            color="error"
            default
            @click="resetar"
          >
            Sim
          </v-btn>
          <v-btn
            color="success"
            default
            class="mr-0"
            @click="confirmDialog = false"
          >
            Não
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-form ref="form" class="mx-2" lazy-validation>
      <div v-can="'ROLE_ADMIN'">
        <v-file-input
          v-model="file"
          outlined
          show-size
          counter
          accept="image/png, image/jpeg, image/bmp"
          label="Selecione a imagem"
          prepend-icon="mdi-camera"
          :rules="[v => !!v || 'Imagem é obrigatória!']"
        >
          <template v-slot:selection="{ text }">
            <v-chip
              small
              label
              color="primary"
            >
              {{ text }}
            </v-chip>
          </template>
        </v-file-input>

        <v-row align="center">
          <v-col
            class="d-flex"
            cols="2"
            sm="1"
          >
            <v-select
              v-model="week"
              :items="[1,2,3,4]"
              label="Semana"
              dense
              outlined
              :rules="[v => !!v || 'Semana é obrigatória!']"
            ></v-select>
          </v-col>
          <v-col
            class="d-flex  margin-bottom-auto"
            cols="6"
            sm="6"
          >
            <v-btn
              color="success"
              default
              class="mr-0"
              @click="calcular"
            >
              Calcular
            </v-btn>
          </v-col>
          <v-col
            class="d-flex  margin-bottom-auto"
            cols="2"
            sm="2"
          >
            <v-btn
              color="error"
              default
              class="mr-0"
              @click="confirmDialog = true"
            >
              Resetar
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-form>
    <base-material-card
      color="success"
      dark
      icon="mdi-medal"
      title="Ranking classificatório semanal da guerra de clãs"
      class="px-5 py-3"
    >
      <v-data-table
        :headers="headers"
        :items="rankeds"
        :items-per-page="10"
        :loading="loading"
        :sort-by="['posicao']"
        :sort-desc="[false]"
        class="elevation-1"
      >
      <template v-slot:no-data >
        <div style="color: red; font-weight: bold; text-transform: uppercase;">
        Ranking ainda não calculado!
        Em breve os administradores irão efetuá-lo.
        </div>
      </template>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
import api from "@/api";

export default {
    data () {
      return {
        confirmDialog: false,
        loading: true,
        headers: [
          {
            text: 'Posição',
            align: 'center',
            value: 'posicao',
          },
          { text: 'Nickname', value: 'nickname' },
          { text: '1ª semana', value: 'firstWeek' },
          { text: '2ª semana', value: 'secondWeek' },
          { text: '3ª semana', value: 'thirdWeek' },
          { text: '4ª semana', value: 'fourthWeek' },
          { text: 'Total', value: 'totalPoints' },
        ],
        rankeds: [],
        file: null,
        week: null,
      }
    },
    mounted () {
      this.getDataFromApi();
    },
    watch: {
        options: {
          handler () {
            this.getDataFromApi()
          },
          deep: true,
        },
      },
    methods: {
      calcular() {
        if(this.$refs.form.validate()) {
          let formData = new FormData();

          formData.append("file", this.file, this.file.name);

          api.post(`/ranking/calcular?week=${this.week}`, formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => {
            if(response) {
              this.rankeds = response.data;
            }
            this.$refs.form.reset();
            this.loading = false;
          })
          .catch(error => {
            console.log({ error });
          });
        }
      },
      resetar() {
        api.get('/ranking/resetar')
        .then((response) => {
          if(response) {
            this.rankeds = [];
            this.$toast.success("Reset efetuado com sucesso!");   
          }
        })
        .catch((error) => {
          console.log(error);
        });
        this.confirmDialog = false;
      },
      getDataFromApi () {
        this.loading = true;
        api.get('/ranking')
        .then((response) => {
          if(response) {
            this.rankeds = response.data;
          }
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
      },
    },
  }
</script>
<style>
  .margin-bottom-auto {
    margin-bottom: auto !important;
  }
</style>