import { SetupContext } from '@vue/composition-api'

// ================================
// Type
// ================================
export type RouteComposition = {
  routeName: () => string | null | undefined;
  showInput: () => boolean;
}

// ================================
// Composition
// ================================
export const UseRouteComposition = (context: SetupContext): RouteComposition => {
  /**
   * ルートのパス名を返す
   */
  function routeName (): string | null | undefined {
    if (context.root.$route?.name === 'home') {
      return 'INBOX'
    } else {
      return context.root.$route?.name
    }
  }

  /**
   * Inputの表示をページ別に切り替える
   */
  function showInput (): boolean {
    const matchPattern = 'movie'
    const isAbout = context.root.$route.path === '/about'
    const isMovie = context.root.$route.path.indexOf(matchPattern) > -1
    if (isAbout || isMovie) {
      return false
    } else {
      return true
    }
  }

  return { routeName, showInput }
}
