<template>
  <div>
    <base-header type="" id="table-head">
    </base-header>
    <div class="container-fluid mt--7">
        <div class="card rounded">
          <div>
          <div class="col card-header border-1 text-left" v-if="(this.$store.getters.getUser.role=='Project Manager' && !this.projectConsultant) || (this.$store.getters.getUser.role=='Consultant' && !this.consultantSubmitted)">
              <i @click="newEstimateModal=true" class="fa fa-plus-circle" aria-hidden="true"></i>  
          </div>
          <div class="col card-header border-1 text-right" v-if="this.$store.getters.getUser.role=='Project Manager' && this.pmEstimate.length && !this.projectConsultant">
              <base-button type="primary" @click="consultantEstimateModal = true">
              Request consultant Estimate
            </base-button>
          </div>
          </div>
            <div>
                  <ViewEstimateTable :projectEstimates='projectEstimates' :project='currentProject[0]' :pmName='pmName' ref='ViewEstimateTable'>
                  </ViewEstimateTable>
            </div>
            <div>
              <PmEstimateTable v-show="pmEstimate.length" :pmEstimates='pmEstimate' :pmId='pmId' role="Project Manager" :ref="pmRef">
              </PmEstimateTable>
            </div>
            <div v-if="this.$store.getters.getUser.role=='Consultant' || consultantSubmitted">
              <PmEstimateTable v-show="consultantEstimate.length" :pmEstimates='consultantEstimate' :pmId='consultantName' role="Consultant" :ref="consultantRef">
              </PmEstimateTable>
              <div class="col text-right" v-if="this.$store.getters.getUser.role=='Consultant' && consultantEstimate">
                
                <base-button v-if="!this.consultantSubmitted && consultantEstimate.length" type="primary" size="sm" class="shadow-none spacing btn-lg px-5" id="submit" @click="submitConsultantEstimate">Submit</base-button>
                <span class="text-success" v-if="this.consultantSubmitted"><b>Submitted</b></span>
              </div>
            </div>
        </div>
          <div class="">
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
                      <textarea rows="3" v-model="estimateData.comments" class="form-control form-control-alternative" placeholder="Add comments here ..."></textarea>
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
                         type="number"
                         placeholder="0"
                        class="mb-3" v-model="projectSetup.developers">
                        
                      </base-input> 
                    </div>
                  </div>

                  <div class="row">
                    <div class=" col-sm-3">
                      <h6 class="heading-small text-muted mb-4 float-left">Daily Scrum(Mins)</h6>
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
                      <h6 class="heading-small text-muted mb-4 float-left">PM Overhead(%)</h6>
                    </div>
                    <div class="col-sm">
                      <base-input alternative
                        ref="first"
                        class="mb-3" type="number" placeholder="0" v-model="projectSetup.pmOverhead">
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
                <modal :show.sync="consultantEstimateModal" v-if="!this.projectConsultant">
              <template slot="header">
                  <h3 class="modal-title" id="exampleModalLabel">Request Consultant Estimate</h3>
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

                <div class="row">
                  <div class="col-sm-3">
                      <h6 class="heading-small text-muted mb-4 float-left">Due Date</h6>
                  </div>
                  <div class="col-sm">
                    <base-input addon-left-icon="ni ni-calendar-grid-58">
                        <flat-picker slot-scope="{focus, blur}"
                          @on-open="focus"
                          @on-close="blur"
                          :config="{allowInput: true, dateFormat: 'd-m-Y'}"
                          placeholder="17-07-2020"
                          value=""
                          class="form-control datepicker"
                          :class="{ 'has-error': invalidDueDate }"
                          v-model="consultantRequest.consultantDueDate"
                         >
                        </flat-picker>
                    </base-input>
                  </div>
                </div>       

                <div class="row">
                  <div class="col-sm-5">
                    <h6 class="heading-small text-muted mb-4 float-left">Comment</h6>
                  </div>
                  <div class="col-sm-12">
                    <base-input alternative=""
                    :class="{ 'has-error': submitting }"

                    >
                      <textarea rows="4" v-model="consultantRequest.consultantComment"  class="form-control form-control-alternative" placeholder="Add main task description here ..."></textarea>
                    </base-input>
                  </div>
                  </div>
                </div>

                <p v-if="invalidConsultantRequest" class="error-message">
                    ❗Consultant and Due Date Required
                </p>
                <p v-if="success" class="success-message" v-show="showSuccess">
                    ✅ Request successfully sent
                </p>
                <div class="text-right">
                <base-button class="shadow-none mt-4" type="primary" @click="this.sendRequest" >Send request</base-button>
                </div>
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
import flatPicker from "vue-flatpickr-component";
import { format, isThisMinute } from "date-fns"; 
import "flatpickr/dist/flatpickr.css";
import { parse } from 'date-fns/esm';
export default {
  name: "pending-estimate",
  components: {
    ViewEstimateTable,
    PmEstimateTable,
    flatPicker
  },
  data() {
    return {
      newEstimateModal: false,
      projectSetupModal: false,
      consultantEstimateModal: false,
      projects:[],
      pmId:'',
      pmName:'',
      consultantName:'',
      requestConsultant:false,
      projectEstimates:[],
      projectId:"",
      pmEstimate:[],
      consultantEstimate:[],
      consultants:[],
      projectSetup:{
        developers:"",
        dailyScrum:"",
        pmOverhead:"",
        comments:"",
      },
      consultantRequest:{
        consultant:"",
          consultantDueDate:"",
          consultantComment:""
      }
      ,
      currentProject:[],
      estimateData:{
        task:'',
        quantity:1,
        meetingPreparation:"",
        actualMeeting:"",
        meetingReview:"",
        consultants:"",
        certainity:"",
        sum:"",
        adjustedSum:"",
        comments:""
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
        pmRef:'',
        consultantRef:'',
        consultantSubmitted:false,
        projectConsultant: false
    }
    },
    async created(){
    // this.$store.dispatch('resetTotals');
    try{
      if(this.$store.getters.getUser.role=="Project Manager"){
        this.pmRef="PmEstimateTable"
      }else if(this.$store.getters.getUser.role=="Consultant"){
        this.consultantRef="PmEstimateTable"
      }

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
      this.pmName = pmResponse.data.name
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
  async destroyed(){
    this.$store.dispatch('resetTotals');
  }
  ,
computed: {
      calculatedSumHours: function(){
        if (this.estimateData.meetingPreparation === '' || this.estimateData.actualMeeting === ''|| this.estimateData.meetingReview === '') {
          return 0
        }else{
          return (parseFloat((this.estimateData.quantity)*(parseFloat(this.estimateData.meetingPreparation) + parseFloat(this.estimateData.actualMeeting) + parseFloat(this.estimateData.meetingReview))).toFixed(2));
        }
      },
      calculatedAdjustedSumHours: function(){
        if(this.estimateData.certainity==""){
          return this.calculatedSumHours
        }else{
        return (parseFloat(this.calculatedSumHours * (1 + (1 - parseInt(this.estimateData.certainity) / 100))).toFixed(2))
        }
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
      invalidDailyScrum(){
        return this.projectSetup.dailyScrum === '' || isNaN(this.projectSetup.dailyScrum)
      },
      invalidOverhead(){
        return this.projectSetup.pmOverhead === '' || isNaN(this.projectSetup.pmOverhead)
      },
      invalidConsultantRequest(){
        return this.consultantRequest.consultantName === '' || this.consultantRequest.consultantDueDate === ""
      }
    },
    methods:{
       formatDate: function(dateCreated){
          return format(new Date(dateCreated), 'dd-MM-yyyy')
            },
              invalidDueDate(){
          return this.consultantRequest.consultantDueDate === ''
      },
      // Get the required project data
      async projectResponse() { 
        const response = await axios.get(`/api/projects/`+this.projectId);
        this.currentProject.push(response.data[0]);
        this.consultantSubmitted=this.currentProject[0].consultantEstimate
        if(response.data[0].dailyScrum==false||response.data[0].dailyScrum==undefined||response.data[0].dailyScrum==null||response.data[0].consultants==false){
          this.projectSetupModal=true;
        }else{
          this.projectSetupModal=false;
        }
        if (this.currentProject[0].consultant){
            this.projectConsultant = true
        }else{
          this.projectConsultant = false
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
            meetingPreparation: parseFloat(this.estimateData.meetingPreparation).toFixed(2),
            actualMeeting: parseFloat(this.estimateData.actualMeeting).toFixed(2),
            meetingReview: parseFloat(this.estimateData.meetingReview).toFixed(2),
            quantity: parseInt(this.estimateData.quantity),
            certainity: parseInt(this.estimateData.certainity),
            consultants:parseInt(this.estimateData.consultants).toFixed(0),
            project:this.projectId,
            sum:this.calculatedSumHours,
            adjustedSum:this.calculatedAdjustedSumHours,
            comments:this.estimateData.comments
        }
        this.$refs.PmEstimateTable.appendEstimate(newEstimate);
        if(this.$store.getters.getUser.role=='Project Manager'){
        await axios.post("/api/pm-estimate/"+this.projectId,newEstimate);
        }else if(this.$store.getters.getUser.role=='Consultant'){
        await axios.post("/api/consultant-estimate/"+this.projectId,newEstimate);        
        }
           this.success = true;
        this.error = false;
        this.submitting = false; 
        this.clearForm();
},
async addProjectsetup(){
  if (this.requestConsultant==false){
  this.submittingSetup=true;
   if(this.invalidDevelopers || this.invalidPmsInvolved || this.invalidDailyScrum || this.invalidOverhead){
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
     if(this.invalidConsultantRequest){
        alert("invalidRequest")
    }else{
      console.log(this.currentProject[0].consultant)
    await axios.put("/api/projects/"+this.projectId,this.consultantRequest);
    this.success = true;
    this.projectConsultant = true
    this.clearForm();
    }
  }
},
   clearForm(){
        setTimeout(() => {
          this.showSuccess=false;
          this.showSetupSuccess = false;
        }, 1000);
        this.showSuccess=true;
        this.showSetupSuccess = false;
        this.estimateData={
        task:'',
        quantity:1,
        meetingPreparation:"",
        actualMeeting:"",
        meetingReview:"",
        consultants:"",
        certainity:"",
        sum:"",
        adjustedSum:"",
        comments:""
      };
        this.projectSetup = {};
        this.consultantRequest={
        consultant:"",
        consultantDueDate:"",
        consultantComment:""
      }
            },
            sendRequest(){
              this.requestConsultant = true;
              this.addProjectsetup();
            },
            async submitConsultantEstimate(){
              this.consultantSubmitted=true;
              await axios.put("/api/projects/"+this.projectId,{consultantEstimate:true});
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
