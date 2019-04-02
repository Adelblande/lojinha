export const TOKEN_KEY = '@somoscorujinhas';

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;