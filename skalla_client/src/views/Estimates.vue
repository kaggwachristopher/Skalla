<template>
  <div>
    <base-header type="" id="table-head"> </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <!-- <estimates-table title="Light Table" :estimates="estimates" @edit:estimate="editEstimate"></estimates-table>                     -->
          <estimates-table :estimates="estimates"></estimates-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EstimatesTable from "./Tables/ListOfEstimatesTable";
import CreateEstimateForm from "./Forms/CreateEstimateForm";
import axios from "axios";
import service from "../services/AuthService";
import router from "../router";
export default {
  name: "estimates",
  components: {
    EstimatesTable
  },
  data() {
    return {
      estimates: [],
      consultant:true
    };
  },
  //fetches estimates when the component is created
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      router.push("/");
    }
    try {
      if (this.$store.getters.getUser.role=="Consultant"){
      // Getting the id of the consultant and showing estimate requests specific to them
      // const loggedInProjectManager = this.$store.getters.getUser.id;
      const res = await axios.get( `/api/estimate-requests`);
      const allEstimates = res.data;
      // alert(this.$store.getters.getUser)
      for (const estimate of allEstimates){
        if (estimate.project.consultant && estimate.project.consultant==this.$store.getters.getUser.name){
          this.estimates.push(estimate)
        }else{
          continue
}
      }                
      }else if(this.$store.getters.getUser.role=="Project Manager"){
      // Getting the id of the loggedInProjectManager and showing estimate requests specific to them
      const loggedInProjectManager = this.$store.getters.getUser.id;
      const res = await axios.get( `/api/estimate-requests/` + loggedInProjectManager );
      this.estimates = res.data;
      }
      // Remove duplicated projects from the list of estimates table
      this.estimates =this.estimates.filter((v,i,a)=>a.findIndex(t=>(t.project.name === v.project.name))===i)
      // console.log(this.estimates);s
    } catch (e) {
      // console.error(e)
    }
  }
};
</script>
<style>
#table-head {
  background-color: #d10572;
  height: 35vh;
}
</style>
