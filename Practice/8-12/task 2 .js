// Task 2 Febonacci :-
/**
 * Generates the Fibonacci sequence up to the nth term using an iterative loop.
 * @param {number} n - The number of terms to generate (n must be a positive integer).
 * @returns {number[]} An array containing the Fibonacci sequence.
 */
function fibonacciIterative(n) {
    if (n <= 0) {
        return [];
    }
    if (n === 1) {
        return [0];
    }

    // Initialize the sequence with the first two terms
    const sequence = [0, 1];

    // Start the loop from the 3rd term (index i=2)
    for (let i = 2; i < n; i++) {
        // The next term is the sum of the previous two
        const nextTerm = sequence[i - 1] + sequence[i - 2];
        sequence.push(nextTerm);
    }

    return sequence;
}

// --- Demonstration ---
const n = 10;
console.log(`Fibonacci Sequence (up to ${n} terms):`);
console.log(fibonacciIterative(n));
// Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]