// Task 3  Check leaap year :-
/**
 * Checks if a year is a leap year using mathematical logic.
 * @param {number} year - The year to check.
 * @returns {boolean} True if it is a leap year, false otherwise.
 */
function isLeapYear(year) {
    // Check if the year is divisible by 4 AND (NOT divisible by 100 OR divisible by 400)
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// --- Demonstration ---

console.log("--- Leap Year Checker (Method 1) ---");

// Test Cases:
console.log(`Is 2000 a leap year? ${isLeapYear(2000)}`); // True (Divisible by 400)
console.log(`Is 2024 a leap year? ${isLeapYear(2024)}`); // True (Divisible by 4 and not by 100)
console.log(`Is 1900 a leap year? ${isLeapYear(1900)}`); // False (Divisible by 100 and not by 400)
console.log(`Is 2023 a leap year? ${isLeapYear(2023)}`); // False (Not divisible by 4)