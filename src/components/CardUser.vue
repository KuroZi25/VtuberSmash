<template>
  <v-card class="cardUser" width="200" variant="text" :style="{opacity: this.opacity}">
    <h1 class="cardUser_orden text-center"> {{ this.orden }} </h1>
    
    <div class="contentImg">
      <div v-if="this.porcentaje != null" class="contador">{{ this.porcentaje }}</div>
      <v-img class="cardUser_img" :src='datos.profile_image_url'/>
    </div>

    <h2 class="cardUser_name"> {{ datos.display_name }} </h2>
    <h3 class="cardUser_cantidad text-center">{{ this.votantes.length }}</h3>
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
    width: 200px;
    transition: opacity 0.5s ease-in-out;
  }

  .cardUser .cardUser_img
  {
    border: 4px solid black; 
    border-radius: 8px; 
    padding: 10px; 
    box-shadow: 0 0 50px #00000062;
    min-width: 200px;
    min-height: 200px;
    background-color: white;
  }

  .cardUser .cardUser_name
  {
    text-align: center;
    border: 3px solid black;
    border-radius: 8px;
    margin:0.15em 0;
    background-color: white;
    text-transform: capitalize;
    min-height: 42px;
  }

  .cardUser .cardUser_votantes
  {
    display: flex;
    flex-direction: column;
  }
</style>