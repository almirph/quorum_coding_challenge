# Quorum Coding Challenge - TypeScript Solution

Legislative data analysis tool that processes CSV files containing bills, legislators, votes, and vote results to generate voting statistics.

## Technology Stack

- **TypeScript**
- **Jest** - Testing framework
- **csv-parse/csv-stringify** - CSV processing libraries
- **Node.js fs** - File system operations

## Requirements

- Node.js 18+

## Setup and Execution

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the application:
   ```bash
   npm start
   ```

3. Output files are generated in `public/answers/`:
   - `legislators-support-oppose-count.csv`
   - `bills.csv`

## Testing

Run the test suite:
```bash
npm test
```

## Challenge Questions

### 1. Discuss your solution’s time complexity. What tradeoffs did you make?
I chosed a simple architectural approach that stores the dataset in-memory for ease of manipulation. To improve scalability for larger datasets, the system should be refactored to use file streams and chunk-based processing to reduce the memory footprint.

**Overall Complexity: O(L + B + V + R + B×V + L)**

Where:
- L = number of legislators
- B = number of bills  
- V = number of votes
- R = number of vote results

Tradeoffs:
 - Memory vs Speed - Loaded all data into memory, would need stream for large amount of data.
 - Architecture Complexity - Separate model classes, could have done with simple functions but separation of concerns is easy to test and extend.

### 2. How would you change your solution to account for future columns that might be requested, such as “Bill Voted On Date” or “Co-Sponsors”?
The architecture utilizes Resource and Model abstractions; you simply need to define the columns within them and use the AnswerColumns constant to configure the response output.

### 3. How would you change your solution if instead of receiving CSVs of data, you were given a list of legislators or bills that you should generate a CSV for?
By implementing the IResource interface, you can easily create new resource types to support databases or different file formats. Alternatively, you can modify the existing CSVResource to handle different file sources.

### 4. Time Spent

**Two to three hours**