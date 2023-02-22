export const filterOnlyTodayBirthDates = (arr) => {
  const today = new Date().toLocaleDateString("en-GB");
  const splittedToday = today.split("/");
  return arr.filter((actor) => {
    const splitedDateString = actor.dob.date.split(".");
    return (
      splitedDateString[0] === splittedToday[0] &&
      splitedDateString[1] === splittedToday[1]
    );
  });
};
