export const timeFunc = fn => {
  let start = Date.now()
  try {
    fn();
  } catch (e) {
    console.error('Error while timing: ', e);
  }
  return Date.now() - start;
}