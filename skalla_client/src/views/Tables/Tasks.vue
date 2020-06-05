<template>
    <tbody>
    <tr v-for="estimate in estimates" :key="estimate._id">
      <td scope="row">{{estimate.task}}</td>
      <td>{{estimate.research}}</td>
      <td>{{estimate.planning}}</td>
      <td>{{estimate.development}}</td>
      <td>{{estimate.testing}}</td>
      <td>{{estimate.stabilization}}</td>
      <td>{{estimate.certainty}}</td>
      <td>{{estimate.sum}}</td>
      <td>{{estimate.adjustedSum}}</td>
      <td colspan="10">{{estimate.comments}}</td>
    </tr>
  </tbody>
</template>
<script>
import axios from 'axios'

export default {
    name:'Tasks',
     props:{
        requestId:String
    },
    data(){
       return{
         projectManagerId:this.$store.getters.getUser.id,
         estimates:[]
       }
    },
    async created(){
        //get current request estimates
        const response = await axios.get("http://localhost:8081/api/get/" + this.requestId + "/" + this.projectManagerId);
        this.estimates = response.data;  
    }
}
</script>
