<template>
  <v-container
    id="player-list"
    fluid
    tag="section"
  >
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Tem certeza que deseja excluir o player '{{this.editedItem.nickname}}'?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="closeDelete">Cancelar</v-btn>
          <v-btn color="warning" @click="deleteItemConfirm">Excluir</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="banDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Tem certeza que deseja banir o player <strong style="color:red">{{this.editedItem.nickname}}</strong>?</v-card-title>
        <v-row>
          <v-col>
            <v-textarea
              required
              v-model="editedItem.motivoBanimento"
              outlined
              name="input-7-4"
              label="Motivo do banimento*"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="closeBan">Cancelar</v-btn>
          <v-btn color="warning" @click="banItemConfirm">Banir</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        :footer-props="{
          showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus',
        'items-per-page-all-text':'Todos',
        'items-per-page-text':'items por página',
                   
      }"
      >
        <template v-slot:[`item.dataRegistro`]="{ item }">
          <span>{{ new Date(item.dataRegistro).toLocaleString() }}</span>
        </template>
        <template v-slot:[`item.id`]="{ item }">
          <span v-if="item.dataBanimento" style="color:red;">{{ item.id }}</span>
          <span v-else >{{ item.id }}</span>
        </template>
        <template v-slot:[`item.nickname`]="{ item }">
          <span v-if="item.dataBanimento" style="color:red;">{{ item.nickname }}</span>
          <span v-else >{{ item.nickname }}</span>
        </template>
        <template v-slot:[`item.cliente.nome`]="{ item }">
          <span v-if="item.dataBanimento" style="color:red;">{{ item.cliente.nome }}</span>
          <span v-else >{{ item.cliente.nome }}</span>
        </template>
        <template v-slot:[`item.clan.nome`]="{ item }">
          <span v-if="item.dataBanimento" style="color:red;">{{ item.clan.nome }}</span>
          <span v-else >{{ item.clan.nome }}</span>
        </template>
        <template v-slot:[`item.nivel`]="{ item }">
          <span v-if="item.dataBanimento" style="color:red;">{{ item.nivel }}</span>
          <span v-else >{{ item.nivel }}</span>
        </template>
        <template v-slot:[`item.dataRegistro`]="{ item }">
          <span v-if="item.dataBanimento" style="color:red;">{{ item.dataRegistro }}</span>
          <span v-else >{{ item.dataRegistro }}</span>
        </template>
        <template v-slot:[`item.dataBanimento`]="{ item }">
          <span v-if="item.dataBanimento" style="color:red;">SIM</span>
          <span v-else >NÃO</span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            :class="isSuperUser() && !item.dataBanimento ? '' : 'hidden'"
            color="yellow"
            small
            title="Tornar admin"
            @click="setToAdmin(item)"
          >
            mdi-key-change
          </v-icon>
          <v-icon
            :class="isAdminUser() && !item.dataBanimento ? '' : 'hidden'"
            color="warning"
            small
            title="Banir player"
            @click="addToBlackList(item)"
          >
            mdi-account-cancel
          </v-icon>
          <v-icon
            :class="item.isOwner ? '' : 'hidden'"
            color="error"
            small
            title="Excluir"
            @click="deleteItem(item)"
          >
            mdi-delete
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
        dialogDelete: false,
        banDialog: false,
        editedIndex: -1,
        editedItem: {
          nickname: ''
        },
        defaultItem: {
          nickname: '',
        },
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
          { text: 'Banido?', value: 'dataBanimento' },
          { text: 'Ações', value: 'actions', sortable: false },
        ],
        players: [],
      }
    },
    watch: {
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    mounted () {
      this.getDataFromApi()
    },
    methods: {
      isSuperUser() {
        return this.$store.state.user.permissoes.includes('ROLE_SUPER');
      },
      isAdminUser() {
        return this.$store.state.user.permissoes.includes('ROLE_ADMIN');
      },
      isPlayerOwner(player) {
        return this.$store.state.user.id === player.cliente.id;
      },
      addToBlackList(player) {
        this.editedIndex = this.players.indexOf(player);
        this.editedItem = Object.assign({}, player);
        this.banDialog = true;
      },
      banItemConfirm() {
        this.editedItem.banidoPor = this.$store.state.user.nome;
        api.post("/players/ban", this.editedItem)
          .then(() => {
            this.players[this.editedIndex].dataBanimento = new Date().toLocaleString();
            this.$toast.success(`Player <strong style="color:yellow;">${this.editedItem.nickname}</strong> banido com sucesso!`, {
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
          this.banDialog = false;
      },
      setToAdmin(item) {
        const cliente = item.cliente;
        api.get(`/clientes/set-to-admin/${cliente.id}`)
        .then(() => {
          this.$toast.success(`ROLE_ADMIN adicionada ao user: ${cliente.nome} com sucesso!`, {
              dismissable: true,
              x: 'center',
              y: 'top',
              timeout: 4000,
            })
        })
        .catch((error) => {
          this.$toast.error("Falha ao adicionar ROLE_ADMIN: " + error.response.data.titulo, {
              dismissable: true,
              x: 'center',
              y: 'top',
              timeout: 4000,
            })
          console.log(error);
        });
      },
      deleteItem (item) {
        this.editedIndex = this.players.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
      },
      deleteItemConfirm () {
        api.delete(`/players/${this.editedItem.id}`)
        .then(() => {
          this.players.splice(this.editedIndex, 1);
          this.$toast.success("Player excluído com sucesso!", {
              dismissable: true,
              x: 'center',
              y: 'top',
              timeout: 4000,
            })
        })
        .catch((error) => {
          this.$toast.error("Falha ao efetuar a exclusão do player: " + error.response.data.titulo, {
              dismissable: true,
              x: 'center',
              y: 'top',
              timeout: 4000,
            })
          console.log(error);
        });
        this.closeDelete()
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      closeBan () {
        this.banDialog = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },
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
            this.players.forEach((item) => {
              item.isOwner = this.isSuperUser() || this.isPlayerOwner(item);
            });
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
