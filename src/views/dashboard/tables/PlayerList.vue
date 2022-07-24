<template>
  <v-container
    id="player-list"
    fluid
    tag="section"
  >
    <v-btn
      v-can="'ROLE_SUPER'"
      color="success"
      class="mr-0"
      @click.stop.prevent="enviarEmailSenha"
    >
      Enviar Senhas
    </v-btn>
    <base-material-card
      color="success"
      dark
      icon="mdi-clipboard-text"
      title="Veja quem já se inscreveu"
      class="px-5 py-3"
    >
      <v-data-table
      :headers="headers"
      :items="players"
      :items-per-page="5"
      :loading="loading"
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
        headers: [
          {
            text: 'ID',
            align: 'start',
            value: 'id',
          },
          { text: 'Nickname', value: 'nickname' },
          { text: 'Nome', value: 'cliente.nome' },
          { text: 'Clã', value: 'clan.nome' },
          { text: 'Nível', value: 'nivel' },
          { text: 'Data de registro', value: 'dataRegistro' },
        ],
        players: [],
      }
    },
    mounted () {
      this.getDataFromApi()
    },
    methods: {
      enviarEmailSenha() {
        const ids = this.players.map(function(item){
          return item.cliente.id;
        });

        api.post("/clientes/send-mail-pass", ids)
        .then(() => {
          this.$toast.success("E-mail's enviados com sucesso!", {
              dismissable: true,
              x: 'center',
              y: 'top',
              timeout: 4000,
            })
        })
        .catch((error) => {
          this.$toast.error("Falha ao efetuar o envio dos e-mail's: " + error.response.data.titulo, {
              dismissable: true,
              x: 'center',
              y: 'top',
              timeout: 4000,
            })
          console.log(error);
        });
      },
      getDataFromApi () {
        this.loading = true
        api.get("/players")
        .then((data) => {
          if(data) {
            this.players = data.data;
          }
          this.loading = false
        })
        .catch((error) => {
          console.log(error);
        });
      },
    },
  }
</script>
