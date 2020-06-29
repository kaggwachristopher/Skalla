<template>
    <div>
        <base-header type="" class="pb-6 pb-8 pt-4 " id="table-head">
        </base-header>
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <consultants-table title="Light Table"></consultants-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ConsultantsTable from "./Tables/ConsultantsTable";

export default {
name: 'Consultant',
components:{
  ConsultantsTable
} 
}
</script>
<style>
#table-head{
    background-color: #d10572;
}
/* Desktops and laptops ----------- */
@media only screen  and (min-width : 1224px) {
/* Styles */
#table-head{
  /* padding-bottom: 20px; */
  min-height: 35vh;
}
}
</style>
