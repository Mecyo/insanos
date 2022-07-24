<template>
  <v-container
    id="black-list"
    fluid
    tag="section"
  >

<v-form ref="form" class="mx-2" lazy-validation>

</v-form>

    <v-btn
      v-can="'ROLE_ADMIN'"
      color="success"
      default
      class="mr-0"
      @click="addDialog = true"
    >
      Adicionar
    </v-btn>

    <v-dialog
      v-model="addDialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Informações do usuário banido</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="player.nickname"
                  label="Nickname*"
                  outlined
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea
                  required
                  v-model="player.motivoBanimento"
                  outlined
                  name="input-7-4"
                  label="Motivo do banimento*"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>Os campos com '*' são obrigatórios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            default
            @click="addDialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="success"
            default
            class="mr-0"
            @click="add"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <base-material-card
      color="success"
      dark
      icon="mdi-account-cancel"
      title="Relação de players que não devem ser aceitos no clã"
      class="px-5 py-3"
    >
    <v-card-title>
      <v-text-field
        @input="searchByFilter"
        v-model="filter"
        append-icon="mdi-magnify"
        label="Filtro"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="players"
      :items-per-page="5"
      :loading="loading"
      :options.sync="options"
      :server-items-length="totalBanneds"
      class="elevation-1"
    >
      <template v-slot:[`item.dataRegistro`]="{ item }">
        <span>{{ new Date(item.dataRegistro).toLocaleString() }}</span>
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
        loading: true,
        options: {},
        addDialog: false,
        player: {},
        totalBanneds: 0,
        filter: '',
        headers: [
          {
            text: 'ID',
            align: 'start',
            value: 'id',
          },
          { text: 'Nickname', value: 'nickname' },
          { text: 'Banido por', value: 'banidoPor' },
          { text: 'Data de banimento', value: 'dataBanimento' },
        ],
        players: [],
      }
    },
    mounted () {
      this.getDataFromApi()
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
      searchByFilter() {
        if(this.filter.length > 2) {
          this.getDataFromApi ();
        }
      },
      add() {
        if(this.$refs.form.validate()) {
          api.post("/players/ban", this.player)
          .then(() => {
            this.$toast.success("Banido com sucesso!", {
                dismissable: true,
                x: 'center',
                y: 'top',
                timeout: 4000,
              })
          })
          .catch((error) => {
            this.$toast.error("Falha ao efetuar o banimento: " + error.response.data.titulo, {
                dismissable: true,
                x: 'center',
                y: 'top',
                timeout: 4000,
              })
            console.log(error);
          });
          this.addDialog = false;
        }
      },
      getDataFromApi () {
        this.loading = true;
        api.get(`/players/banned?nickname=${this.filter}`)
        .then((data) => {
          if(data) {
            this.players = data.data.content;
            this.totalBanneds = data.data.totalElements;
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
