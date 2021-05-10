import java.util.Arrays;

/**
 * Class contains helper functions to run the program
 */
public class Utility {
    public static final String ANSI_RESET = "\u001B[0m";
    public static final String RED_BOLD = "\033[1;31m";    // RED
    public static final String YELLOW_BOLD = "\033[1;33m"; // YELLOW
    public static final String CYAN_BOLD = "\033[1;36m";   // CYAN


    public static double nanoSecToSec(double nanoSeconds)
    {
        return nanoSeconds / 1000000000;
    }
    public static int getRandomNum(int max)
    {
        return (int)(Math.random() * (max + 1));
    }

    /**
     * converts row and column of 2D array to index in 1D array
     * @param r row
     * @param c column
     * @param dims dimensions of the board
     * @return index in string
     */
    private static int rcToIndex(int r, int c, int dims) {
        return r * dims + c;
    }

    /**
     * prints board
     * @param board board to be printed
     */
    public static void printMap(byte [] board)
    {
        if(board == null)
            return;
        int dims = board.length;
        boolean [] map = byteToBoolMap(board);
        int k = 0;
        System.out.print("   ");
        String space = "  ";
        for (int i = 0; i < dims; i++) {
            if (i>9)
                space = " ";
            System.out.print(i + space);
        }
        System.out.println();
        for (int i = 0; i < map.length; i++) {
            String color = CYAN_BOLD;
            if (k % 2 == 0 || dims % 2 == 1) {
                if (i % 2 == 0)
                    color = YELLOW_BOLD;
            }
            else {
                if (i % 2 == 1)
                    color = YELLOW_BOLD;
            }
            String spaces = "  ";
            if(k > 9)
                spaces = " ";
            if(i % dims ==  0)
                System.out.print(k + spaces);
            if(!map[i]) {
                System.out.print(color + "o  " + ANSI_RESET);
            }
            else
                System.out.print(RED_BOLD + "X  " + ANSI_RESET);
            if((i + 1) % dims ==  0) {
                k++;
                System.out.println();
            }
        }
        System.out.println();
    }

    private static boolean[] byteToBoolMap(byte [] board)
    {
        boolean [] boolMap = new boolean[board.length * board.length];
        for (int c = 0; c < board.length; c++)
        {
            boolMap[rcToIndex(board[c],c,board.length)] = true;
        }
        return boolMap;
    }

    public static boolean contains(byte[][] haystack, byte[] needle)
    {
        for (byte[] piece : haystack)
        {
            if (Arrays.equals(piece,needle))
                return true;
        }
        return false;
    }


}
