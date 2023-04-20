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

    <div v-can="'ROLE_ADMIN'">
      <v-card>
        <v-tabs
          background-color="success"
          centered
          dark
          icons-and-text
        >
          <v-tab>
            Print
            <v-icon>mdi-file-image-plus</v-icon>
          </v-tab>

          <v-tab>
            CSV
            <v-icon>mdi-file-delimited</v-icon>
          </v-tab>
        
          <v-tab-item>
            <v-form ref="formPrint" class="mx-2" lazy-validation>
              <v-file-input
                v-model="files"
                outlined
                show-size
                counter
                multiple
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
                  cols="4"
                  sm="3"
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
                  cols="4"
                  sm="2"
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
            </v-form>
          </v-tab-item>
        
          <v-tab-item>
            <v-form ref="formCsv" class="mx-2" lazy-validation>
              <v-file-input
                v-model="fileCsv"
                outlined
                show-size
                counter
                accept="text/csv"
                label="Selecione o CSV"
                prepend-icon="mdi-camera"
                :rules="[v => !!v || 'CSV é obrigatório!']"
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
                  class="d-flex  margin-bottom-auto"
                  cols="auto"
                >
                  <v-btn
                    color="success"
                    default
                    class="mr-0"
                    @click="calcularCsv"
                  >
                    Calcular
                  </v-btn>
                </v-col>
                <v-col
                  class="d-flex  margin-bottom-auto"
                  cols="auto"
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
                <v-col
                  class="d-flex  margin-bottom-auto"
                  cols="auto"
                >
                  <a
                    href="https://royaleapi.com/clan/YV88PJ08/war/log/csv"
                    rel="noopener"
                    target="_blank"
                  >Baixar CSV</a>
                </v-col>
              </v-row>
            </v-form>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </div>
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
        :single-expand="true"
        :expanded.sync="expanded"
        item-key="id"
        show-expand
        class="elevation-1"
      >
        <template v-slot:no-data >
          <div style="color: red; font-weight: bold; text-transform: uppercase;">
          Ranking ainda não calculado!
          Em breve os administradores irão efetuá-lo.
          </div>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            1ª semana: <strong style="color:yellow;">{{ item.firstWeek }}</strong>&nbsp;&nbsp;|&nbsp;&nbsp;
            2ª semana: <strong style="color:yellow;">{{ item.secondWeek }}</strong>&nbsp;&nbsp;|&nbsp;&nbsp;
            3ª semana: <strong style="color:yellow;">{{ item.thirdWeek }}</strong>&nbsp;&nbsp;|&nbsp;&nbsp;
            4ª semana: <strong style="color:yellow;">{{ item.fourthWeek }}</strong>
          </td>
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
        expanded: [],
        confirmDialog: false,
        loading: true,
        headers: [
          {
            text: 'Posição',
            align: 'center',
            value: 'posicao',
          },
          { text: 'Nickname', value: 'nickname' },
          { text: 'Total', value: 'totalPoints' },
          { text: '', value: 'data-table-expand' },
        ],
        rankeds: [],
        files: [],
        fileCsv: null,
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
      calcularCsv() {
        if(this.$refs.formCsv.validate()) {
          let formData = new FormData();

          formData.append("file", this.fileCsv, this.fileCsv.name);

          api.post('/ranking/calcular-csv', formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => {
            if(response) {
              this.rankeds = response.data;
            }
            this.$refs.formCsv.reset();
            this.loading = false;
          })
          .catch(error => {
            console.log({ error });
          });
        }
      },
      calcular() {
        if(this.$refs.formPrint.validate()) {
          let formData = new FormData();

          // files
          for (let file of this.files) {
              formData.append("files", file, file.name);
          }

          api.post(`/ranking/calcular?week=${this.week}`, formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => {
            if(response) {
              this.rankeds = response.data;
            }
            this.$refs.formPrint.reset();
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