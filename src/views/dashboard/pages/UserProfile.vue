<template>
  <v-container
    id="user-profile"
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
              Registrar-se
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
                  md="6"
                >
                  <v-text-field
                    label="Nome completo"
                    v-model="player.nome"
                    :rules="[v => !!v || 'Nome é obrigatório!']"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="E-mail"
                    class="purple-input"
                    v-model="player.email"
                    :rules="[v => !!v || 'E-mail é obrigatório!',
                      v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail precisa ser válido']"
                  />
                </v-col>

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

                <v-col cols="12" md="4">
                  <vue-tel-input-vuetify v-model="player.telefone"
                    label="WhatsApp (DDD-Número)"
                    class="purple-input"
                    :rules="[v => !!v || 'Telefone é obrigatório!']">
                  </vue-tel-input-vuetify>
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

      <v-col
        cols="12"
        md="4"
      >
        <base-material-card
          class="v-card-profile"
          avatar="../../../../profile.png"
        >
          <v-card-text class="text-center">
            <h6 class="display-1 mb-1 grey--text">
              DESENVOLVEDOR/ORGANIZADOR
            </h6>

            <h4 class="display-2 font-weight-light mb-3 black--text">
              Emerson Santos (Mecyo)
            </h4>

            <p class="font-weight-light grey--text">
              Criei este torneio, inicialmente, para animar a galera do clã.
              <br>Agora estamos disponibilizando para todos participarem.
              <br>Divirtam-se!
            </p>

            <v-btn
              color="success"
              rounded
              class="mr-0"
            >
              Seguir
            </v-btn>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueTelInputVuetify from "vue-tel-input-vuetify/lib/vue-tel-input-vuetify.vue"
import api from "@/api";

  export default {
    components: {
      VueTelInputVuetify,
    },
    data() {
      return {
        clans: [],
        player: {},
      }
    },
    created () {
      api.get("/clans")
        .then((data) => {
          if(data) {
            this.clans = data.data;
          }
        })
        .catch((error) => {
          this.$toast.error("Falha ao buscar registros de clãs: " + error.response.data.titulo, {
            dismissable: true,
            x: 'center',
            y: 'top',
            timeout: 4000,
          })
          console.log(error);
        });
    },
    methods: {
      salvar () {
        if(this.$refs.form.validate()) {
          api.post("/players", this.player)
          .then(() => {
            this.$toast.success("Registro efetuado com sucesso", {
              dismissable: true,
              x: 'center',
              y: 'top',
              timeout: 2000,
            })
            setTimeout(()=>{
              this.$router.push("/tables/player-list");
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
