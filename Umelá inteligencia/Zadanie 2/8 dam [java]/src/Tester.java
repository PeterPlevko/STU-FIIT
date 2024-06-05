/**
 * Class containing tests
 */
public class Tester {
    /**
     * Tests success rate of Beam Search
     * Output is list of pairs of values separated with a semicolon
     * first value is beam width, second is success rate
     * @param dims dimensions of board to execute tests on
     * @param iterLimit amount of iterations after which beam search will be stopped
     * @param testCount amount of tests to execute at each value of parameter
     */
    public static void BSSuccessRate(int dims, int iterLimit, int testCount) {
        double successRate;
        for (int beamWidth = 3; beamWidth <= 30; beamWidth+=3) {
            byte[][] initialBoards = new byte[beamWidth][];
            int successful = 0;
            for (int i = 0; i < testCount; i++) {
                for (int j = 0; j < beamWidth; j++)
                    initialBoards[j] = Solver.generateRandomBoard(dims);
                if (Solver.beamSearch(initialBoards, beamWidth, iterLimit) != null) {
                    successful++;
                }
            }
            successRate = (double) successful / testCount;
            System.out.println(beamWidth + ";" + successRate);
        }
    }

    /**
     * Measures execution time of Beam Search
     * Output is list of pairs of values separated with a semicolon
     * first value is beam width, second is time in ms
     * @param dims dimensions of board to execute tests on
     * @param iterLimit amount of iterations after which beam search will be stopped
     * @param testCount amount of tests to execute at each value of parameter
     */
    public static void BSTime(int dims, int iterLimit, int testCount)
    {
        for (int beamWidth = 3; beamWidth <= 30; beamWidth+=3) {
            byte[][] initialBoards = new byte[beamWidth][];
            int successful = 0;
            double sum = 0;
            while (successful < testCount) {
                byte[] solution;
                for (int j = 0; j < beamWidth; j++)
                    initialBoards[j] = Solver.generateRandomBoard(dims);
                double start = System.nanoTime();
                solution = Solver.beamSearch(initialBoards,beamWidth,iterLimit);
                double end = System.nanoTime();
                double duration = end - start;
                if (solution != null)
                {
                    sum += Utility.nanoSecToSec(duration);
                    successful++;
                }
            }
            System.out.printf("%d;%.9f",beamWidth,(sum/testCount*1000));
            System.out.println();
        }
    }
    /**
     * Tests success rate of Tabu Search
     * Output is list of pairs of values separated with a semicolon
     * first value is max. size of tabuList, second is success rate
     * @param dims dimensions of board to execute tests on
     * @param iterLimit amount of iterations after which tabu search will be stopped
     * @param testCount amount of tests to execute at each value of parameter
     */
    public static void TSSuccessRate(int dims, int iterLimit, int testCount) {
        double successRate;
        for (int tabuLimit = 1; tabuLimit <= 10; tabuLimit+=1) {
            byte[] initialBoard;
            int successful = 0;
            for (int i = 0; i < testCount; i++) {
                initialBoard = Solver.generateRandomBoard(dims);
                if (Solver.tabuSearch(initialBoard,tabuLimit,iterLimit) != null) {
                    successful++;
                }
            }
            successRate = (double) successful / testCount;
            System.out.println(tabuLimit + ";" + successRate);
        }
    }

    /**
     * Measures execution time of Tabu Search
     * Output is list of pairs of values separated with a semicolon
     * first value is max. size of tabuList, second is time in ms
     * @param dims dimensions of board to execute tests on
     * @param iterLimit amount of iterations after which tabu search will be stopped
     * @param testCount amount of tests to execute at each value of parameter
     */
    public static void TSTime(int dims, int iterLimit, int testCount)
    {
        for (int tabuLimit = 1; tabuLimit <= 10; tabuLimit+=1) {
            byte[] initialBoard;
            int successful = 0;
            double sum = 0;
            while (successful < testCount) {
                byte[] solution;
                initialBoard = Solver.generateRandomBoard(dims);
                double start = System.nanoTime();
                solution = Solver.tabuSearch(initialBoard,tabuLimit,iterLimit);
                double end = System.nanoTime();
                double duration = end - start;
                if (solution != null)
                {
                    sum += Utility.nanoSecToSec(duration);
                    successful++;
                }
            }
            System.out.printf("%d;%.9f",tabuLimit,(sum/testCount*1000));
            System.out.println();
        }
    }
    /**
     * Tests success rate of Simulated Annealing
     * Output is list of pairs of values separated with a semicolon
     * first value is cooling rate, second is success rate
     * @param dims dimensions of board to execute tests on
     * @param iterLimit amount of iterations after which simulated annealing will be stopped
     * @param testCount amount of tests to execute at each value of parameter
     */
    public static void SASuccessRate(int dims, int iterLimit, int testCount)
    {
        double successRate;
        byte[] initialBoard;
        double temperature = 100;
        for (double coolingFactor = 0.85; coolingFactor < 1; coolingFactor+=0.01) {
            int successful = 0;
            for (int i = 0; i < testCount; i++) {
                initialBoard = Solver.generateRandomBoard(dims);
                if (Solver.simulatedAnnealing(initialBoard, temperature, coolingFactor, iterLimit) != null)
                    successful++;
            }
            successRate = (double) successful / testCount;
            System.out.printf("%.2f; %.4f",coolingFactor,successRate);
            System.out.println();
        }
    }

    /**
     * Measures execution time of Simulated Annealing
     * Output is list of pairs of values separated with a semicolon
     * first value is cooling rate, second is time in ms
     * @param dims dimensions of board to execute tests on
     * @param iterLimit amount of iterations after which simulated annealing will be stopped
     * @param testCount amount of tests to execute at each value of parameter
     */
    public static void SATime(int dims, int iterLimit, int testCount)
    {
        byte[] initialBoard;
        double temperature = 100;
        for (double coolingFactor = 0.85; coolingFactor < 1; coolingFactor+=0.01) {
            int successful = 0;
            double sum = 0;
            while (successful < testCount) {
                byte[] solution;
                initialBoard = Solver.generateRandomBoard(dims);
                double start = System.nanoTime();
                solution = Solver.simulatedAnnealing(initialBoard, temperature, coolingFactor, iterLimit);
                double end = System.nanoTime();
                double duration = end - start;
                if (solution != null)
                {
                    sum += Utility.nanoSecToSec(duration);
                    successful++;
                }
            }
            System.out.printf("%.2f;%.9f",coolingFactor, (sum/testCount*1000));
            System.out.println();
        }
    }

}
