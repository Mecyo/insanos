<template>
  <v-card
    class="mx-auto my-12"
    max-width="130"
    max-height="65"
    :color="color"
    dark
  >
    <v-row align="center">
      <v-col
        class="d-flex pa-1"
        cols="8"
        sm="8"
      >
        <v-card-title>
            <div v-if="verifyWinner(partidaDTO.playerOne.nickname)" style="color: red !important; font-size: 10px !important;">{{ partidaDTO.playerOne.nickname }}</div>
            <div v-else style="color: #fffff !important; font-size: 10px !important;">{{ partidaDTO.playerOne.nickname }}</div>
        </v-card-title>
      </v-col>
      <v-col
        class="d-flex"
        cols="1"
        sm="1"
      >
        <v-radio v-if="!disableWinner" :v-model="winner" @change="selectWinner('playerOne')" value="playerOne"></v-radio>
        <v-icon color="error" v-if="verifyWinner(partidaDTO.playerOne.nickname)">mdi-trophy-award</v-icon>
      </v-col>
    </v-row>

    <v-divider class="mx-1"></v-divider>

    <v-row align="center">
      <v-col
        class="d-flex pa-1"
        cols="8"
        sm="8"
      >
        <v-card-title>
            <div v-if="verifyWinner(partidaDTO.playerTwo.nickname)" style="color: red !important; font-size: 10px !important;">{{ partidaDTO.playerTwo.nickname }}</div>
            <div v-else style="color: #fffff !important; font-size: 10px !important;">{{ partidaDTO.playerTwo.nickname }}</div>
        </v-card-title>
      </v-col>
      <v-col
        class="d-flex"
        cols="1"
        sm="1"
      >
        <v-radio v-if="!disableWinner" :v-model="winner" @change="selectWinner('playerTwo')" value="playerTwo"></v-radio>
        <v-icon color="error" v-if="verifyWinner(partidaDTO.playerTwo.nickname)">mdi-trophy-award</v-icon>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
  export default {
    name: 'Partida',
    props: {
      partidaDTO: {
        type: Object,
        default: {
          id : 0,
          playerOne : {id: 0, nickname: ''},
          playerTwo : {id: 0, nickname: ''},
          winner : {id: 0, nickname: ''},
          next : {id: 0, nickname: ''},
          previousOne : {id: 0, nickname: ''},
          previousTwo : {id: 0, nickname: ''}
        }
      },
      color: {
        type: String,
        default: 'info'
      },
    },
    data: () => ({
      winner: '',
      disableWinner: false,
    }),
    methods: {
      verifyWinner(name) {
        return this.partidaDTO && this.partidaDTO.winner && this.partidaDTO.winner.nickname === name;
      },
      setPlayerNextPartida(player) {
        if(this.partidaDTO.id == this.partidaDTO.next.previousOne) {
          this.partidaDTO.next.playerOne = player;
        } else {
          this.partidaDTO.next.playerTwo = player;
        }

        return player;
      },
      selectWinner(playerWinner) {
        switch(playerWinner) {
          case 'playerOne': {
            this.partidaDTO.winner = this.setPlayerNextPartida(this.partidaDTO.playerOne);
          };
          break;
          case 'playerTwo': {
            this.partidaDTO.winner =  this.setPlayerNextPartida(this.partidaDTO.playerTwo);
          };
          break;
        }

        this.disableWinner = true;
      }
    },
  }
</script>
<style>
  .force-color-grey {
    color: grey !important;
    font-size: 10px !important;
  }

  .force-color-error {
    color: #1a9bac !important;
    font-size: 10px !important;
  }

</style>