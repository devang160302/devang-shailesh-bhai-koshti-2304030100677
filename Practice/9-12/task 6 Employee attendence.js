// Task 6 Employee attendence :-
/**
 * Class representing an Employee Attendance Processing System.
 */
class AttendanceProcessor {
    constructor() {
        // Map to store attendance data: EmployeeID -> [{type: 'in', time: Date}, {type: 'out', time: Date}, ...]
        this.records = new Map();
    }

    /**
     * Records a clock-in event for an employee.
     * @param {string} employeeId - The unique ID of the employee.
     * @param {Date} [time=new Date()] - The time of the clock-in (defaults to current time).
     */
    clockIn(employeeId, time = new Date()) {
        if (!this.records.has(employeeId)) {
            this.records.set(employeeId, []);
        }

        const employeeRecords = this.records.get(employeeId);

        // Basic validation: Prevent double clock-in without a clock-out
        if (employeeRecords.length > 0 && employeeRecords[employeeRecords.length - 1].type === 'in') {
            console.error(`⚠️ Employee ${employeeId} attempted to clock in twice without clocking out.`);
            return;
        }

        employeeRecords.push({
            type: 'in',
            time: time
        });
        console.log(`✅ ${employeeId} clocked IN at ${time.toLocaleString()}`);
    }

    /**
     * Records a clock-out event for an employee.
     * @param {string} employeeId - The unique ID of the employee.
     * @param {Date} [time=new Date()] - The time of the clock-out (defaults to current time).
     */
    clockOut(employeeId, time = new Date()) {
        const employeeRecords = this.records.get(employeeId);

        if (!employeeRecords || employeeRecords.length === 0 || employeeRecords[employeeRecords.length - 1].type === 'out') {
            console.error(`⚠️ Employee ${employeeId} attempted to clock out without a matching clock-in.`);
            return;
        }

        employeeRecords.push({
            type: 'out',
            time: time
        });
        console.log(`✅ ${employeeId} clocked OUT at ${time.toLocaleString()}`);
    }

    /**
     * Calculates the total hours worked for an employee based on their records.
     * @param {string} employeeId - The unique ID of the employee.
     * @returns {number} Total hours worked.
     */
    _calculateHoursWorked(employeeId) {
        const records = this.records.get(employeeId);
        let totalMilliseconds = 0;

        if (!records) return 0;

        // Iterate through records, pairing 'in' and 'out' events
        for (let i = 0; i < records.length; i++) {
            const current = records[i];
            const next = records[i + 1];

            if (current.type === 'in' && next && next.type === 'out') {
                // Calculate difference in milliseconds
                const duration = next.time.getTime() - current.time.getTime();
                totalMilliseconds += duration;
                i++; // Skip the 'out' event as it has been processed
            }
            // If the last event is an 'in', it's an unmatched shift and is ignored in this simple calculation
        }

        // Convert total milliseconds to hours
        return totalMilliseconds / (1000 * 60 * 60);
    }

    /**
     * Generates a summary report for all employees.
     * @returns {Array<object>} A list of employee summaries.
     */
    generateReport() {
        const report = [];

        for (const employeeId of this.records.keys()) {
            const hours = this._calculateHoursWorked(employeeId);
            report.push({
                employeeId: employeeId,
                totalHours: hours.toFixed(2),
                rawRecords: this.records.get(employeeId)
            });
        }
        return report;
    }
}

// --- Demonstration of the System ---

// 1. Initialize the system
const attendanceSystem = new AttendanceProcessor();

// 2. Define custom dates for testing (Year, MonthIndex, Day, Hour, Minute)
const date1_in = new Date(2025, 11, 9, 9, 0); // Dec 9th,