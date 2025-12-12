// Task 1 calculator  :-
/**
 * Calculates Simple Interest and the Final Amount.
 * @param {number} principal - The initial amount of money.
 * @param {number} rate - The annual interest rate (e.g., 5 for 5%).
 * @param {number} time - The time period in years.
 * @returns {object} An object containing the calculated interest and final amount.
 */
function calculateSimpleInterest(principal, rate, time) {
    // Input Validation
    if (principal < 0 || rate < 0 || time < 0) {
        console.error("❌ Error: Principal, rate, and time must be non-negative.");
        return { interest: 0, finalAmount: principal };
    }

    // Convert annual rate percentage to a decimal
    const decimalRate = rate / 100;

    // Calculate Simple Interest (I = P * r * t)
    const interest = principal * decimalRate * time;

    // Calculate Final Amount (A = P + I)
    const finalAmount = principal + interest;

    return {
        interest: interest.toFixed(2),
        finalAmount: finalAmount.toFixed(2)
    };
}

// --- Simple Interest Demonstration ---
const p_simple = 1000;
const r_simple = 5; // 5%
const t_simple = 3; // 3 years

const simpleResult = calculateSimpleInterest(p_simple, r_simple, t_simple);

console.log("--- Simple Interest Calculation ---");
console.log(`Principal: $${p_simple}`);
console.log(`Rate: ${r_simple}%`);
console.log(`Time: ${t_simple} years`);
console.log(`Calculated Interest: $${simpleResult.interest}`);
console.log(`Final Amount: $${simpleResult.finalAmount}`);
// Interest: 1000 * 0.05 * 3 = 150.00
// Final Amount: 1000 + 150.00 = 1150.00