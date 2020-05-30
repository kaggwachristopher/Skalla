<template>
  <div>
    <base-header type="" id="table-head">
    </base-header>
    <div class="container-fluid mt--7">
      <div class="accordion" id="accordionExample">
        <div class="card rounded">
          <div class="col card-header border-1 text-left">
              <i class="fa fa-plus-circle" @click="newEstimateModal=true" aria-hidden="true"></i>
                  
          </div>
          <div class="card-header" id="headingOne">
              <button class="btn btn-block px-0" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
               <div class="row">
                 <div class="col text-left">Fanny</div>
                  <div class="col">Developer</div>
                 <div class="col text-right"><i class="ni ni-bold-down"></i></div>
               </div>
              </button>
      
          </div>

          <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
            <!-- <div class="col"> -->
            <!-- table for displaying details of a single pending estimate -->
            <pending-table estimateId="5ed0086941ca6525f9863fdf"></pending-table>
            <!-- </div> -->
          </div>
              <div class="row ">
            <div class="col card-header border-1 text-right">
<i class="fa fa-cloud-download-alt" aria-hidden="true"></i>
            
            </div>
            <modal :show.sync="newEstimateModal">
                <template slot="header">
                  <h3 class="modal-title" id="exampleModalLabel">Add Estimate</h3>
                </template>
                <div>
                  <form action="POST">
                     <div class="row">
                    <div class=" col-sm-3">
                      <h6 class="heading-small text-muted mb-4 float-left">Task</h6>
                    </div>
                    <div class="col-sm">
                      <base-input alternative
                        ref="first"
                        class="mb-3"
                        placeholder="Add Task here..." 
                        @keypress="clearForm">
                      </base-input> 
                    </div>
                  </div>

                  <div class="row">
                    <div class=" col-sm-3">
                      <h6 class="heading-small text-muted mb-4 float-left">Quantity</h6>
                    </div>

                    <div class="col-sm">
                      <base-input alternative
                        ref="first"
                        class="mb-3"
                        type="number"
                        placeholder="0" 
                        @keypress="clearForm">
                      </base-input> 
                    </div>
                  </div>

                  <div class="row">
                    <div class=" col-sm-3">
                      <h6 class="heading-small text-muted mb-4 float-left">Meeting Preparation</h6>
                    </div>

                    <div class="col-sm">
                      <base-input alternative
                        ref="first"
                        class="mb-3"
                        type="number"
                        placeholder="0"  
                        @keypress="clearForm">
                      </base-input> 
                    </div>
                  </div>

                  <div class="row">
                    <div class=" col-sm-3">
                      <h6 class="heading-small text-muted mb-4 float-left">Actual Meeeting</h6>
                    </div>

                    <div class="col-sm">
                      <base-input alternative
                        ref="first"
                        class="mb-3"
                        type="number"
                        placeholder="0" 
                        @keypress="clearForm">
                      </base-input> 
                    </div>
                  </div>

                  <div class="row">
                    <div class=" col-sm-3">
                      <h6 class="heading-small text-muted mb-4 float-left">Review</h6>
                    </div>

                    <div class="col-sm">
                      <base-input alternative
                        ref="first"
                        class="mb-3"
                        placeholder="0" 
                        @keypress="clearForm">
                      </base-input> 
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="heading-small text-muted mb-4 float-left">Certainity</h6>
                    </div>
                    <div class="col-sm">
                      <base-input
                      type="percentage">
                        
                      </base-input>
                    </div>
                  </div>

                  <!--div class="row">
                    <div class="col-sm-5">
                      <h6 class="heading-small text-muted mb-4 float-left">Comments </h6>
                    </div>
                  <div class="col-sm-12">
                    <base-input alternative="">
                      <textarea rows="4" v-model="estimate.taskDescription" class="form-control form-control-alternative" placeholder="Add comments here ..."></textarea>
                    </base-input>
                  </div>
                </div-->

                  </form>
                </div>

                <template slot="footer">
                  <base-button type="secondary" @click="newEstimateModal = false">Close</base-button>
                  <base-button type="danger">Add </base-button>
                </template>
              </modal>

              <!-- end of add task-->
          </div>
          </div>
    </div>
        </div>            
          </div>
</template>
<script>
import axios from "axios";
import PendingTable from "./Tables/ViewEstimateTable";
export default {
  name: "pending-estimate",
  components: {
    PendingTable
  },
  data() {
    return {
      newEstimateModal: false,
      projects:[],
      projectEstimates:[],
      projectId:""
    };
  },
    async created(){
    try{
      const response = await axios.get(`http://localhost:8081/api/projects`);
      this.projects = response.data;
      //Get the required project Id
      const requiredProject =this.projects.filter((project)=>{
        if(project.name==this.$route.params.id){
          this.projectId=project._id
        }
      })

      // 
      const estimatesResponse = await axios.get(`http://localhost:8081/api/project-estimates/`+this.projectId);
      this.projectEstimates=estimatesResponse.data;

}catch(e){
      // eslint-disable-next-line no-console
      console.error(e);      
    }
  }
};
</script>
<style>
/* Desktops and laptops ----------- */
@media only screen and (min-width: 1224px) {
  /* Styles */
  #table-head {
    /* padding-bottom: 20px; */
    min-height: 35vh;
  }
}

#table-head {
  background-color: #d10572;
  height: 35vh;
}
i {
  color: #d10572;
  font-size: 24px;
}
.card {
  margin-top: 0px;
}
</style>
