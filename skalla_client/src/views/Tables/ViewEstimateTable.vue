<template>
<div class="accordion" id="">

    <div class="card-header" id="headingOne">
      <button class="btn btn-block px-0" data-toggle="collapse" data-target="#collapse-details" aria-expanded="true" aria-controls="collapseOne">
        <div class="row">
          <div class="col text-left">Project Details</div>
          <div class="col text-right"><i class="ni ni-bold-down"></i></div>
        </div>
      </button>
    </div>
    <div id="collapse-details" class="collapse" aria-labelledby="headingOne">
          <div class="card-body">
        <div class="content">
           <div class="row ">
            <div class="col-12 align-self-start">
              <table v-if="project" class='table'>
                <tr><td>Project </td><td>{{project.name}}</td></tr>
                <tr><td>Project Manager</td><td>{{pmName}}</td></tr>
                <tr><td>Developers </td><td>{{project.developers}}</td></tr>
                <tr><td>Daily Scrum</td><td>{{project.dailyScrum}} Minutes</td></tr>
                <tr><td>Project Description</td><td>{{project.comments}}</td></tr>
                <tr v-if="this.$store.getters.getUser.role=='Consultant'"><td>Due Date</td><td>{{formatDate(project.consultantDueDate)}}</td></tr>
                <tr v-if="this.$store.getters.getUser.role=='Consultant'"><td>Comment</td><td>{{project.consultantComment}}</td></tr>
          
          </table>              
            </div>
          </div>
        </div>  
        </div> 
    </div>

    <div class="card-header" id="headingTwo">
      <button class="btn btn-block px-0" data-toggle="collapse" data-target="#collapse-summary" aria-expanded="true" aria-controls="collapseOne">
        <div class="row">
          <div class="col text-left">Summary</div>
          <div class="col text-right"><i class="ni ni-bold-down"></i></div>
        </div>
      </button>
    </div>
       <div id="collapse-summary" class="collapse" aria-labelledby="headingTwo">
          <div class="card-body">
        <div class="content">
           <div class="row ">
            <div class="col-12 align-self-start">
              <table class='table'>
                <tr>
                  <th class="table-head" scope="col"><b>Estimate</b></th>
                  <th class="table-head" scope="col"><b>Sum</b></th>
                  <th class="table-head" scope="col"><b>Adjusted Sum</b></th>
                </tr>
                <tr><td>Developer estimate</td><td>{{parseFloat(this.$store.getters.getEstimateTotals.developerEstimate.sum).toFixed(2)}}</td><td>{{parseFloat(this.$store.getters.getEstimateTotals.developerEstimate.adjustedSum).toFixed(2)}}</td></tr>
                <tr><td>Project manager estimate</td><td>{{parseFloat(this.$store.getters.getEstimateTotals.pmEstimate.sum).toFixed(2)}}</td><td>{{parseFloat(this.$store.getters.getEstimateTotals.pmEstimate.adjustedSum).toFixed(2)}}</td></tr>
                <tr><td>Consultant estimate</td><td>{{parseFloat(this.$store.getters.getEstimateTotals.consultantEstimate.sum).toFixed(2)}}</td><td>{{parseFloat(this.$store.getters.getEstimateTotals.consultantEstimate.adjustedSum).toFixed(2)}}</td></tr>
                <tr><td>Total(hrs)</td><td>{{this.$store.getters.getEstimateTotals.totalHours.totalSum}}</td><td>{{this.$store.getters.getEstimateTotals.totalHours.adjustedTotal}}</td></tr>
                <tr><td>Total(USD)</td><td>{{(this.$store.getters.getEstimateTotals.totalAmount.totalSum).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}}</td><td>{{(this.$store.getters.getEstimateTotals.totalAmount.adjustedTotal).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}}</td></tr>
              </table>
            </div>
           </div>
        </div>
          </div></div>

  <div class="" v-for="(estimate,index) in projectEstimates" :key="estimate._id">
    <div class="card-header" id="headingThree">
      <button class="btn btn-block px-0" data-toggle="collapse" :data-target="'#collapse-'+index" aria-expanded="true" aria-controls="collapseOne">
        <div class="row">
          <div class="col-4 text-left"><span class="d-none">{{getDevName(estimate.developer)}}</span>{{devNames[index]}}</div>
          <div class="col text-left">Developer</div>
          <div class="col text-right"><i class="ni ni-bold-down"></i></div>
        </div>
      </button>
    </div>
  <div :id="'collapse-'+index" class="collapse" aria-labelledby="headingThree">

  <div class="card shadow" id="card"
       :class="type === 'dark' ? 'bg-default': ''">
   
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            {{estimate.title}}
          </h3>
      </div>
    </div>
    <div class="table-responsive table-hover">
      <table class="table">
  <thead class="thead-light">
    <tr>
        <td class="table-head" scope="col"><b>Task</b></td>
        <td class="table-head" scope="col"><b>Research</b></td>
        <td class="table-head" scope="col"><b>Planning</b></td>
        <td class="table-head" scope="col"><b>Development</b></td>
        <td class="table-head" scope="col"><b>Testing</b></td>
        <td class="table-head" scope="col"><b>Stablization</b></td>
        <td class="table-head" scope="col"><b>Certainty</b></td>
        <td class="table-head" scope="col"><b>Sum Hours</b></td>
        <td class="table-head" scope="col"><b>Adjusted</b></td>
        <td class="table-head" scope="col">
          <span class="action-icons">
            <i v-on:click="isShowing = !isShowing" class="fas fa-comments" id="comments"></i>
          </span>
        </td>
    </tr>
  </thead>
  <Tasks :requestId="estimate._id"></Tasks>
  <tr>
  <th scope="col">Total</th>
  <th scope="col">{{(estimate.ResearchTotal).toFixed(2)}}hrs</th>
  <th scope="col">{{(estimate.PlanningTotal).toFixed(2)}}hrs</th>
  <th scope="col">{{(estimate.DevelopmentTotal).toFixed(2)}}hrs</th>
  <th scope="col">{{(estimate.testingTotal).toFixed(2)}}hrs</th>
  <th scope="col">{{(estimate.stabilizationTotal).toFixed(2)}}hrs</th>
  <th scope="col">{{(estimate.certaintyAverage).toFixed(0)}}%</th>
  <th scope="col">{{(estimate.SumTotal).toFixed(2)}}hrs</th>
  <th scope="col">{{(estimate.AdjustedTotal).toFixed(2)}}hrs</th>

  <th></th>
