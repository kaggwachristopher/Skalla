<template>
    <span>{{ownerId}}{{names}}</span>
</template>
<script>
export default {
    name:"Owner",
    data(){  
        return{    
        props:{
            ownerId:String
        },
        names:"no name"
        }
    },

    async created(){
      try {
          this.names=this.props
        //get owner of an estimate
        // const response = await axios.get(`http://localhost:8081/api/estimated-estimates/` + this.projectsEstimates[0]._id);
        // this.estimated = response.data;     

      } catch(e){
        // console.error(e)
      }
    }
}
</script>