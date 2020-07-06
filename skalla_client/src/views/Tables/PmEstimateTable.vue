<template>
<div class="accordion" id="accordionExample">
  <div class="card">
    <div class="card-header" id="headingOne">
      <button class="btn btn-block px-0" data-toggle="collapse" :data-target="`#collapse-${this.role}`.replace(' ','')" aria-expanded="true" aria-controls="collapseOne">
        <div class="row">
          <div class="col-4 text-left">{{this.pmId}}</div>
          <div class="col text-left">{{role}}</div>
          <div class="col text-right"><i class="ni ni-bold-down"></i></div>
        </div>
     </button>
    </div>
  <div :id="`collapse-${role}`.replace(' ','')" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">

  <div class="card shadow" id="card"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="table-responsive table-hover">
      <table class="table">
  <thead class="thead-light">
    <tr>
        <td class="table-head" scope="col"><b>Task</b></td>
        <td class="table-head" scope="col"><b>Quantity</b></td>
        <td class="table-head" scope="col"><b>Preparation</b></td>
        <td class="table-head" scope="col"><b>Actual Meeting</b></td>
        <td class="table-head" scope="col"><b>Review</b></td>
        <td class="table-head" scope="col" v-if="role=='Project Manager'"><b>Consultants</b></td>
        <td class="table-head" scope="col"><b>Certainty(%)</b></td>
        <td class="table-head" scope="col"><b>Sum Hours</b></td>
        <td class="table-head" scope="col"><b>Adjusted</b></td>
        <!-- <td class="table-head" scope="col">
          <span class="action-icons">
            <i v-on:click="isShowing = !isShowing" class="fas fa-comments" id="comments"></i>
          </span>
        </td> -->
    </tr>
  </thead>
  <tbody>
    <tr v-for="task in pmEstimates" :key="task._id">
      <td scope="row">{{task.task}}</td>
      <td scope="row">{{task.quantity}}</td>
      <td>{{task.meetingPreparation}}</td>
      <td>{{task.actualMeeting}}</td>
      <td>{{task.meetingReview}}</td>
      <td v-if="role=='Project Manager'">{{task.consultants}}</td>
      <td>{{task.certainity}}</td>
      <td>{{task.sum}}</td>
     <td>{{task.adjustedSum}}</td>
    </tr>
  <tr>
  <th scope="col">Total</th>
  <th scope="col">{{(this.totals.quantityTotal)}}</th>
  <th scope="col">{{(this.totals.meetingPreparationTotal).toFixed(2)}}hrs</th>
  <th scope="col">{{(this.totals.actualMeetingTotal).toFixed(2)}}hrs</th>
  <th scope="col">{{(this.totals.meetingReviewTotal).toFixed(2)}}hrs</th>
  <th scope="col" v-if="role=='Project Manager'">{{(this.totals.consultantsTotal)}}</th>
    <th scope="col">{{(this.totals.certainity).toFixed(1)}}%</th>
  <th scope="col">{{(this.totals.sumTotal).toFixed(2)}}hrs</th>
  <th scope="col">{{(this.totals.adjustedTotal).toFixed(2)}}hrs</th>
</tr>
  </tbody>

</table>
</div>   
    </div>
  </div>
  </div>
</div>
</template>
<script>
import { format } from "date-fns"; 
import axios from "axios";

export default {
    name: 'PmEstimateTable',
    props: {
      pmEstimates: Array,
      pmId: String,
      role: String
    },
    components:{
      // Owner
    },
    data() {
      return {
         isShowing:false,
         isShow: false,
         estimated: [],
          pmName:'',
          estimate: {
            dateCreated: "",
            projectManager: "",
            developer: {},
            dueDate: "",
            project: "",
            taskDescription: "",
            title: "",
          },
            totals:{
              quantityTotal:0.00,
              meetingPreparationTotal:0.00,
              actualMeetingTotal:0.00,
              meetingReviewTotal:0.00,
              consultantsTotal:0.00,
              certainity:0.00,
              sumTotal:0.00,
              adjustedTotal:0.00
            },
          name:[],
          type:'',
          projectId:0
      }
    },
    methods: {
      formatDate: function(dateCreated){
          return format(new Date(dateCreated), 'dd-MM-yyy')   
      },
    appendEstimate:function(newEstimate){
      this.pmEstimates.push(newEstimate);
    }

    },
    //fetches estimate totals when the component is created
    async created(){
    },
    watch:{
      async pmEstimates(){

        try {
        let pmEstimatesLength=this.pmEstimates.length;
            for (const estimate of this.pmEstimates) {
            this.totals.quantityTotal+=parseInt(estimate.quantity);
            this.totals.meetingPreparationTotal+=(parseInt(estimate.meetingPreparation)*parseInt(estimate.quantity));
            this.totals.actualMeetingTotal+=parseInt(estimate.actualMeeting)*parseInt(estimate.quantity);
            this.totals.meetingReviewTotal+=parseInt(estimate.meetingReview)*parseInt(estimate.quantity);
            this.totals.consultantsTotal+=parseInt(estimate.consultants); 
            this.totals.certainity+=parseInt(estimate.certainity)/pmEstimatesLength;
            this.totals.sumTotal=this.totals.meetingPreparationTotal+this.totals.actualMeetingTotal+this.totals.meetingReviewTotal;
            this.totals.adjustedTotal+=parseInt(estimate.adjustedSum) ; 
        } 
        }catch (error) {
          alert(error)
        }
    }
    }
    
  }
</script>
<style>
td{
  padding: 0;
  margin:0
}
#view{
  color: #747273;
  padding-left: 10px;
}
#left{
  text-align: left;
}
/* Adding cursor to table */
.table-row{
  cursor:pointer;
}
.spacing{
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
span .status{
  font-size: 13px; 
}
/* displaying action icons on hover */
table > tbody > tr .action-icons{
  visibility: hidden;
}
table > tbody > tr:hover .action-icons{
  visibility: visible;
}
.details {
  /* margin-left: -800px; */
  color: rgb(140, 140, 146);
}
base-button{
  border-radius: 4px;
}
#cancel{
  background-color: #e2e0e1;
  border: none;
  color: #747273;
}
#save-draft{
  background-color: #faf9f9;
  color: #5e72e4;
  border: 1px solid #5e72e4;
  
}
#comments{
 color: #5e72e4;
}
#comments:hover {
  cursor:pointer;
  color: #d10572;
}
/* Desktops and laptops ----------- */
@media only screen  and (min-width : 1224px) {
.card{
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
  display:block;
  margin-top: 20px;
  margin-left: 200px;
  width:850px;
  height:300px;
}
#bold-down{
  float: right;
  cursor: pointer;
}
.card-header{
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
td,th{
  text-align: center
}