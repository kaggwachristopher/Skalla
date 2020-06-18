<template>
  <div>
    <base-header type="" id="table-head">
    </base-header>
    <div class="container-fluid mt--7">
        <div class="card rounded">
          <div class="col card-header border-1 text-left">
              <i @click="newEstimateModal=true" class="fa fa-plus-circle" aria-hidden="true"></i> 
          </div>
            <div>
                  <ViewEstimateTable :projectEstimates='projectEstimates'>
                  </ViewEstimateTable>
            </div>
            <div>
              <PmEstimateTable :pmEstimates='pmEstimate' ref="PmEstimateTable">
              </PmEstimateTable>
            </div>
        
        </div>
          <div class="row ">
            <div class="col card-header border-1 text-right">
              <i class="fa fa-cloud-download-alt" aria-hidden="true"></i>
            </div>       
</div>
          </div>
          <modal :show.sync="newEstimateModal">
                <template slot="header">
                  <h3 class="modal-title" id="exampleModalLabel">Add Estimate</h3>
                </template>
                <div>
            <form action="POST">
            <div class="row mt--4">
           <div class="col-sm-2"></div>
            <div class="col-sm-3">
              <h6 class="heading-small text-capitalize float-right  text-resize">Sum hours:</h6>
            </div>
            <div class="col-sm-2 ml-2">
              <h6 class="heading-small  text-capitalize float-left  text-resize">{{calculatedSumHours}} hrs</h6>
            </div> 
            <div class="col-sm-3 ">
              <h6 class="heading-small text-capitalize float-left  text-resize ">Adjusted Sum:</h6>
            </div>
            <div class="col-sm-2 ml--3">
              <h6 class="heading-small  text-capitalize float-left  text-resize">{{calculatedAdjustedSumHours}} hrs</h6>
            </div>
          </div>
                     <div class="row">
                    <div class=" col-sm-3">
                      <h6 class="heading-small text-muted mb-4 float-left">Task</h6>
                    </div>
                    <div class="col-sm">
                      <base-input alternative
                        ref="first"
                        class="mb-3"
                        placeholder="Add Task here..." 
                        v-model="estimateData.task"
                        >
                        
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
                        placeholder="1" 
                        v-model='estimateData.quantity'
                        >
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
                        v-model="estimateData.meetingPreparation"
                        >
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
                        v-model="estimateData.actualMeeting"
                        >
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
                        v-model="estimateData.meetingReview"
                       >
                      </base-input> 
                    </div>
                  </div>

                  <div class="row">
                    <div class=" col-sm-3">
                      <h6 class="heading-small text-muted mb-4 float-left">Consultants</h6>
                    </div>

                    <div class="col-sm">
                      <base-input alternative
                        ref="first"
                        class="mb-3"
                        type="number"
                        placeholder="0" 
                        v-model='estimateData.consultants'
                        >
                      </base-input> 
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="heading-small text-muted mb-4 float-left">Certainity</h6>
                    </div>
                    <div class="col-sm">
                      <base-input alternative
                      type="percentage">
                        <select class="custom-select" id="inputGroupSelect01" v-model="estimateData.certainity">
                          <option disabled value="">Please select</option>
                          <option v-for="(certainityValue,index) in certainityList" :key="index">{{certainityValue.certainity}}</option>
                          </select>
                      </base-input>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-5">
                      <h6 class="heading-small text-muted mb-4 float-left">Comments </h6>
                    </div>
                  <div class="col-sm-12">
                    <base-input alternative="">
                      <textarea rows="3" class="form-control form-control-alternative" placeholder="Add comments here ..."></textarea>
                    </base-input>
                  </div>
                </div>

                  </form>
                </div>

                <template slot="footer">
                  <base-button type="secondary" @click="newEstimateModal = false">Close</base-button>
                  <base-button type="danger" @click="this.addEstimate">Add </base-button>
                </template>
              </modal>
          </div>     
                        <!-- end of add task-->      
          <!-- </div> -->
