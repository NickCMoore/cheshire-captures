export const removeTokenTimestamp = () => {
  localStorage.removeItem('tokenTimestamp');
};

export const shouldRefreshToken = () => {
  const tokenTimestamp = localStorage.getItem('tokenTimestamp');
  if (tokenTimestamp) {
    const now = new Date();
    const timestampDate = new Date(tokenTimestamp);
    const diff = (now - timestampDate) / (1000 * 60);
    return diff > 60; 
  }
  return false;
};
