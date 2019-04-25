<template>
<div>
  <section class="about-section-intro">
    <img class="about-image" src="../assets/movie_01.png" alt="CINEMAISMとは">
    <h1 class="about-header">CINEMAISMとは</h1>
    <p class="about-lead">CINEMAISMはあなたのムービーライフをより充実に過ごすための視聴管理TODOアプリです。
      映画のタイトルに関する検索や、いま巷で人気な映画などを、自分だけのインボックスに保存して管理することが出来ます。
    </p>
  </section>

  <section class="about-section-info">
    <h1 class="about-header">簡単! 3ステップで分かる使い方</h1>
    <div>
      <img class="about-subimage" src="../assets/about/about_01.png" alt="1.映画のタイトル名を検索">
      <h2 class="about-subheader">1.映画のタイトル名を検索</h2>
      <p class="about-sublead">
        INBOXページにある右下の検索ボタン、またはサイドメニューのSEARCHから検索画面にアクセスし、観たい、気になっている映画のタイトル名を入力しましょう。
      </p>
    </div>

    <div>
      <img class="about-subimage" src="../assets/about/about_02.png" alt="2.映画をINBOXに追加する">
      <h2 class="about-subheader">2.映画をINBOXに追加する</h2>
      <p class="about-sublead">
        検索結果に表示された作品から作品詳細画面へ、画面下部の追加するボタンからINBOXに映画を追加します。
      </p>
    </div>

    <div>
      <img class="about-subimage" src="../assets/about/about_03.png" alt="3.視聴したらチェックする">
      <h2 class="about-subheader">3.視聴したらチェックする</h2>
      <p class="about-sublead">
        視聴した作品は各左上にあるチェックボタンを押してINBOXから削除、または一括削除をすることも可能です。
      </p>
    </div>
  </section>
</div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style lang="scss" scoped>

.about-section-info {
  text-align: center;
}

.about-image {
  margin-bottom: 3rem;
}

.about-subimage {
  width: 240px;
}

.about-header {
  position: relative;
  color: #fff;
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: 1px;
  margin-bottom: 4rem;
  word-break: break-all;
  text-align: center;

  &::after {
    position: absolute;
    top: 200%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: '';
    display: block;
    width: 40px;
    height: 1px;
    background-color: #fff
  }
}

.about-subheader {
  position: relative;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  margin-top: 2rem;
  word-break: break-all;
  text-align: center;
}

.about-lead {
  color: #a7a7a7;
  margin-bottom: 4rem;
  font-weight: 800;
  font-size: 1.2rem;
  line-height: 2;
}

.about-sublead {
  color: #a7a7a7;
  margin-bottom: 2rem;
  font-weight: 800;
  font-size: 1.2rem;
  line-height: 2;
  text-align: left;
}

</style>