</template>
<script>
import axios from "axios";
import ViewEstimateTable from "./Tables/ViewEstimateTable";
import PmEstimateTable from "./Tables/PmEstimateTable"
export default {
  name: "pending-estimate",
  components: {
    ViewEstimateTable,
    PmEstimateTable
  },
  data() {
    return {
      newEstimateModal: false,
      projects:[],
      projectEstimates:[],
      projectId:"",
      pmEstimate:[],
      estimateData:{
        task:'',
        quantity:1,
        meetingPreparation:0,
        actualMeeting:0,
        meetingReview:0,
        consultants:0,
        certainity:0
      },
      certainityList: [
          { 
            id: 1,
            certainity: 60 
          },
          { 
            id: 2,
            certainity: 65 
          },
          { 
            id: 3,
            certainity: 70 
          },
          { 
            id: 4,
            certainity: 75
          },
          { 
            id: 5,
            certainity: 80
          },
          { 
            id: 6,
            certainity: 85 
          },
          { 
            id: 7,
            certainity: 90 
          }
        ]
    }
    },
    async created(){
    try{
      const response = await axios.get(`/api/projects`);
      this.projects = response.data;
      //Get the required project Id
      const requiredProject =this.projects.filter((project)=>{
        if(project.name==this.$route.params.id){
          this.projectId=project._id
        }
      })
      requiredProject;
      // Get developer estimates of specific project
      const estimatesResponse = await axios.get(`/api/project-estimates/`+this.projectId);
      this.projectEstimates=estimatesResponse.data;

      // Goet project manager estimates of a specific project
      const pmEstimatesResponse = await axios.get(`/api/pm-estimate/`+this.projectId);
      this.pmEstimate=pmEstimatesResponse.data;

}catch(e){
      // eslint-disable-next-line no-console
      // console.error(e);      
    }
  },
computed: {
      calculatedSumHours: function(){
        if (this.estimateData.meetingPreparation === '' && this.estimateData.actualMeeting === ''&& this.estimateData.meetingReview === '') {
          return 0
        }else{
          return ((this.estimateData.quantity)*(parseInt(this.estimateData.meetingPreparation) + parseInt(this.estimateData.actualMeeting) + parseInt(this.estimateData.meetingReview))).toFixed(2);
        }
      },
      calculatedAdjustedSumHours: function(){
        return (parseInt(this.calculatedSumHours) * (1 + (1 - parseInt(this.estimateData.certainity) / 100))).toFixed(2)
      },
      // calculatedTotalResearch: function(){
      //   return estimateData.research
      // },
      invalidTask(){
        return this.estimateData.task === ''
      },
      invalidmeetingPreparationTime(){
          return this.estimateData.meetingPreparation=== '' || isNaN( this.estimateData.meetingPreparation)
      },
      invalidactualTime(){
          return this.estimateData.actual === '' || isNaN(this.estimateData.actual)
      },
      invalidmeetingReviewTime(){
          return this.estimateData.meetingReview === '' || isNaN(this.estimateData.meetingReview)
      },
      invalidquantity(){
          return this.estimateData.quantity === '' || isNaN(this.estimateData.quantity)
      },
      invalidCertainity(){
          return this.estimateData.testing === ''
      },
      
    },
    methods:{
      async addEstimate(){
          let newEstimate ={
            owner: this.$store.getters.getUser.id,
            task: this.estimateData.task,
            meetingPreparation: this.estimateData.meetingPreparation,
            actualMeeting: this.estimateData.actualMeeting,
            meetingReview: this.estimateData.meetingReview,
            quantity: this.estimateData.quantity,
            certainity: this.estimateData.certainity,
            consultants:this.estimateData.consultants,
            project:this.projectId,
        }
        await axios.post("/api/pm-estimate/"+this.projectId,newEstimate)
         this.$refs.PmEstimateTable.appendEstimate(newEstimate);
},
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
