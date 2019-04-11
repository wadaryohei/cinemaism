
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // @see scssファイルを複数読み込む方法
        // https://vueschool.io/articles/vuejs-tutorials/globally-load-sass-into-your-vue-js-applications/
        data: `
          @import "@/assets/sass/vendor/_mixin.scss";
          @import "@/assets/sass/vendor/_root.scss";
          @import "@/assets/sass/vendor/_grid.scss";
        `
      }
    }
  }
}
