// Lucia Ondovcikova

#include <fstream>
#include <iostream>
#include <string>
#include <vector>

bool in_row(std::vector<std::vector<int>>& sudoku, int row, int num) {
    int i;
    for (i = 0;i < 9;i++) {
        if (sudoku[row][i] == num) {
            return true;
        }
    }
    return false;
}


bool in_column(std::vector<std::vector<int>>& sudoku, int column, int num) {
    int i;
    for (i = 0;i < 9;i++) {
        if (sudoku[i][column] == num) {
            return true;
        }
    }
    return false;
}


bool in_box(std::vector<std::vector<int>>& sudoku, int row, int column, int num) {
    int i, j;
    row = row - row % 3;
    column = column - column % 3;
    for (i = row;i < row+3;i++) {
        for (j = column;j < column+3;j++) {
            if (sudoku[i][j] == num) {
                return true;
            }
        }
    }
    return false;
}


bool is_empty(std::vector<std::vector<int>>& sudoku, int& row, int& column) {
    int i, j;
    for (i = 0; i < 9; i++) {
        for (j = 0;j < 9;j++) {
            if (sudoku[i][j] == 0) {
                row = i;
                column = j;
                return false;
            }
        }
    }
    return true;
}


bool solve(std::vector<std::vector<int>>& sudoku) {
    int row, column, i;
    if (is_empty(sudoku, row, column)) {
        return true;        //filled sudoku
    }
    for (i = 1;i <= 9;i++) {
        //if number is in row/column/box
        if (!in_row(sudoku, row, i) && !in_column(sudoku, column, i) && !in_box(sudoku, row, column, i)) {
            sudoku[row][column] = i;
            if (solve(sudoku)) {
                return true;
            }
            sudoku[row][column] = 0;    //fill 0 if solution wasnt ok
        }
    }

    return false;
}


void print_sudoku(std::vector<std::vector<int>>& sudoku) {
    for (int row = 0; row < 9; row++) {
        for (int col = 0; col < 9; col++) {
            std::cout << sudoku[row][col];
        }
    }
    std::cout << std::endl;
}


void write_to_file(std::vector<std::vector<int>>& sudoku, std::ofstream& ofs){
    for (int i = 0; i < 9;i++) {
        for (int j = 0; j < 9;j++) {
            ofs << sudoku[i][j];
        }
    }
    ofs << "\n";
}


//function which check if in every row/column are unique numbers
bool sudoku_check(std::vector<std::vector<int>>& sudoku) {  
    int i, j, sum_row, sum_col;
    for (i = 0; i < 9;i++) {
        sum_col = 0;
        sum_row = 0;
        for (j = 0; j < 9;j++) {
            sum_row += sudoku[i][j];
            sum_col += sudoku[j][i];
        }
        if (sum_row != 45 || sum_col != 45) {
            return false;
        }
    }
    return true;
}


int parse_sudoku_line(std::vector<std::vector<int>>& sudoku, std::string line) {
    int zero_counter = 0;
    if (line.length() != 81) {
        std::cerr << "Invalid line length.\n";
        exit(1);
    }
    for (size_t i = 0; i < 9;i++) {
        for (size_t j = 0; j < 9;j++) {
            char temp = line[i * 9 + j];    //read character
            if ((temp >= '0' && temp <= '9') || temp == '.') {
                if (temp == '.' || temp == '0') {
                    sudoku[i][j] = 0;
                    zero_counter++;
                }
                else {
                    sudoku[i][j] = temp - '0';
                }
            }
            else {
                std::cerr << "Invalid character.\n";
                exit(1);
            }
        }
    }
    return zero_counter;
}


