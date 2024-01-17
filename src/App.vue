<template>
  <div id="bg"></div>
  <h1 class="titulo">SMASH or PASS</h1>
  <div id="conteinerUsers" v-if="this.listCandidatos.length > 0">
    <CardUser class="card" 
      :usuario="this.listCandidatos[0].usuario" 
      :orden="this.listCandidatos[0].letra" 
      :votantes="this.listCandidatos[0].votantes"
      :porcentaje="this.getPorcentaje(0)"
    /> 
    <span class="vs">VS</span>
    <CardUser class="card" 
      :usuario="this.listCandidatos[1].usuario" 
      :orden="this.listCandidatos[1].letra" 
      :votantes="this.listCandidatos[1].votantes"
      :porcentaje="this.getPorcentaje(1)"
    /> 
  </div>
</template>

<style>
  /* https://pictogrammers.com/library/mdi/ */

  html, body
  {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  html
  {
    background-color: black;
  }

  #bg
  {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    background: url('./assets/fondo.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    filter: blur(3px);
  }

  #app
  {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    color: white;
  }

  .titulo
  {
    font-size: 5em;
    text-align: center;
    font-family: 'Lemon', serif;
    margin: 0.25em 0;
  }

  #conteinerUsers
  {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-top: 1em;
  }

  #conteinerUsers .vs
  {
    font-size: 5em;
    font-family: 'Lemon', serif;
    margin: 0 1em; 
    display: flex;
    align-items: center;
  }
</style>

<script>
  import CardUser from "./components/CardUser.vue"
  import tmi from 'tmi.js';

  export default 
  {
    name: 'App',
    components: 
    {
      CardUser
    },
    data:() => 
    ({
      listUsuarios:
      [
        'seanvr','luizmetara1','skynimvr','kendomurft','blandship','dyarikku','yuniiho','izumivt_','shivasenshu','crixlax','teblavt','escovt','lennekitovt','hiroshivt_',
        'glubbable','kyokeru','saykaichi_','ichi_vr','mopmovies','zerochan_vt','marukakou','jsstivenvt','yeifu_vty','chasklis','aureavt','alexito_vt','espirituloco_12',
        'riskivr','miguvt','cochu_smol','nitash','voytecvr'
      ],      
      listCandidatos: 
      [
        { letra: 'A', usuario: "", votantes: [] },
        { letra: 'B', usuario: "", votantes: [] },
      ],
      usuariosVotados: []
    }),
    methods:
    {
      setRandomCandidatos() 
      {
        var num1, num2;

        for (let index = 0; index < 2; index++) 
        {        
          num1 = Math.floor(Math.random() * this.listUsuarios.length);

          if(index == 1)
          {
            num2 = Math.floor(Math.random() * this.listUsuarios.length);
            while(num1 == num2)
            {
              num2 = Math.floor(Math.random() * this.listUsuarios.length);
            }
          }
        }

        this.listCandidatos[0].usuario = this.listUsuarios[num1];
        this.listCandidatos[1].usuario = this.listUsuarios[num2];
      },
      getPorcentaje(num)
      {
        var lista = this.listCandidatos[num];
        var res = (lista.votantes.length * 100)/(this.listCandidatos[0].votantes.length + this.listCandidatos[1].votantes.length);
        return parseFloat(res.toFixed(0));
      },
      initTwitchChat() 
      {
        const client = new tmi.Client({ channels: ['akimorivt'] });

        client.connect();

        client.on('message', (channel, tags, message, self) => 
        {
          if(self) return;
          
          message = message.toUpperCase();

          if(this.usuariosVotados.includes(tags['display-name'])) return;

          if(message == 'A')
          {                        
            this.listCandidatos[0].votantes.push(tags['display-name']);
            this.usuariosVotados.push(tags['display-name']);
          }
          else if (message == 'B')
          {
            this.listCandidatos[1].votantes.push(tags['display-name']);
            this.usuariosVotados.push(tags['display-name']);
          }

        });
      },
    },
    mounted()
    {
      this.initTwitchChat();
      this.setRandomCandidatos();
    }
  }
</script>