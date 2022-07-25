<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 teal--text text--accent-3"
                        >Acessar site dos Insanos</h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>

                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mt-4">Informe seu email e senha para fazer o login</h4>
                        <v-form ref="formLogin">
                          <v-text-field
                            label="Email"
                            v-model="user.username"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="teal accent-3"
                            :rules="[v => !!v || 'E-mail é obrigatório!',
                              v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail precisa ser válido']"
                          />

                          <v-text-field
                            id="password"
                            label="Senha"
                            v-model="user.password"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                            color="teal accent-3"
                            :rules="[v => !!v || 'Senha é obrigatória!']"
                          />
                        </v-form>
                        <h3 class="text-center mt-4">Esqueceu sua senha ?</h3>
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn rounded color="teal accent-3" @click.stop.prevent="logar" dark>Logar</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Olá insano!</h1>
                        <h5
                          class="text-center"
                        >Ainda não é registrado?</h5>
                        <h5
                          class="text-center"
                        >Clique no botão abaixo e preencha suas informações pessoais para iniciar sua jornada conosco!</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step++">CADASTRAR-SE</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Bem vindo de volta!</h1>
                        <h5
                          class="text-center"
                        >Para fazer login, e poder se registrar nos torneios, clique no botão abaixo e informe seu email e senha:</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--">Login</v-btn>
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-row justify="center">
                        <v-col
                          cols="12"
                          md="12"
                        >
                          <base-material-card>
                            <template v-slot:heading>
                              <div class="display-2 font-weight-light">
                                Cadastrar-se
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
                                      v-model="cliente.nome"
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
                                      v-model="cliente.email"
                                      :rules="[v => !!v || 'E-mail é obrigatório!',
                                        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail precisa ser válido']"
                                    />
                                  </v-col>

                                  <v-col cols="12" md="6">
                                    <vue-tel-input-vuetify v-model="cliente.telefone"
                                      label="Telefone (DDD-Número)"
                                      class="purple-input"
                                      :rules="[v => !!v || 'Telefone é obrigatório!']">
                                    </vue-tel-input-vuetify>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-form>
                          </base-material-card>
                        </v-col>
                      </v-row>
                      <div class="text-center mt-n5">
                        <v-btn rounded color="teal accent-3" @click.stop.prevent="salvar" dark>SALVAR</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import VueTelInputVuetify from "vue-tel-input-vuetify/lib/vue-tel-input-vuetify.vue"
import api from "@/api";

  export default {
    components: {
      VueTelInputVuetify,
    },
    props: {
      source: String
    },
    data() {
      return {
        step: 1,
        clans: [{id: 1, nome: "Insanos"}, {id: 2, nome: "Terroristas"}, {id: 3, nome: "Irmandade"}, {id: 4, nome: "Outros"}],
        cliente: {},
        user: {},
      }
    },
    methods: {
      logar() {
        if (this.$refs.formLogin.validate()) {
          this.$store.dispatch('login', this.user)
          .then((data) => {
              this.$router.replace({
                path: 'app/dashboard',
              });
            })
            .catch((error) => {
              if (error.response && error.response.data && error.response.data.error) {
                this.$toast.error("Falha ao efetuar o login: " + error.response.data.error, {
                  dismissable: true,
                  x: 'center',
                  y: 'top',
                  timeout: 4000,
                })
              }
              console.log(error);
            });
        }
      },
      salvar () {
        if(this.$refs.form.validate()) {
          api.post("/clientes/cadastro", this.cliente)
          .then(() => {
            this.$toast.success("Registro efetuado com sucesso! Você receberá sua senha de acesso no email informado no cadastro.", {
              dismissable: true,
              x: 'center',
              y: 'top',
              timeout: 4000,
            });
            this.step--;
            this.cliente = {};
            this.$refs.form.reset();
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
