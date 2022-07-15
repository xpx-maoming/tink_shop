<template>
  <div class="star star-24">
    <span class="star-item" v-for="(ac,index) in addRating" :key="index" :class="ac"></span>
    <!-- <span class="star-item on"></span>
    <span class="star-item on"></span>
    <span class="star-item half"></span>
    <span class="star-item off"></span> -->
  </div>
</template>

<script>
export default {
  name: "GuiguScore",
  props:['rating'],
  computed:{
    //评分规则      
    addRating(){
        let newRating=[];
        //on一颗星
        let shuzhi=Math.floor(this.rating);
        for(let i=0;i<shuzhi;i++){
            newRating.push('on')
        }
        //half半颗星
        if(this.rating-shuzhi>=0.5){
            newRating.push('half');
        }
        //off没有星
        for(;newRating.length<5;){
            newRating.push('off')
        }
        return newRating
      }
  }

};
</script>

<style>
</style>