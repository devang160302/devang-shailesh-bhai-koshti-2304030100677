// Task 5 Banking system :-
/**
 * Class representing a simple Bank Account.
 */
class BankAccount {
    /**
     * @param {string} holder - The name of the account holder.
     * @param {string} number - The account number.
     * @param {number} initialBalance - The starting balance of the account.
     */
    constructor(holder, number, initialBalance = 0.00) {
        this.accountHolder = holder;
        this.accountNumber = number;
        this.balance = initialBalance;
        this.transactions = [];
    }

    /**
     * Validates if the amount is a positive number.
     * @param {number} amount - The amount to check.
     * @returns {boolean} True if valid, false otherwise.
     */
    _isValidAmount(amount) {
        if (typeof amount !== 'number' || amount <= 0) {
            console.error("❌ Transaction failed: Amount must be a positive number.");
            return false;
        }
        return true;
    }

    /**
     * Deposits a specified amount into the account.
     * @param {number} amount - The amount to deposit.
     */
    deposit(amount) {
        if (!this._isValidAmount(amount)) {
            return;
        }

        // Perform Transaction
        this.balance += amount;

        // Record Transaction
        this._recordTransaction("Deposit", amount);

        console.log(`✅ Deposit successful! $${amount.toFixed(2)} added.`);
        console.log(`   New Balance: $${this.balance.toFixed(2)}`);
    }

    /**
     * Withdraws a specified amount from the account, checking for sufficient balance.
     * @param {number} amount - The amount to withdraw.
     */
    withdraw(amount) {
        if (!this._isValidAmount(amount)) {
            return;
        }

        // Balance Validator (The Core Check)
        if (amount > this.balance) {
            console.error("❌ Withdrawal failed: Insufficient funds.");
            console.log(`   Current Balance: $${this.balance.toFixed(2)} | Requested: $${amount.toFixed(2)}`);
            return; // Stop the transaction if insufficient funds
        }

        // Perform Transaction
        this.balance -= amount;

        // Record Transaction
        this._recordTransaction("Withdrawal", amount);

        console.log(`✅ Withdrawal successful! $${amount.toFixed(2)} deducted.`);
        console.log(`   New Balance: $${this.balance.toFixed(2)}`);
    }

    /**
     * Private method to record a successful transaction.
     * @param {string} type - 'Deposit' or 'Withdrawal'.
     * @param {number} amount - The amount of the transaction.
     */
    _recordTransaction(type, amount) {
        const transactionRecord = {
            type: type,
            amount: amount,
            date: new Date().toLocaleString(),
            newBalance: this.balance
        };
        this.transactions.push(transactionRecord);
    }

    /**
     * Displays the current account summary and transaction history.
     */
    getAccountSummary() {
        console.log("\n--- 📝 Account Summary ---");
        console.log(`Holder: ${this.accountHolder}`);
        console.log(`Account No: ${this.accountNumber}`);
        console.log(`Current Balance: $${this.balance.toFixed(2)}`);
        console.log("---------------------------");

        if (this.transactions.length === 0) {
            console.log("No transactions recorded yet.");
        } else {
            console.log("--- Transaction History ---");
            this.transactions.forEach((tx, index) => {
                const sign = tx.type === "Deposit" ? "+" : "-";
                console.log(
                    `${index + 1}. [${tx.date}] ${tx.type}: ${sign}$${tx.amount.toFixed(2)} | Final Balance: $${tx.newBalance.toFixed(2)}`
                );
            });
            console.log("---------------------------\n");
        }
    }
}

// --- Demonstration of the System ---

// 1. Create a new account instance
const myAccount = new BankAccount("Alice Smith", "JS9876", 750.00);

console.log("--- INITIAL STATE ---");
myAccount.getAccountSummary();

console.log("\n--- TEST TRANSACTIONS ---");

// 2. Successful Deposit
myAccount.deposit(150.00); // Balance: $900.00

// 3. Successful Withdrawal
myAccount.withdraw(200.00); // Balance: $700.00

// 4. Withdrawal Failure (Insufficient Funds - The Validation Check)
myAccount.withdraw(800.00); // This should fail and the balance remains $700.00

// 5. Invalid Input Test
myAccount.deposit(-50); // This should fail

console.log("\n--- FINAL STATE ---");
myAccount.getAccountSummary();