//Lucia Ondovcikova

#include <fstream>
#include <sstream>
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <chrono>
#include <cfloat>


const int SIZE = 8;
const int MINMAX_DEPTH = 5;


struct player {
    char character;
    int time;
};
player my_player;


struct move {
    size_t tile;
    std::vector<size_t> flippable_coors;
};


// ERROR
void throw_error(std::string message) {
    std::clog << message << std::endl;
    exit(1);
}


// VALIDATION
bool is_digits(const std::string& str) {
    return std::all_of(str.begin(), str.end(), ::isdigit);
}


bool right_game_chars(const std::string& str) {
    return str.find_first_not_of("-OX") == std::string::npos;
}


void check_game(std::string game) {
    if (game.size() != 64) {
        throw_error("Invalid game length.");
    }
    if (!right_game_chars(game)) {
        throw_error("Invalid game coding.");
    }
}


void check_number(std::string number) {
    if (!is_digits(number)) {
        throw_error("Invalid number.");
    }
    int num = stoi(number);
    if (num < 2 || num > 30) {
        throw_error("Unsupported number value.");
    }
}


void check_color(std::string color) {
    if (!(color == "B" || color == "W")) {
        throw_error("Invalid color.");
    }
}


void check_length(std::vector<std::string>& parameters, size_t length) {
    if (parameters.size() != length) {
        throw_error("Invalid number of parameters.");
    }
}


// PARSING
void parse_command(std::string command, std::vector<std::string>& parameters) {
    std::istringstream iss(command);
    for (command; iss >> command; ) {
        parameters.push_back(command);
    }
}


// GAME MOVES
bool out_of_board(size_t position, size_t neighbour) {
    if ((neighbour < 0) || (neighbour > 63) || (((position % SIZE) == 0) && ((neighbour % SIZE) == SIZE - 1)) || (((position % SIZE) == SIZE - 1) && ((neighbour % SIZE) == 0))) {
        return true;
    }
    else {
        return false;
    }
}


bool empty_spot(char position) {
    return position == '-';
}


void check_neighbours(std::string& board, size_t position, std::vector<move>& possible_moves, char player) {
    std::vector<int> neighbours{ -SIZE - 1, -SIZE, -SIZE + 1 , -1, +1, +SIZE - 1, +SIZE , +SIZE + 1 };
    std::vector<size_t> flippable_temp;

    // add start position
    flippable_temp.push_back(position);

    // check neigbours
    for (size_t i = 0; i < neighbours.size(); i++) {
        size_t curr_position = position + neighbours[i];
        size_t counter = 0;

        do {
            // check out of board
            if (out_of_board(curr_position - neighbours[i], curr_position)) {
                flippable_temp.erase(flippable_temp.end() - counter, flippable_temp.end());
                break;
            }
            // if next tile is also empty, nothing to flip            
            if (empty_spot(board[curr_position])) {
                // if there is a row with same color and then empty spot -> cannot flip
                flippable_temp.erase(flippable_temp.end() - counter, flippable_temp.end());
                break;
            }
            // if opposite color -> count sum, else break bcs found start point
            if (board[curr_position] != player) {
                flippable_temp.push_back(curr_position);
                counter++;
            }
            else {
                break;
            }
            curr_position += neighbours[i];
        } while (true);
    }

    // if exists at least one flipable coin, add to possible moves
    if (flippable_temp.size() > 1) {
        move movement;
        movement.tile = position;
        movement.flippable_coors = flippable_temp;
        possible_moves.push_back(movement);
    }
}


std::vector<move> find_possible_moves(std::string& board, char player) {
    std::vector<move> possible_moves;

    for (size_t i = 0; i < board.size(); i++) {
        if (empty_spot(board[i])) {
            check_neighbours(board, i, possible_moves, player);
        }
    }

    return possible_moves;
}


void flip(std::string& board, move movement, char player) {
    // after choosed move flip coins
    for (size_t i = 0; i < movement.flippable_coors.size(); i++) {
        board[movement.flippable_coors[i]] = player;
    }
}


bool game_over(std::string& board, bool maximizer) {
    char player = (maximizer) ? (my_player.character) : ((my_player.character == 'O') ? ('X') : ('O'));
    std::vector<move> possible_moves = find_possible_moves(board, player);

    return possible_moves.size() == 0;
}


