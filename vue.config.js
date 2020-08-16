
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // @see scssファイルを複数読み込む方法
        // https://qiita.com/pinalto/items/d2eeda06d49740d905ca
        prependData: `
          @import "@/assets/sass/vendor/_mixin.scss";
          @import "@/assets/sass/vendor/_root.scss";
          @import "@/assets/sass/vendor/_grid.scss";
        `
      }
    }
  }
}
