<script setup>

</script>

<template>
    <div class="wrapper">
        <div class="putao">Lorem ipsum dolor sit amet consectet</div>
        <div class="longxia">Lorem ipsum dolor sit amet consectet</div>
        <div class="yangyu">Lorem ipsum dolor sit amet consectet</div>
        <div class="xigua">Lorem ipsum dolor sit amet consectet</div>
    </div>
</template>


<style scoped>
.container {
    margin: 10px calc(50% - 300px);
    width: 600px;
    height: 500px;
    display: grid;
    /* grid-template-columns: <田地> ... 或 <田垄> <田地> ...; */
    /* grid-template-rows: <田地> ... 或 <田垄> <田地> ...; */
    /* grid-template-columns: [line1] 80px [line2]auto [line3]100px; */
    /* grid-template-rows: [row1]25% [row1]100px [row1]auto [row1]60px; */

    /* 规律的基于 40px创建的栅格 */
    grid-template-columns: repeat(15, 40px [col-start]);
    grid-template-rows: [row1]25% [row2]100px [row3]auto [row4]60px;
}

/* 第二种演示方式 */
.wrapper {
    margin: 10px calc(50% - 300px);
    width: 600px;
    height: 500px;
    display: grid;

    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-template-areas:
        "葡萄 葡萄 葡萄"
        "龙虾 养鱼 养鱼"
        "龙虾 养鱼 养鱼"
        "西瓜 西瓜 西瓜";
    /*  等效于   grid-template: <grid-template-rows> / <grid-template-columns>; */
    /* grid-template:
        "葡萄 葡萄 葡萄" 1fr "龙虾 养鱼 养鱼" 1fr "龙虾 养鱼 养鱼" 1fr "西瓜 西瓜 西瓜" 1fr
        /1fr 1fr 1fr; */

    /* column-gap: 10px;
   row-gap: 15px; */
    /* 等效于  */
    gap: 15px 10px;
    /* justify-items: center;
    align-items: center; */
    /* place-items: end center; */

    /* justify-content: stretch | start | end | center | space-between | space-around | space-evenly; */
    /* justify-content: center;
    align-content: center; */
    place-content: center center;
}


/* 等效于 */

.putao {
    grid-area: 葡萄;
}

.longxia {
    grid-area: 龙虾;
}

.yangyu {
    grid-area: 养鱼;
}

.xigua {
    grid-area: 西瓜;
}





section,
div {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
}
</style>