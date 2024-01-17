<template>
  <v-card class="cardUser" variant="text" :style="{opacity: this.opacity}">
    <h1 class="cardUser_orden text-center"> {{ this.orden }} </h1>
    
    <div class="contentImg">
      <div v-if="!isNaN(this.porcentaje)" class="contador">{{ this.porcentaje }}</div>
      <v-img class="cardUser_img" :src='datos.profile_image_url'/>
    </div>

    <h2 class="cardUser_name"> {{ datos.display_name }} </h2>
    
    <div class="cardUser_votantes antidad text-center">
      <span v-for="votante in votantes" :key="votante">{{ votante }}</span>
    </div>
  </v-card>
</template>

<script>
import axios from 'axios';

export default 
{
  name: 'CardUser',
  props:
  {
    orden: null,
    usuario: null,
    votantes: null,
    porcentaje: null
  },
  data: () => 
  ({
    datos: {},
    disabled: false,
    opacity: 0,
  }),
  methods:
  {
    async getUserData()
    {
      const url = "https://id.twitch.tv/oauth2/token";
      const params = new URLSearchParams({ client_id: this.$clientID, client_secret: this.$clientSecret, grant_type: 'client_credentials'});
      const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };

      const response = await axios.post(url, params, config);
      const access_token = response.data.access_token;

      const data = await axios.get('https://api.twitch.tv/helix/users?login='+this.usuario, { headers: { 'Authorization': `Bearer ${access_token}`, 'Client-Id': this.$clientID } });
      
      var display_name = data.data.data[0].display_name;
      var profile_image_url = data.data.data[0].profile_image_url;

      return { display_name: display_name, profile_image_url: profile_image_url };
    },
    getDataUser()
    {
      this.getUserData().then((userData) => { this.datos = userData; this.opacity = 1; });      
    }
  },
  mounted()
  {
    this.getDataUser();
  }
}
</script>

<style>
  .cardUser
  {
    width: 20em;
    transition: opacity 0.5s ease-in-out;
  }

  .cardUser .cardUser_orden
  {
    font-size: 5em;
    font-family: 'Archivo Black', sans-serif;
  }

  .cardUser .contentImg
  {
    position: relative;
    width: 100%;
    height: 20em;
    border: 4px solid black; 
    border-radius: 8px; 
    box-shadow: 0 0 50px #00000062;
    background-color: white;
  }

  .cardUser .contentImg .contador
  {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: rgba(255, 255, 255, 0.85);
    font-size: 5em;
    font-family: 'Archivo Black', sans-serif;
  }

  .cardUser .cardUser_name
  { 
    display: flex;   
    align-items: center;
    justify-content: center;
    height: 2em;
    border: 3px solid black;
    border-radius: 8px;
    margin: 0.15em 0;
    font-size: 2em;
    color: black;
    background-color: white;
    text-transform: capitalize;
    font-family: 'Archivo Black', sans-serif;
  }

  .cardUser .cardUser_votantes
  {
    display: flex;
    flex-direction: column;
  }

  .cardUser .cardUser_votantes span
  {
    font-size: 1.2em;
    font-family: 'Archivo Black', sans-serif;
  }
</style>