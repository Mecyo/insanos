<template>
  <v-container
    id="player-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Registre seu player
            </div>

            <div class="subtitle-1 font-weight-light">
              Complete seu registro
            </div>
          </template>

          <v-form ref="form" class="mx-2" lazy-validation>
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    class="purple-input"
                    label="Nick no jogo"
                    v-model="player.nickname"
                    :rules="[v => !!v || 'Nick é obrigatório!']"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-select
                    class="purple-input"
                    item-text="nome"
                    item-value="id"
                    :items="clans"
                    return-object
                    label="Clã"
                    v-model="player.clan"
                    :rules="[v => !!v && v.id != 0 || 'Clã é obrigatório!']"
                  ></v-select>
                </v-col>

                <v-col
                  cols="12"
                  md="2"
                >
                  <v-select
                    :items="[1,2,3,4,5,6,7,8,9,10,10,11,12,13,14]"
                    label="Nível"
                    v-model="player.nivel"
                    :rules="[v => !!v || 'Nível é obrigatório!']"
                  ></v-select>
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                    @click.stop.prevent="salvar"
                  >
                    Salvar
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/api";

  export default {
    data() {
      return {
        clans: [{id: 1, nome: "Insanos"}, {id: 2, nome: "Terroristas"}, {id: 3, nome: "Irmandade"}, {id: 4, nome: "Outros"}],
        player: {},
      }
    },
    methods: {
      salvar () {
        if(this.$refs.form.validate()) {
          this.player.cliente = {id: this.$store.state.user.id, email: this.$store.state.user.email, nome: this.$store.state.user.nome, telefone: '123'};
          api.post("/players", this.player)
          .then(() => {
            this.$toast.success("Registro efetuado com sucesso", {
              dismissable: true,
              x: 'center',
              y: 'top',
              timeout: 2000,
            })
            setTimeout(()=>{
              this.$router.push("player-list");
            },2000);
            console.log('Registro efetuado com sucesso');
          })
          .catch((error) => {
            this.$toast.error("Falha ao efetuar o registro: " + error.response.data.titulo, {
              dismissable: true,
              x: 'center',
              y: 'top',
              timeout: 4000,
            })
            console.log(error);
          });
        }
      },
    },
  }
</script>
