export const getPlayerList = (state) => {
  return state.player.list
};

export const getPlayerLoading = (state) => {
  return state.player.loading
};

export const getPlayerError = (state) => {
  return state.player.error
};

export const getPlayerCurrent = (state) => {
  return state.player.current
};
