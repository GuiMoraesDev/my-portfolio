const CAREER_START = new Date(2019, 5, 11);

export const getYearsOfExperience = ({ now = new Date() } = {}) => {
  const hasReachedAnniversary =
    now >=
    new Date(
      now.getFullYear(),
      CAREER_START.getMonth(),
      CAREER_START.getDate(),
    );

  return (
    now.getFullYear() -
    CAREER_START.getFullYear() -
    (hasReachedAnniversary ? 0 : 1)
  );
};
