export default function secondsToTime(sec) {
    const seconds = Number(sec);

    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 3600 % 60);

    return {
      hours: h,
      minutes: m,
      seconds: s
    }
}