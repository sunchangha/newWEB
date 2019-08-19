<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
    body .el-table th.gutter {
        display: table-cell !important
    }
    .el-dialog.is-fullscreen{
        width:61% !important;
        height: auto !important;
        margin-top: 50px !important;
    }
    .el-card__header{
        padding: 10px 20px !important;
    }
</style>