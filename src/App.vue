<template>
  <h1 class="text-center">SMASH or PASS</h1>
  <div id="conteinerUsers" v-if="this.listCandidatos.length > 0">
    <CardUser class="card" 
      :usuario="this.listCandidatos[0].usuario" 
      :orden="this.listCandidatos[0].letra" 
      :votantes="this.listCandidatos[0].votantes"
    /> 
    <CardUser class="card" 
      :usuario="this.listCandidatos[1].usuario" 
      :orden="this.listCandidatos[1].letra" 
      :votantes="this.listCandidatos[1].votantes"
    /> 
  </div>
</template>

<style>
  #app
  {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  #conteinerUsers
  {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-top: 1em;
  }

  #conteinerUsers .card
  {
    margin: 0 2em;
  }

  .contador
  {
    font-size: 3em;
    text-align: center;
    width: 100%;
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
      ]
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
      // seleccionarElementos() 
      // {
      //   var arr = this.listUsuarios;
      
      //   var numerosUsados = [];
      //   var arrUsuarios = [];

      //   while(arrUsuarios.length < 3)
      //   {
      //     var indice = Math.floor(Math.random() * arr.length);

      //     if (!numerosUsados.includes(indice)) 
      //     {
      //       var data =
      //       {
      //         usuario: arr[indice],
      //         casamiento: 0,
      //         cita: 0,
      //         fiesta: 0
      //       }
      //       arrUsuarios.push(data);
      //       numerosUsados.push(indice);
      //     }
      //   }

      //   return arrUsuarios;
      // },
      initTwitchChat() 
      {
        const client = new tmi.Client({ channels: ['akimorivt'] });

        client.connect();

        client.on('message', (channel, tags, message, self) => 
        {
          if(self) return;
          
          message = message.toUpperCase();

          if(this.votantes200.includes(tags['display-name'])) return;

          if(message == 'A')
          {            
            
            // this.porcentaje[0] = (this.cantidad[0] / (this.cantidad[0] + this.cantidad[1])) * 100;
            // this.porcentaje[1] = (this.cantidad[1] / (this.cantidad[0] + this.cantidad[1])) * 100;
                        
            this.listCandidatos[0].votantes.push(tags['display-name']);
            this.votantes200.push(tags['display-name']);
          }
          else if (message == 'B')
          {
            this.listCandidatos[1].votantes.push(tags['display-name']);
            this.votantes200.push(tags['display-name']);
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