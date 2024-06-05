import java.util.Arrays;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.Queue;

public class Solver {

    /**
     * Solves N queens problem by simulated annealing
     * @param initialBoard initial configuration of queens
     * @param temperature initial temperature
     * @param coolingFactor cooling factor
     * @param iterLimit amount of iterations after which programs stops
     * @return array of bytes representing solution, null if no solution was found
     */
    public static byte[] simulatedAnnealing(byte[] initialBoard, double temperature, double coolingFactor, int iterLimit)
    {
        int dims = initialBoard.length;
        byte[][] newBoards;
        byte[] currentBest = null;
        int iterations = 0;
        int attemptLimit = dims*(dims-1)*100;
        while (true)
        {
            iterations++;
            if (iterations>iterLimit)
            {
                return null;
            }

            if (currentBest != null)
                newBoards = generateBoards(currentBest, dims);
            else
                newBoards = generateBoards(initialBoard, dims); //first iteration

            int index = Utility.getRandomNum(newBoards.length - 1);
            if (currentBest == null)
                currentBest = newBoards[index];
            else {
                boolean chosen = false;
                int attempts = 0;
                int currCost = countFitness(currentBest);
                while (!chosen) {
                    attempts++;
                    if (attempts == attemptLimit) {
                        return null;
                    }
                    index = Utility.getRandomNum(newBoards.length - 1);
                    if (countFitness(newBoards[index]) < currCost) {
                        currentBest = newBoards[index];
                        chosen = true;
                    }
                    else {
                        double diff = currCost - countFitness(newBoards[index]);
                        if (diff == 0)
                            diff = -0.1;

                        double prob = Math.exp(diff / temperature);
                        if (Math.random() < prob) {
                            currentBest = newBoards[index];
                            chosen = true;
                        }
                    }
                }
            }
            temperature *= coolingFactor;
            if(temperature == 0) {
                System.out.println("a");
                return null;
            }
            if(isSolution(currentBest))
            {
                return currentBest;
            }
        }
    }

    /**
     * Solves N queens problem by tabu search
     * @param initialBoard initial configuration of queens
     * @param tabuLimit max. size of tabu list
     * @param iterLimit amount of iterations after which programs stops
     * @return array of bytes representing solution, null if no solution was found
     */
    public static byte[] tabuSearch(byte[] initialBoard, int tabuLimit, int iterLimit) {
        Queue<Integer> tabu = new LinkedList<>();
        int dims = initialBoard.length;
        byte[][] newBoards;
        byte[] currentBest = null;
        int iterations = 0;
        while (true) {
            iterations++;
            if (iterations > iterLimit) {
                return null;
            }
            if (currentBest != null)
                newBoards = generateBoards(currentBest, dims);
            else
                newBoards = generateBoards(initialBoard, dims); //first iteration

            Arrays.sort(newBoards, Comparator.comparingInt(Solver::countFitness));
            // adding to tabuList
            int i = 0;
            if (currentBest != null) {
                for (i = 0; i < newBoards.length; i++) {
                    if (!tabu.contains(Arrays.hashCode(newBoards[i]))) {
                        break;
                    }
                }
                // if new state is worse than previous - add previous to tabuList
                if (countFitness(currentBest) <= countFitness(newBoards[i])) {
                    if (tabu.size() >= tabuLimit)
                        tabu.remove();
                    tabu.add(Arrays.hashCode(currentBest));
                }
            }
            currentBest = newBoards[i];
            if (isSolution(currentBest)) {
                return currentBest;
            }
        }
    }

    /**
     * Solves N queens problem by beam search
     * @param initialBoards array of initial configurations
     * @param beamWidth beam width
     * @param iterLimit amount of iterations after which programs stops
     * @return array of bytes representing solution, null if no solution was found
     */
    public static byte[] beamSearch(byte[][] initialBoards, int beamWidth, int iterLimit) {
        int dims = initialBoards[0].length;
        byte[][] newBoards;
        byte[][] currentBest = new byte[beamWidth][];
        byte[][] allNewBoards = new byte[dims * (dims - 1) * beamWidth][];
        int iterations = 0;
        while (true) {
            iterations++;
            if (iterations > iterLimit) {
                return null;
            }
            for (int i = 0; i < beamWidth; i++) {
                if (currentBest[i] != null)
                    newBoards = generateBoards(currentBest[i], dims);
                else
                    newBoards = generateBoards(initialBoards[i], dims);
                int x = 0;
                for (int j = dims * (dims - 1) * i; j < dims * (dims - 1) * (i + 1); j++)
                    allNewBoards[j] = newBoards[x++];
            }
            // sort descendants by their fitness
            Arrays.sort(allNewBoards, Comparator.comparingInt(Solver::countFitness));
            // chose K best
            Arrays.fill(currentBest, null);
            int k = 0;
            for (int i = 0; k < beamWidth; i++)
                if(!Utility.contains(currentBest,allNewBoards[i]))
                    currentBest[k++] = allNewBoards[i];

            if (isSolution(currentBest[0])) {
                return currentBest[0];
            }
        }
    }

    private static boolean isSolution(byte[] board)
    {
        return countFitness(board) == 0;
    }

    /**
     * Generates random initial state
     * @param dims dimensions of chessboard
     * @return new state
     */
    public static byte[] generateRandomBoard(int dims) {
        byte[] board = new byte[dims];
        for (int i = 0; i < board.length; i++)
            board[i] = (byte) Utility.getRandomNum(dims - 1);
        return board;
    }

    /**
     * Generates all descendants of a board
     * @param initialBoard board to generate descendants
     * @param dims dimensions of the board
     * @return array of all descendants
     */
    public static byte[][] generateBoards(byte[] initialBoard, int dims)
    {
        byte [][] newBoards = new byte[dims * (dims - 1)][];
        int k = 0;
        for (int col = 0; col < dims; col++)
        {
            byte initialRow = initialBoard[col];
            for (byte row = 0; row < dims; row++)
            {
                if (row == initialRow)
                    continue;
                byte [] newBoard = Arrays.copyOf(initialBoard, dims);
                newBoard[col] = row;
                newBoards[k++] = newBoard;
            }
        }
        return newBoards;
    }

    /**
     * Counts fitness of a board
     * @param board board to count fitness on
     * @return number representing fitness of given board
     */
    public static int countFitness(byte [] board)
    {
        int fitness = 0;
        for (int i = 0; i < board.length; i++)
        {
            for (int j = i + 1; j < board.length; j++)
            {
                // row | diagonals
                if(board[j] == board[i] || (Math.abs(board[i] - board[j]) ==  j - i))
                    fitness++;
            }
        }
        return fitness;
    }
}
