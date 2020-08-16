export type NavListType = {
  id: number;
  to: string;
  lead: string;
  title: string;
}

export const NavListDatas: NavListType[] = [
  {
    id: 1,
    to: '/',
    lead: '視聴予定の映画',
    title: 'INBOX'
  },
  {
    id: 2,
    to: '/about',
    lead: 'CINEMAISMについて',
    title: 'ABOUT'
  },
  {
    id: 3,
    to: '/popular',
    lead: '人気の映画',
    title: 'POPULAR'
  }
]
