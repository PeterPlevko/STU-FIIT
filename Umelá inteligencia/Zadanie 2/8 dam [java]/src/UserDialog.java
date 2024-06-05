import java.util.Scanner;

public class UserDialog {
    public static void run() {
        Scanner in = new Scanner(System.in);
        String choice;
        int dims, iterLimit, testCount;
        byte[] initialBoard, solution;
        while (true) {
            System.out.println("N Queens");
            System.out.println("1 - Solve a board");
            System.out.println("2 - Run tests (success rate or time)");
            System.out.println("3 - exit");
            choice = in.nextLine();
            switch (choice) {
                case "1":
                    String choice1;
                    System.out.println("Enter dimensions of chessboard");
                    dims = Integer.parseInt(in.nextLine());
                    System.out.println("Which algorithm would you like to apply?");
                    System.out.println("1 - Beam Search");
                    System.out.println("2 - Tabu Search");
                    System.out.println("3 - Simulated Annealing");
                    choice1 = in.nextLine();
                    switch (choice1) {
                        case "1":
                            System.out.println("Enter beam width");
                            int beamWidth = Integer.parseInt(in.nextLine());
                            System.out.println("Enter amount of iterations after which algorithm stops");
                            iterLimit = Integer.parseInt(in.nextLine());
                            byte[][] initialBoards = new byte[beamWidth][];
                            for (int j = 0; j < beamWidth; j++)
                                initialBoards[j] = Solver.generateRandomBoard(dims);
                            solution = Solver.beamSearch(initialBoards, beamWidth, iterLimit);
                            if (solution != null)
                                Utility.printMap(solution);
                            else
                                System.out.println("Algorithm could not find solution");
                            break;
                        case "2":
                            System.out.println("Enter max. size of tabuList");
                            int tabuLimit = Integer.parseInt(in.nextLine());
                            System.out.println("Enter amount of iterations after which algorithm stops");
                            iterLimit = Integer.parseInt(in.nextLine());
                            initialBoard = Solver.generateRandomBoard(dims);
                            solution = Solver.tabuSearch(initialBoard, tabuLimit, iterLimit);
                            if (solution != null)
                                Utility.printMap(solution);
                            else
                                System.out.println("Algorithm could not find solution");
                            break;
                        case "3":
                            System.out.println("Enter initial temperature");
                            double initialTemp = Double.parseDouble(in.nextLine());
                            System.out.println("Enter cooling rate (0-1)");
                            double coolingRate = Double.parseDouble(in.nextLine());
                            System.out.println("Enter amount of iterations after which algorithm stops");
                            iterLimit = Integer.parseInt(in.nextLine());
                            initialBoard = Solver.generateRandomBoard(dims);
                            solution = Solver.simulatedAnnealing(initialBoard, initialTemp, coolingRate, iterLimit);
                            if (solution != null)
                                Utility.printMap(solution);
                            else
                                System.out.println("Algorithm could not find solution");
                            break;
                    }
                    break;
                case "2":
                    System.out.println("Which test would you like to run?");
                    System.out.println("1 - Beam Search success rate");
                    System.out.println("2 - Beam Search time");
                    System.out.println("3 - Tabu Search success rate");
                    System.out.println("4 - Tabu Search time");
                    System.out.println("5 - Simulated Annealing success rate");
                    System.out.println("6 - Simulated Annealing time");
                    String choice2 = in.nextLine();
                    System.out.println("Enter dimensions of the board to run tests on");
                    dims = Integer.parseInt(in.nextLine());
                    System.out.println("Enter amount of iterations after which algorithm stops");
                    iterLimit = Integer.parseInt(in.nextLine());
                    System.out.println("Enter amount of tests to execute on each value of parameter (approximation)");
                    testCount = Integer.parseInt(in.nextLine());
                    switch (choice2) {
                        case "1":
                            Tester.BSSuccessRate(dims, iterLimit, testCount);
                            break;
                        case "2":
                            Tester.BSTime(dims, iterLimit, testCount);
                            break;
                        case "3":
                            Tester.TSSuccessRate(dims, iterLimit, testCount);
                            break;
                        case "4":
                            Tester.TSTime(dims, iterLimit, testCount);
                            break;
                        case "5":
                            Tester.SASuccessRate(dims, iterLimit, testCount);
                            break;
                        case "6":
                            Tester.SATime(dims, iterLimit, testCount);
                            break;

                    }
                    break;
                case "3":
                    return;
                default:
                    System.out.println("Wrong choice");
                    break;
            }
        }
    }
}
