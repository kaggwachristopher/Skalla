<template>
  <div>
    <base-header type="" id="table-head">
    </base-header>



    <div class="container-fluid mt--7">
      <div class="accordion" id="accordionExample">
        <div class="card rounded">
          <div class="row ">
            <div class="col card-header border-1">
              <i class="fa fa-plus-circle" aria-hidden="true"></i>
            </div>
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
            <pending-table title="Dashboard"></pending-table>
            <!-- </div> -->
          </div>
              <div class="row ">
            <div class="col card-header border-1 text-right">
<i class="fa fa-cloud-download-alt" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <!-- <div class="card">
                          <div class="card-header" id="headingTwo">
                            <h2 class="mb-0">
                              <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Collapsible Group Item #2
                              </button>
                            </h2>
                          </div>
                          <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                            <div class="card-body">
                              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                            </div>
                          </div>
                        </div>
                        <div class="card">
                          <div class="card-header" id="headingThree">
                            <h2 class="mb-0">
                              <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Collapsible Group Item #3
                              </button>
                            </h2>
                          </div>
                          <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                            <div class="card-body">
                              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                            </div>
                          </div>
                        </div> -->
      
      
      
            
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
.card{
  margin-top: 0px;
}
</style>
