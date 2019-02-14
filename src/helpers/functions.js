const addTrailingZero = (num) => {
  return num.toString().length == 1 ? `0${num}` : `${num}`;
};

export default {
  time: {
    formatTime(duration) {
      duration = Math.floor(duration);

      const hours = Math.floor(duration / (60 * 60)),
        minutes = Math.floor(duration / 60),
        seconds = Math.floor(duration % 60);

      let formatted = '';
      if (hours > 0) {
        formatted += `${addTrailingZero(hours)}:`;
      }
      formatted += `${addTrailingZero(minutes)}:${addTrailingZero(seconds)}`;
      return formatted; 
    }
  },
};