// HEURISTIC FUNCTIONS to calculate value of movement
void calculate_parity_utility_potencional_mobility(std::string board, double& parity, double& empty_spot, double& disc_squares) {
    size_t my_coins = 0, opp_coins = 0, my_neighbour_empty = 0, opp_neighbour_empty = 0;
    disc_squares = 0;

    std::vector<int> neighbours{ -SIZE - 1, -SIZE, -SIZE + 1 , -1, +1, +SIZE - 1, +SIZE , +SIZE + 1 };

    // weights of tiles (source: https://github.com/sadeqsheikhi/reversi_python_ai/blob/master/reversiai.py)
    std::vector<int> weights = {    20, -3, 11, 8, 8, 11, -3, 20,
                                    -3, -7, -4, 1, 1, -4, -7, -3,
                                    11, -4, 2, 2, 2, 2, -4, 11,
                                    8, 1, 2, -3, -3, 2, 1, 8,
                                    8, 1, 2, -3, -3, 2, 1, 8,
                                    11, -4, 2, 2, 2, 2, -4, 11,
                                    -3, -7, -4, 1, 1, -4, -7, -3,
                                    20, -3, 11, 8, 8, 11, -3, 20    };

    for (int i = 0; i < SIZE * SIZE; i++) {
        if (board[i] != '-') {
            // calculates number of coins & weight of tiles
            if (board[i] == my_player.character) {
                my_coins++;
                disc_squares += weights[i];
            }
            else {
                opp_coins++;
                disc_squares -= weights[i];
            }
            // calculates empty spots around tile
            for (int j = 0; j < SIZE; j++) {
                int neighbour = i + neighbours[j];
                if (!out_of_board(i, neighbour) && board[neighbour] == '-') {
                    if (board[i] == my_player.character) {
                        my_neighbour_empty++;
                    }
                    else {
                        opp_neighbour_empty++;
                    }
                }
            }
        }
    }

    // calculates difference between coins
    if (my_coins > opp_coins) {
        parity = (100.0 * my_coins) / (my_coins + opp_coins);
    }
    else if (my_coins < opp_coins) {
        parity = -(100.0 * opp_coins) / (my_coins + opp_coins);
    }
    else {
        parity = 0;
    }

    // calculates empty spots around tile
    if (my_neighbour_empty > opp_neighbour_empty) {
        empty_spot = -(100.0 * my_neighbour_empty) / (my_neighbour_empty + opp_neighbour_empty);
    }
    else if (my_neighbour_empty < opp_neighbour_empty) {
        empty_spot = (100.0 * opp_neighbour_empty) / (my_neighbour_empty + opp_neighbour_empty);
    }
    else {
        empty_spot = 0;
    }
}


void calculate_mobility(std::string board, double& mobility) {
    char opp = (my_player.character == 'O') ? ('X') : ('O');
    std::vector<move> my_moves = find_possible_moves(board, my_player.character);
    std::vector<move> opp_moves = find_possible_moves(board, opp);

    if (my_moves.size() > opp_moves.size()) {
        mobility = (100.0 * my_moves.size()) / (my_moves.size() + opp_moves.size());
    }
    else if (my_moves.size() < opp_moves.size()) {
        mobility = -(100.0 * opp_moves.size()) / (my_moves.size() + opp_moves.size());
    }
    else {
        mobility = 0;
    }
}


void calculate_corners(std::string board, double& corners, double& close_corners) {
    int my_corners = 0, opp_corners = 0, my_close_corners = 0, opp_close_corners = 0;
    char opp = (my_player.character == 'O') ? ('X') : ('O');

    std::vector<size_t> corners_coor = { 0, SIZE - 1, SIZE * (SIZE - 1), SIZE * SIZE - 1 };

    std::vector<size_t> close_corners_coor = {  1, SIZE + 1, SIZE,
                                                SIZE - 2, 2 * SIZE - 2, 2 * SIZE - 1,
                                                (SIZE - 2) * SIZE, (SIZE - 2) * SIZE + 1, (SIZE - 1) * SIZE + 1,
                                                (SIZE - 1) * SIZE - 1, (SIZE - 1) * SIZE - 2, SIZE * SIZE - 2
                                            };

    for (size_t i = 0; i < corners_coor.size(); i++) {
        if (board[corners_coor[i]] == my_player.character) {
            my_corners++;
        }
        else if (board[corners_coor[i]] == opp) {
            opp_corners++;
        }
        else {
            for (size_t j = 0; j < 3; j++) {
                if (board[close_corners_coor[i * 3 + j]] == my_player.character) {
                    my_close_corners++;
                }
                else if (board[close_corners_coor[i * 3 + j]] == opp) {
                    opp_close_corners++;
                }
            }
        }
    }

    corners = 25. * (my_corners - opp_corners);
    close_corners = -12.5 * (my_close_corners - opp_close_corners);
}


double heuristic(std::string board) {
    double parity, mobility, corners, close_corners, empty_spots, disk_squares;

    // 1.1 COIN PARITY: difference between max-player and min-player coins
    // 1.2 UTILITY VALUE: static board of weights associated to each coin position
    // 1.3 POTENCIONAL MOBILITY: number of possible moves over next few moves
    calculate_parity_utility_potencional_mobility(board, parity, empty_spots, disk_squares);

    // 2. MOBILITY: possible number of moves for max/min player
    calculate_mobility(board, mobility);

    // 3. CORNERS + CLOSE CORNERS
    calculate_corners(board, corners, close_corners);

    // FINAL SCORE - adding different weights to different evaluations (source: https://github.com/sadeqsheikhi/reversi_python_ai/blob/master/reversiai.py)
    return (10 * parity) + (801.724 * corners) + (382.026 * close_corners) + (78.922 * mobility) + (74.396 * empty_spots) + (10 * disk_squares);
}