int main(int argc, char* argv[]) {
    std::string line;
    std::vector<std::vector<int>> vec;
    vec.resize(9, std::vector<int>(9));

    switch (argc) {
    case 1: 
        while (std::getline(std::cin, line)) {
            if (parse_sudoku_line(vec, line) == 0) {                    //if sudoku is filled
                if (sudoku_check(vec)) {                                //if filled sudoku is OK
                    print_sudoku(vec);
                }
                else {
                    std::cout << "\n";
                }
                continue;
            }
            if (solve(vec)) {
                print_sudoku(vec);
            }
            else {
                std::cout << "\n";
            }
        }
        break;
    case 3:
        if (std::string(argv[1]) == "-i") {             //input from file, output to console
            std::ifstream ifs(argv[2]);
            if (!ifs.is_open()) {
                std::cerr << "Cannot open ifs file.\n";
                return 1;
            }
            while (std::getline(ifs, line)) {
                if (parse_sudoku_line(vec, line) == 0) {                    //if sudoku is filled
                    if (sudoku_check(vec)) {                                //if filled sudoku is OK
                        print_sudoku(vec);
                    }
                    else {
                        std::cout << "\n";
                    }
                    continue;
                }
                if (solve(vec)) {
                    print_sudoku(vec);
                }
                else {
                    std::cout << "\n";
                }
            }
            if (!ifs.eof()) {
                std::cerr << "Cannot read whole input file.\n";
                return 1;
            }
        }
        else if (std::string(argv[1]) == "-o") {        //input from console, output to file
            std::ofstream ofs(argv[2]);
            if (!ofs.is_open()) {
                std::cerr << "Cannot open ofs file.\n";
                return 1;
            }
            while (std::getline(std::cin, line)) {
                if (parse_sudoku_line(vec, line) == 0) {                    //if sudoku is filled
                    if (sudoku_check(vec)) {                                //if filled sudoku is OK
                        write_to_file(vec, ofs);
                    }
                    else {
                        ofs << "\n";
                    }
                    continue;
                }
                if (solve(vec)) {
                    write_to_file(vec, ofs);
                }
                else {
                    ofs << "\n";
                }
            }
        }
        else if (std::string(argv[1]) == "--check") {
            line = std::string(argv[2]);
            if (parse_sudoku_line(vec, line) == 0) {                    //if sudoku is filled
                if (sudoku_check(vec)) {                                //if filled sudoku is OK
                    std::cout << 1 << std::endl;
                }
                else {
                    std::cout << 0 << std::endl;
                }
            }
            if (solve(vec)) {
                std::cout << 1 << std::endl;
            }
            else {
                std::cout << 0 << std::endl;
            }
        }
        break;
    case 5:
        if ((std::string(argv[1]) == "-i" && std::string(argv[3]) == "-o") || (std::string(argv[1]) == "-o" && std::string(argv[3]) == "-i")) {
            std::string input, output;
            if (std::string(argv[1]) == "-i") {
                input = std::string(argv[2]);
                output = std::string(argv[4]);
            }
            else {
                input = std::string(argv[4]);
                output = std::string(argv[2]);
            }
            std::ifstream ifs(input);
            if (!ifs.is_open()) {
                std::cerr << "Cannot open ifs file.\n";
                return 1;
            }
            std::ofstream ofs(output);
            if (!ofs.is_open()) {
                std::cerr << "Cannot open ofs file.\n";
                return 1;
            }
            while (std::getline(ifs, line)) {
                if (parse_sudoku_line(vec, line) == 0) {                    //if sudoku is filled
                    if (sudoku_check(vec)) {                                //if filled sudoku is OK
                        write_to_file(vec, ofs);
                    }
                    else {
                        ofs << "\n";
                    }
                    continue;
                }
                if (solve(vec)) {
                    write_to_file(vec, ofs);
                }
                else {
                    ofs << "\n";
                }
            }
            if (!ifs.eof()) {
                std::cerr << "Cannot read whole input file.\n";
                return 1;
            }
        }
        break;
    default:
        std::cerr << "Wrong arguments" << std::endl;
        return 1;
    }

	return 0;
}
