export type MovieStatusType = {
  disabled: boolean;
  text: string;
}

export const MovieStatusSaved: MovieStatusType = {
  disabled: true,
  text: 'INBOXを表示する'
} as const

export const MovieStatusDontSaved: MovieStatusType = {
  disabled: false,
  text: 'INBOXに追加する'
} as const
