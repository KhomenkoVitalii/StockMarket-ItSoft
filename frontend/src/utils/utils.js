export const isUnder18 = (birthday) => {
    const userBD = new Date(birthday);

    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

    // Compare the user's date of birth with the date 18 years ago
    return userBD > eighteenYearsAgo;
}