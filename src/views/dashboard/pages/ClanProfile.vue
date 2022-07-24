<template>
  <v-container
    id="clan-profile"
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
              Registre seu clã
            </div>

            <div class="subtitle-1 font-weight-light">
              Complete as informações de registro
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
                    label="Nome do clã"
                    v-model="clan.nome"
                    :rules="[v => !!v || 'Nome é obrigatório!']"
                  />
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
        clan: {},
      }
    },
    methods: {
      salvar () {
        if(this.$refs.form.validate()) {
          api.post("/clans", this.clan)
          .then(() => {
            this.$toast.success("Registro efetuado com sucesso", {
              dismissable: true,
              x: 'center',
              y: 'top',
              timeout: 2000,
            })
            setTimeout(()=>{
              this.$router.push("/tables/lista-clans");
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