// helper function to check time
bool enough_time(std::chrono::high_resolution_clock::time_point start) {
    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> total_time = duration_cast<std::chrono::duration<double>>(end - start);

    return (my_player.time - total_time.count()) > 0.2;
}


// AI program which returns optimal move for current player
std::pair<double, size_t> minmax(int depth, std::string board, size_t tile, bool maximizer, double alpha, double beta, std::chrono::high_resolution_clock::time_point start) {
    if (depth == 0 || game_over(board, maximizer)) {
        return { heuristic(board),tile };
    }

    if (maximizer) {
        std::vector<move> move_list = find_possible_moves(board, my_player.character);
        std::pair<double, size_t> max_val = { -DBL_MAX, SIZE * SIZE };  // initializing { min value, tile which doesnt exist }

        // recur for every leaf
        for (size_t i = 0; i < move_list.size(); i++) {

            // must remember tile value of first move
            size_t temp_tile = (tile == SIZE * SIZE) ? move_list[i].tile : tile;

            // change board to actual state
            std::string temp_board = board;
            flip(temp_board, move_list[i], my_player.character);

            std::pair<double, size_t> evaluation = minmax(depth - 1, temp_board, temp_tile, false, alpha, beta, start);
            max_val = (evaluation.first > max_val.first) ? evaluation : max_val;

            // if not enough time, return max value
            if (!enough_time(start)) {
                return max_val;
            }

            // alpha beta pruning
            alpha = std::max(alpha, max_val.first);
            if (beta <= alpha) {
                break;
            }
        }
        return max_val;
    }
    else {
        char opp = (my_player.character == 'O') ? ('X') : ('O');

        std::vector<move> move_list = find_possible_moves(board, opp);
        std::pair<double, size_t> min_val = { DBL_MAX, SIZE * SIZE };  // initializing { max value, tile which doesnt exist }

        // recur for every leaf
        for (size_t i = 0; i < move_list.size(); i++) {

            size_t temp_tile = (tile == SIZE * SIZE) ? move_list[i].tile : tile;

            // change board to actual state
            std::string temp_board = board;
            flip(temp_board, move_list[i], opp);

            std::pair<double, size_t> evaluation = minmax(depth - 1, temp_board, temp_tile, true, alpha, beta, start);
            min_val = (evaluation.first < min_val.first) ? evaluation : min_val;

            // if not enough time, return min value
            if (!enough_time(start)) {
                return min_val;
            }

            // alpha beta pruning
            beta = std::min(beta, min_val.first);
            if (beta <= alpha) {
                break;
            }
        }
        return min_val;
    }
}


// helper function to answer with concrete position
void find_tile(size_t tile) {
    size_t row = tile / SIZE;
    size_t col_num = tile % SIZE;
    char col = '-';

    switch (col_num) {
    case 0:
        col = 'A';
        break;
    case 1:
        col = 'B';
        break;
    case 2:
        col = 'C';
        break;
    case 3:
        col = 'D';
        break;
    case 4:
        col = 'E';
        break;
    case 5:
        col = 'F';
        break;
    case 6:
        col = 'G';
        break;
    case 7:
        col = 'H';
        break;
    }

    std::cout << col << row + 1 << std::endl;
}


// GAME COMMANDS
void start_command(std::vector<std::string>& parameters, bool& assigned_start) {
    // validation
    check_length(parameters, 3);
    check_color(parameters[1]);
    check_number(parameters[2]);

    // assigning
    char color = parameters[1][0];   // string to char
    (color == 'W') ? (my_player.character = 'O') : (my_player.character = 'X');
    my_player.time = stoi(parameters[2]);
    assigned_start = true;
    std::cout << "1" << std::endl;
}


void stop_command(std::vector<std::string>& parameters) {
    // validation
    check_length(parameters, 1);
    exit(0);
}


void move_command(std::vector<std::string>& parameters, bool& assigned_start) {
    if (assigned_start) {

        auto start = std::chrono::high_resolution_clock::now();

        // validation
        check_length(parameters, 2);
        check_game(parameters[1]);
        std::string board = parameters[1];

        // minmax algorithm, SIZE^2 bcs it's out of board -> equal to MAX
        std::pair<double, size_t> return_val = minmax(MINMAX_DEPTH, board, SIZE * SIZE, true, -DBL_MAX, DBL_MAX, start);

        if (return_val.second != SIZE * SIZE) {
            // find tile and answer
            find_tile(return_val.second);
        }
        else {
            throw_error("No possible move.");
        }

    }
    else {
        throw_error("START parameters not assigned.");
    }
}


// MAIN PROGRAM
int main() {
    std::string command;
    bool assigned_start = false;

    while (std::getline(std::cin, command)) {
        std::vector<std::string> parameters;
        parse_command(command, parameters);

        if (parameters.size() > 0) {
            if (parameters[0] == "START") {
                start_command(parameters, assigned_start);
            }
            else if (parameters[0] == "STOP") {
                stop_command(parameters);
            }
            else if (parameters[0] == "MOVE") {
                move_command(parameters, assigned_start);
            }
            else {
                throw_error("Unsupported command.");
            }
        }
        else {
            throw_error("Unsupported command.");
        }
    }

    return 0;
}
