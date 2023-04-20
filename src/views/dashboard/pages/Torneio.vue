<template>
  <v-container
    id="torneio"
    fluid
    tag="section"
  >
  <div>
    <v-card class="mb-4">
      <v-card-text>
        <v-select
          v-model="steps"
          :items="[2, 3, 4, 5, 6]"
          label="# of steps"
        ></v-select>
      </v-card-text>
    </v-card>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <template v-for="partida in torneio.left">
          <v-stepper-step
            :key="partida.id"
            :complete="e1 > partida.id"
            :step="partida.id"
            editable
          >
            <BasePartida color="#1a9bac" :partidaDTO="partida"/>
          </v-stepper-step>

          <v-divider
            v-if="partida !== steps"
            :key="partida.id"
          ></v-divider>
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content
          v-for="n in steps"
          :key="`${n}-content`"
          :step="n"
        >
          <v-card
            class="mb-12"
            color="grey lighten-1"
            height="200px"
          ></v-card>

          <v-btn
            color="primary"
            @click="nextStep(n)"
          >
            Continue
          </v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
    <div v-for="partida in torneio.left"
      :key="partida.id"
    >
      <BasePartida color="#1a9bac" :partidaDTO="partida"/>
    </div>
  </v-container>
</template>

<script>
  import api from "@/api";

  export default {

    data() {
      return {
        e1: 1,
        steps: 2,
        loading: true,
        torneio: {
          id : 0,
	        left : [],
	        right :[]
        },
        
      }
    },
    watch: {
      steps (val) {
        if (this.e1 > val) {
          this.e1 = val
        }
      },
    },
    methods: {
      nextStep (n) {
        if (n === this.steps) {
          this.e1 = 1
        } else {
          this.e1 = n + 1
        }
      },
      iniciarTorneio () {
        this.loading = true;
        debugger
        var partidas = this.getOitavasDeFinal();
        /*api.get('/torneios/iniciarTorneio')
        .then((response) => {
          if(response) {
            debugger
            this.torneio = response.data;
          }
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
        
        partidas = this.torneio.left;
        console.log(partidas);*/
      },
      getOitavasDeFinal() {
        api.get('/torneios/getOitavasDeFinal')
        .then((response) => {
          if(response) {
            debugger
            return response.data;
          }
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
      },
      getQuartasDeFinal() {
        api.get('/torneios/getQuartasDeFinal')
        .then((response) => {
          if(response) {
            debugger
            this.torneio = response.data;
          }
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
      },
      getSemiFinal() {
        api.get('/torneios/getSemiFinal')
        .then((response) => {
          if(response) {
            debugger
            this.torneio = response.data;
          }
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
      },
      getPartidaFinal() {
        api.get('/torneios/getPartidaFinal')
        .then((response) => {
          if(response) {
            debugger
            this.torneio = response.data;
          }
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
      },
    },
    mounted () {
      this.iniciarTorneio();
    },
  }
</script>
