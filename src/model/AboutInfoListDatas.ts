export type AboutInfoListType = {
  id: number;
  src: string;
  heading: string;
  lead: string;
}

export const AboutInfoIntroDatas: AboutInfoListType = {
  id: 0,
  src: `${require('../assets/movie_01.jpg')}`,
  heading: 'CINEMAISMとは',
  lead: 'CINEMAISMはあなたのムービーライフをより充実に過ごすための視聴管理TODOアプリです。映画のタイトルに関する検索や、いま巷で人気な映画などを、自分だけのインボックスに保存して管理することが出来ます。'
}

export const AboutInfoListDatas: AboutInfoListType[] = [
  {
    id: 1,
    src: `${require('../assets/about/about_01.png')}`,
    heading: '1.映画のタイトル名を検索',
    lead: 'INBOXページの下部にある検索ボタンから観たい、または気になっている映画のタイトル名を入力してサーチ画面にアクセスしましょう。'
  },
  {
    id: 2,
    src: `${require('../assets/about/about_02.png')}`,
    heading: '2.映画をINBOXに追加する',
    lead: '検索結果に表示された作品から作品詳細画面へ、画面下部の追加するボタンからINBOXに映画を追加します。'
  },
  {
    id: 3,
    src: `${require('../assets/about/about_03.png')}`,
    heading: '3.視聴したらチェックする',
    lead: '視聴した作品は各左上にあるチェックボタンを押してINBOXから削除、または一括削除をすることも可能です。'
  }
]
