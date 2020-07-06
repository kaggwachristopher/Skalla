<template>
  <div>
    <base-header type="" id="table-head">
    </base-header>
    <div class="container-fluid mt--7">
        <div class="card rounded">
          <div class="row">
          <div class="col card-header border-1 text-left">
              <i @click="newEstimateModal=true" class="fa fa-plus-circle" aria-hidden="true"></i>  
          </div>
          <div class="col card-header border-1 text-right" v-if="this.$store.getters.getUser.role=='Project Manager'">
              <base-button type="primary" @click="consultantEstimateModal = true">
              Add consultant Estimate
            </base-button>
          </div>
          </div>
            <div>
                  <ViewEstimateTable :projectEstimates='projectEstimates' :project='currentProject[0]' ref='ViewEstimateTable'>
                  </ViewEstimateTable>
            </div>
            <div>
              <PmEstimateTable :pmEstimates='pmEstimate' :pmId='pmId' role="Project Manager" ref="PmEstimateTable">
              </PmEstimateTable>
            </div>
            <div>
              <PmEstimateTable :pmEstimates='consultantEstimate' :pmId='consultantName' role="Consultant" ref="PmEstimateTable">
              </PmEstimateTable>
            </div>
        </div>
          <div class="row">
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

                  <div class="row" v-if="this.$store.getters.getUser.role=='Project Manager'">
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
            <div class="row text-center">
                    
                    <p v-if="error && submitting" class="error-message">
                            ❗All Fields required
                        </p>
                        <p v-if="success" class="success-message" v-show="showSuccess">
                            ✅ Successfully Added Task
                        </p>
                  </div>
                <template slot="footer">
                  <base-button type="secondary" @click="newEstimateModal = false">Close</base-button>
                  <base-button type="danger" @click="this.addEstimate">Add </base-button>

                </template>
              </modal>
                <!--Project setup modal starts here -->
                <modal :show.sync="projectSetupModal">
                  <template slot="header">
                    <h3 class="modal-title " id="exampleModalLabel">Project Setup</h3>
                  </template>
                  <div class="row">
                    <div class=" col-sm-3">
                      <h6 class="heading-small text-muted mb-4 float-left">Developers</h6>
                    </div>
                    <div class="col-sm">
                      <base-input alternative
                        ref="first"
                        class="mb-3" v-model="projectSetup.developers">
                      </base-input> 
                    </div>
                  </div>

                  <div class="row">
                    <div class=" col-sm-3">
                      <h6 class="heading-small text-muted mb-4 float-left">D. Scrum(Mins)</h6>
                    </div>
                    <div class="col-sm">
                      <base-input alternative
                        ref="first"
                        class="mb-3" type="number" placeholder="0" v-model="projectSetup.dailyScrum">
                      </base-input> 
                    </div>
                  </div>

                  <div class="row">
                    <div class=" col-sm-3">
                      <h6 class="heading-small text-muted mb-4 float-left">PM's Involved</h6>
                    </div>
                    <div class="col-sm">
                      <base-input alternative
                        ref="first"
                        class="mb-3" type="number" placeholder="0" v-model="projectSetup.pmsInvolved">
                      </base-input> 
                    </div>
                  </div>

                  <div class="row">
                    <div class=" col-sm-3">
                      <h6 class="heading-small text-muted mb-4 float-left">PM Overhead(%)</h6>
                    </div>
                    <div class="col-sm">
                      <base-input alternative
                        ref="first"
                        class="mb-3" type="percentage" placeholder="0" v-model="projectSetup.pmOverhead">
                      </base-input> 
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-5">
                      <h6 class="heading-small text-muted mb-4 float-left">Comments </h6>
                    </div>
                  <div class="col-sm-12">
                    <base-input alternative="">
                      <textarea rows="3" class="form-control form-control-alternative" placeholder="Add comments here ..." v-model="projectSetup.comments"></textarea>
                    </base-input>
                  </div>
                </div>
                  <div class="row text-center">  
                    <p v-if="setupError && submittingSetup" class="error-message">
                            ❗All Fields required
                        </p>
                        <p v-if="success" class="success-message" v-show="showSetupSuccess">
                            ✅ Successfully Added Project Setup
                        </p>
                  </div>
                <template slot="footer">
                  <!-- <base-button type="secondary" @click="projectSetupModal = false">Close</base-button> -->
                  <base-button type="primary" @click="this.addProjectsetup">Add</base-button>
                </template>

                </modal>
                <!--Project setup modal ends here -->
                <modal :show.sync="consultantEstimateModal">
              <template slot="header">
                  <h3 class="modal-title" id="exampleModalLabel">Add Consultants Estimate</h3>
              </template>

              <form method="POST" role="form" @submit.prevent="addEstimate">
                <div>
                <div class="row">
                  <div class="col-sm-3">
                      <h6 class="heading-small text-muted mb-4 float-left">Assign to</h6>
                  </div>
                  <div class="col-sm">
                    <base-input alternative
                      class="mb-3"
                      placeholder="Add Consultants here...">
                      <select class="custom-select" id="inputGroupSelect01" v-model="consultantRequest.consultant">
                          <option value="" disabled>Please select a consultant</option>
                          <option  v-for="(consultant,index) in consultants" :key='index' :value="consultant.name" > {{consultant.name}}</option>
                      </select>
                    </base-input>
                  </div>
                </div>

                <!-- <div class="row">
                  <div class="col-sm-3">
                      <h6 class="heading-small text-muted mb-4 float-left">Due Date</h6>
                  </div>
                  <div class="col-sm">
                    <base-input addon-left-icon="ni ni-calendar-grid-58">
                        <flat-picker slot-scope="{focus, blur}"
                          @on-open="focus"
                          @on-close="blur"
                          :config="{allowInput: true, dateFormat: 'd-m-Y'}"
                          placeholder="17-07-2019"
                          class="form-control datepicker"
                          :class="{ 'has-error': submitting && invalidDueDate }"
                         >
                        </flat-picker>
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="heading-small text-muted mb-4 float-left">Title</h6>
                  </div>
                  <div class="col-sm">
                    <base-input alternative
                      class="mb-3"
                      placeholder="Add title here...">
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-5">
                    <h6 class="heading-small text-muted mb-4 float-left">Main Task Description </h6>
                  </div>
                  <div class="col-sm-12">
                    <base-input alternative=""
                    :class="{ 'has-error': submitting && invalidTaskDescription }"

                    >
                      <textarea rows="4"  class="form-control form-control-alternative" placeholder="Add main task description here ..."></textarea>
                    </base-input>
                  </div>
                  </div> -->
                </div>

                <p v-if="error && submitting" class="error-message">
                    ❗Please fill in all fields
                </p>
                <p v-if="success" class="success-message" v-show="showSuccess">
                    ✅ Request successfully sent
                </p>
                <base-button class="shadow-none mt-4 cancel-color" type="secondary" @click="handleSaveDraft()" >Save as draft</base-button>
                <!-- <base-button class="shadow-none mt-4" type="primary" @click="addEstimate">Send request</base-button> -->
                <base-button class="shadow-none mt-4" type="primary" @click="this.sendRequest" >Send request</base-button>
              </form>

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
      projectSetupModal: false,
      consultantEstimateModal: false,
      projects:[],
      pmId:'',
      consultantName:'',
      requestConsultant:false,
      projectEstimates:[],
      projectId:"",
      pmEstimate:[],
      consultantEstimate:[],
      consultants:[],
      projectSetup:{
        developers:0,
        pmsInvolved:0,
        dailyScrum:0,
        pmOverhead:0,
        comments:"",
      },
      consultantRequest:{
        consultant:""
      }
      ,
      currentProject:[],
      estimateData:{
        task:'',
        quantity:1,
        meetingPreparation:0,
        actualMeeting:0,
        meetingReview:0,
        consultants:0,
        certainity:0,
        sum:0,
        adjustedSum:0
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
        ],
        error:false,
        setupError:false,
        success:false,
        setupSuccess:false,
        submitting: false,
        submittingSetup:false,
        showSuccess:true,
        showSetupSuccess:true,
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
      // Get developer estimates of specific project
      const estimatesResponse = await axios.get(`/api/project-estimates/`+this.projectId);
      this.projectEstimates=estimatesResponse.data;

      name = estimatesResponse.data[0].projectManager
      const pmResponse = await axios.get('api/users/developer/'+ name);
      if(this.$store.getters.getUser.role=="Project Manager"){
              this.pmId = "My Estimate";
      }else if(this.$store.getters.getUser.role=="Consultant"){
              this.pmId = pmResponse.data.name
      }

      // if(this.$store.getters.getUser.role=="Project Manager"){
      // Get project manager estimates of a specific project
      const pmEstimatesResponse = await axios.get(`/api/pm-estimate/`+this.projectId);
      this.pmEstimate=pmEstimatesResponse.data;
      
      // Get consultant estimates of a specific project
      const consultantEstimatesResponse = await axios.get(`/api/consultant-estimate/`+this.projectId);
      this.consultantEstimate=consultantEstimatesResponse.data;

      const resp = await axios.get(`/api/projects/`+this.projectId);
      if(this.$store.getters.getUser.role=="Consultant"){
              this.consultantName = "My Estimate";
      }else if(this.$store.getters.getUser.role=="Project Manager"){
              this.consultantName = resp.data[0].consultant;
      }
      

      // name = estimatesResponse.data[0].projectManager
      // const pmResponse = await axios.get('api/users/developer/'+ name);
      // this.pmId = pmResponse.data.name
      // }
      

      // Get all registered consultants
      const consultantsRequest = await axios.get("/api/users/consultants");
      this.consultants = consultantsRequest.data
      // call function which fetches project details
       this.projectResponse();

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
      invalidTask(){
        return this.estimateData.task === ''
      },
      invalidmeetingPreparationTime(){
          return this.estimateData.meetingPreparation=== '' || isNaN( this.estimateData.meetingPreparation)
      },
      invalidactualTime(){
          return this.estimateData.actualMeeting === '' || isNaN(this.estimateData.actualMeeting)
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
      invalidDevelopers(){
        return this.projectSetup.developers === '' || isNaN(this.projectSetup.developers)
      },
      invalidPmsInvolved(){
        return this.projectSetup.pmsInvolved === '' || isNaN(this.projectSetup.pmsInvolved)
      },
      invalidDailyScrum(){
        return this.projectSetup.dailyScrum === '' || isNaN(this.projectSetup.dailyScrum)
      },
      invalidOverhead(){
        return this.projectSetup.pmOverhead === '' || isNaN(this.projectSetup.pmOverhead)
      },
      invalidComments(){
        return this.projectSetup.comments === ''
      }
    },
    methods:{
      // Get the required project data
      async projectResponse() { 
        const response = await axios.get(`/api/projects/`+this.projectId);
        this.currentProject.push(response.data[0]);
        if(response.data[0].pmsInvolved==0||response.data[0].pmsInvolved==false||response.data[0].pmsInvolved==undefined||response.data[0].pmsInvolved==null){
          this.projectSetupModal=true;
        }else{
          this.projectSetupModal=false;
        }
        return(response.data[0]);
       },
      async addEstimate(){
          this.submitting=true;
         if(this.invalidTask || this.invalidmeetingPreparationTime || this.invalidactualTime || this.invalidquantity || this.invalidmeetingReviewTime|| this.invalidCertainty){
          this.success = false;
          this.error = true
          return
        }
        this.error = false;
        this.success = true;

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
            sum:this.calculatedSumHours,
            adjustedSum:this.calculatedAdjustedSumHours
        }
        if(this.$store.getters.getUser.role=='Project Manager'){
        await axios.post("/api/pm-estimate/"+this.projectId,newEstimate);
        }else if(this.$store.getters.getUser.role=='Consultant'){
        await axios.post("/api/consultant-estimate/"+this.projectId,newEstimate);        
        }

         this.$refs.PmEstimateTable.appendEstimate(newEstimate);
           this.success = true;
        this.error = false;
        this.submitting = false; 
        this.clearForm();
},
async addProjectsetup(){
  if (this.requestConsultant==false){
  this.submittingSetup=true;
   if(this.invalidDevelopers || this.invalidPmsInvolved || this.invalidDailyScrum || this.invalidOverhead || this.invalidComments){
          this.setupSuccess = false;
          this.setupError = true
          return
      }
  await axios.put("/api/projects/"+this.projectId,this.projectSetup);
  this.setupSuccess = true;
  this.setupError = false;
  this.submittingSetup = false; 
  this.clearForm();
  this.projectSetupModal=false;
  let response = await axios.get("/api/projects/"+this.projectId);
  this.$refs.ViewEstimateTable.updateProject(response.data[0]);
  }
  else{
    await axios.put("/api/projects/"+this.projectId,this.consultantRequest);
  }
},
   clearForm(){
        setTimeout(() => {
          this.showSuccess=false;
          this.showSetupSuccess = false;
        }, 2000);
        this.showSuccess=true;
        this.showSetupSuccess = false;
        this.estimateData={
        task:'',
        quantity:1,
        meetingPreparation:0,
        actualMeeting:0,
        meetingReview:0,
        consultants:0,
        certainity:0,
        sum:0,
        adjustedSum:0
      };
        this.projectSetup = {};
            },
            sendRequest(){
              alert(this.consultantRequest.consultant)
              this.requestConsultant = true;
              this.addProjectsetup();
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
