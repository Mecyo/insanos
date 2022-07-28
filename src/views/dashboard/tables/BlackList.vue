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

    <v-dialog v-model="unbanDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Tem certeza que deseja remover o banimento do player <strong style="color:green">{{this.editedItem.nickname}}</strong>?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="closeUnban">Cancelar</v-btn>
          <v-btn color="warning" @click="unbanItemConfirm">Remover Banimento</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
      <template v-slot:item.actions="{ item }">
          <v-icon
            :class="isSuperUser() || isAdminUser() ? '' : 'hidden'"
            color="success"
            small
            title="Remover ban"
            @click="removeBan(item)"
          >
            mdi-lock-open-variant
          </v-icon>
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
        unbanDialog: false,
        editedIndex: -1,
        editedItem: {
          nickname: ''
        },
        defaultItem: {
          nickname: '',
        },
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
          { text: 'Ações', value: 'actions', sortable: false },
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
      removeBan(player) {
        this.editedIndex = this.players.indexOf(player);
        this.editedItem = Object.assign({}, player);
        this.unbanDialog = true;
      },
       closeBan () {
        this.unbanDialog = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
        });
      },
      unbanItemConfirm() {
        api.get(`/players/unban/${this.editedItem.id}`)
          .then(() => {
            this.players.splice(this.editedIndex, 1);
            this.$toast.success(`Banimento do player <strong style="color:yellow;">${this.editedItem.nickname}</strong> removido com sucesso!`, {
                dismissable: true,
                x: 'center',
                y: 'top',
                timeout: 4000,
              })
          })
          .catch((error) => {
            this.$toast.error("Falha ao remover o banimento: " + error.response.data.titulo, {
                dismissable: true,
                x: 'center',
                y: 'top',
                timeout: 4000,
              })
            console.log(error);
          });
          this.unbanDialog = false;
      },
      closeUnban () {
        this.unbanDialog = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },
      isSuperUser() {
        return this.$store.state.user.permissoes.includes('ROLE_SUPER');
      },
      isAdminUser() {
        return this.$store.state.user.permissoes.includes('ROLE_ADMIN');
      },
      searchByFilter() {
        if(this.filter.length > 2) {
          this.getDataFromApi ();
        }
      },
      add() {
        if(this.$refs.form.validate()) {
          this.player.banidoPor = this.$store.state.user.nome;
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