</tr>
</table>
</div>   
    </div>
  </div>
  </div>
</div>
</template>
<script>
import { format } from "date-fns";
import Tasks from "./Tasks.vue";
import axios from "axios";
import { de } from "date-fns/esm/locale";

export default {
  name: "ViewEstimateTable",
  props: {
    projectEstimates: Array,
    project: Object,
    pmName: String
  },
  components: {
    Tasks
  },
  data() {
    return {
      isShowing: false,
      isShow: false,
      estimated: [],
      estimate: {
        dateCreated: "",
        projectManager: "",
        developer: {},
        dueDate: new Date(),
        project: "",
        taskDescription: "",
        title: ""
      },
      name: [],
      type: "",
      devNames: []
    };
  },
  methods: {
    async getDevName(currentDevId) {
      try {
        const response = await axios.get(
          "/api/users/developer/" + currentDevId
        );
        const devName = response.data.name;
        if (this.devNames.includes(devName)) {
          return;
        } else {
          this.devNames.push(devName);
          return;
        }
      } catch (e) {
        console.log(e, "Error in fetching developer details");
      }
    },
    formatDate: function(dateCreated) {
      return format(new Date(), "dd-MM-yyyy");
    },
    updateProject: function(updatedProject) {
      this.project = updatedProject;
    }
  },

  watch: {
    async projectEstimates() {
      let uniqueEstimatesList = Object.values(
        this.projectEstimates.reduce((c, estimate) => {
          if (!c[estimate.developer]) c[estimate.developer] = estimate;
          return c;
        }, {})
      );

      let allDevelopersAdjustedSum = uniqueEstimatesList.reduce(
        (currentTotal, estimate) => currentTotal + estimate.AdjustedTotal,
        0
      );
      let allDevelopersSum = uniqueEstimatesList.reduce(
        (currentTotal, estimate) => currentTotal + estimate.SumTotal,
        0
      );

      const devTotalsSummary = {
        sum: allDevelopersSum,
        adjustedSum: allDevelopersAdjustedSum
      };
      this.$store.dispatch("setDevTotal", devTotalsSummary);

      try {
        //         }
      } catch (error) {
        //           console.log(error)
      }
    }
  }
};
</script>
<style>
#view {
  color: #747273;
  padding-left: 10px;
}
#left {
  text-align: left;
}
/* Adding cursor to table */
.table-row {
  cursor: pointer;
}
.spacing {
  padding-left: 16px;
  padding-right: 16px;
}
/* Adjustments to font size of the table head content */
.table thead th {
  font-size: 13px;
  /* font-weight: 700; */
}
.table-head {
  background: #e7eaec !important;

  font-weight: 700;
  /* text-transform: uppercase; */
}
/* First column of table font adjustment */
.text-sm {
  font-weight: 400;
  font-size: 13px !important;
}
/* styling rounded border */
.rounded-circle {
  border: 1px solid rgb(201, 201, 199);
  padding: 6px;
}
/* Status column font size adjustment */
span .status {
  font-size: 13px;
}
/* displaying action icons on hover */
table > tbody > tr .action-icons {
  visibility: hidden;
}
table > tbody > tr:hover .action-icons {
  visibility: visible;
}
.details {
  /* margin-left: -800px; */
  color: rgb(140, 140, 146);
}
base-button {
  border-radius: 4px;
}
#cancel {
  background-color: #e2e0e1;
  border: none;
  color: #747273;
}
#save-draft {
  background-color: #faf9f9;
  color: #5e72e4;
  border: 1px solid #5e72e4;
}
#comments {
  color: #5e72e4;
}
#comments:hover {
  cursor: pointer;
  color: #d10572;
}
/* Desktops and laptops ----------- */
@media only screen and (min-width: 1224px) {
  .card {
    margin-top: 30px;
  }
}
/* Adjustments to font size of the table head content */
.table thead th {
  font-size: 13px;
  /* font-weight: 700; */
}
.table-head {
  background: #e7eaec !important;
  font-size: 90px;

  /* font-weight: 700; */
  /* text-transform: uppercase; */
}
iframe {
  display: block;
  margin-top: 20px;
  margin-left: 200px;
  width: 850px;
  height: 300px;
}
#bold-down {
  float: right;
  cursor: pointer;
}
.card-header {
  cursor: pointer;
}
/* Large screens ----------- */
/* @media only screen  and (min-width : 1824px) {
.card{
  margin-top: 20px;
  
}
} */
#my-icons {
  background-color: #5e72e4;
  border-color: #5e72e4;
  color: #eee7eb;
}
#my-icons:hover {
  background-color: #d10572;
  border-color: #d10572;
  color: #eee7eb;
}

h3 {
  padding: 6px;
}
