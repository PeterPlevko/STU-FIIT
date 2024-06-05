// Lucia Ondovcikova

#include <fstream>
#include <sstream>
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>


// HELPER FUNCTION for number validation
bool is_digits(const std::string & str) {
	return std::all_of(str.begin(), str.end(), ::isdigit); 
}


// CONVERT NUMBER TO INT
size_t convert_to_int(std::string range, size_t start, size_t length) {
	std::string num_to_convert = range.substr(start, length);
	if (is_digits(num_to_convert)) {
		size_t number = stoi(num_to_convert);
		return number;
	}
	else {
		return SIZE_MAX;
	}
}


// PARSE RANGE FROM COMMAND
size_t parse_range(std::string range, size_t last_line, size_t& start, size_t& end, char comm){
	size_t delimiter = range.find(',', 0);
	
	// case: ,
	if (delimiter == 0 && range.size() == 1) {
		start = 0;
		end = last_line;
		return 0;
	}

	// case: 10
	else if (delimiter == std::string::npos) {
		end = convert_to_int(range, 0, range.size());
		// invalid range
		if ((end == SIZE_MAX && comm != 'c')) {
			return SIZE_MAX;
		}
		// if (cannot convert and change command) or end > last_line
		else if ((end == SIZE_MAX && comm == 'c') || (end > last_line && comm != 'c')) {
			return SIZE_MAX - 1;
		}
		else {
			start = end - 1;
			return 0;
		}
	}

	// case: ,10
	else if (delimiter == 0 && range.size() > 1) {
		end = convert_to_int(range, 1, range.size() - 1);
		// invalid range
		if (end == SIZE_MAX && comm != 'c') {
			return SIZE_MAX;
		}
		// if cannot convert and change command
		else if (end == SIZE_MAX && comm == 'c') {
			return SIZE_MAX - 1;
		}
		else if (end > last_line) {
			end = last_line;
			return 0;
		}
		else {
			start = 0;
			return 0;
		}
	}

	// case: 10,
	else if (delimiter == (range.size() - 1)) {
		start = convert_to_int(range, 0, delimiter) - 1;
		// invalid range
		if (start == SIZE_MAX && comm != 'c') {
			return SIZE_MAX;
		}
		// if (cannot convert and change command) or start > last_line
		else if ((start == SIZE_MAX && comm == 'c') || (start > last_line && comm != 'c')) {
			return SIZE_MAX - 1;
		}
		else {
			end = last_line;
			return 0;
		}
	}

	// case: 10,20
	else {
		start = convert_to_int(range, 0, delimiter) - 1;
		end = convert_to_int(range, delimiter + 1, range.size() - delimiter - 1);
		// invalid range
		if (start + 1 > end) {
			return SIZE_MAX;
		}
		// invalid range
		else if ((start == SIZE_MAX && comm != 'c') || (end == SIZE_MAX && comm != 'c')) {
			return SIZE_MAX;
		}
		// if (cannot convert start and change command) or (cannot convert end and change command) or start > last_line
		else if ((start == SIZE_MAX && comm == 'c') || (end == SIZE_MAX && comm == 'c') || (start > last_line && comm != 'c')) {
			return SIZE_MAX - 1;
		}
		else if (end > last_line) {
			end = last_line;
			return 0;
		}
		else {
			return 0;
		}
	}
}


// HELPER FUNCTION which merges line from command
void merge_line(std::vector<std::string>& parameters, std::vector<std::string>& file_lines, size_t line_num, size_t start) {
	std::string line_text = "";

	// merge line
	for (size_t i = start; i < parameters.size() - 1; i++) {
		line_text += (parameters[i] + " ");
	}

	// add
	line_text += parameters[parameters.size() - 1];
	file_lines.insert(file_lines.begin() + line_num, line_text + "\n");
}


// HELPER FUNCTION which adds '\n' if line doesnt contain it
void endline_check(std::vector<std::string>& file_lines) {
	if ((file_lines.size() > 0) && (file_lines[file_lines.size() - 1].back() != '\n')) {
		file_lines[file_lines.size() - 1] += '\n';
	}
}


void my_append(std::vector<std::string>& file_lines, std::vector<std::string>& parameters, bool& saved_file) {
	std::string line;
	size_t line_num = file_lines.size();

	// case: * a [line]
	if (parameters.size() > 1) {

		if (is_digits(parameters[1])) {
			line_num = stoi(parameters[1]);
			
			// add empty lines if necessary
			if (line_num >= file_lines.size()) {
				endline_check(file_lines);
				size_t end = line_num - file_lines.size();
				for (size_t i = 0; i < end; i++) {
					file_lines.push_back("\n");
				}
			}

			// oneliner with defined line
			if (parameters.size() > 2) {
				merge_line(parameters, file_lines, line_num, 2);
				saved_file = false;
				return;
			}
		}
		// oneliner with undefined line
		else {
			endline_check(file_lines);
			merge_line(parameters, file_lines, file_lines.size(), 1);
			saved_file = false;
			return;
		}
	}

	// case: * a
	else {
		endline_check(file_lines);
	}

	// read line from console and insert it
	while (std::getline(std::cin, line)) {

		// exit from append
		if (line[0] == '.' && line.size() == 1) {
			break;
		}
		// insert
		file_lines.insert(file_lines.begin() + line_num, line + "\n");
		line_num++;
	}
	saved_file = false;
}


void my_print(std::vector<std::string>& file_lines, std::vector<std::string>& parameters) {
	size_t line_num = file_lines.size();
	size_t start = 0, end = line_num;

	if (parameters.size() == 2) {
		line_num = parse_range(parameters[1], file_lines.size(), start, end, 'p');

		if (line_num == SIZE_MAX) {
			// invalid range
			std::cout << "Invalid range\n";
			return;
		}
		// if nothing to print, just return
		else if (line_num == SIZE_MAX - 1) {
			return;
		}
	}
	else if (parameters.size() > 2) {
		std::cout << "Unsupported command\n";
		return;
	}

	// print edited file
	for (size_t i = start; i < end; i++) {
		std::cout << file_lines[i];
	}
}


void my_write(std::vector<std::string>& file_lines, std::vector<std::string>& parameters, bool& saved_file, std::string output_filename) {
	if (parameters.size() > 1) {
		std::cout << "Unsupported command\n";
		return;
	}
	std::ofstream ofs(output_filename);
	std::ostream_iterator<std::string> ofs_iterator(ofs);
	std::copy(file_lines.begin(), file_lines.end(), ofs_iterator);
	saved_file = true;
}


void my_quit(std::vector<std::string>& parameters, bool& saved_file) {
	if (parameters.size() > 1) {
		std::cout << "Unsupported command\n";
		return;
	}
	if (!saved_file) {
		std::cout << "You have unsaved changes\n";
		return;
	}
	else {
		exit(0);
	}
}


void my_force_quit(std::vector<std::string>& parameters) {
	if (parameters.size() > 1) {
		std::cout << "Unsupported command\n";
		return;
	}
	exit(0);
}


void my_delete(std::vector<std::string>& file_lines, std::vector<std::string>& parameters, bool& saved_file) {
	size_t line_num = file_lines.size();
	size_t start = 0, end = line_num;

	if (parameters.size() == 2) {
		line_num = parse_range(parameters[1], file_lines.size(), start, end, 'd');

		// invalid range
		if (line_num == SIZE_MAX) {
			std::cout << "Invalid range\n";
			return;
		}
		// if nothing to delete
		else if (line_num == SIZE_MAX - 1) {
			return;
		}
	}
	else if (parameters.size() > 2) {
		std::cout << "Unsupported command\n";
		return;
	}

	// delete
	file_lines.erase(file_lines.begin() + start, file_lines.begin() + end);
	saved_file = false;
}


void my_change(std::vector<std::string>& file_lines, std::vector<std::string>& parameters, bool& saved_file) {
	size_t line_num = file_lines.size();
	size_t start = 0, end = line_num;

	// case: * c [range]
	if (parameters.size() > 1) {
		line_num = parse_range(parameters[1], file_lines.size(), start, end, 'c');

		// invalid range
		if (line_num == SIZE_MAX) {
			std::cout << "Invalid range\n";
			return;
		}
		// if cannot convert range but can write as string at the end of file (case: * c)
		else if (line_num == SIZE_MAX - 1) {
			file_lines.clear();
			merge_line(parameters, file_lines, file_lines.size(), 1);
			saved_file = false;
			return;
		}
	}

	// delete lines if necessary
	if (start <= file_lines.size()) {
		file_lines.erase(file_lines.begin() + start, file_lines.begin() + end);
	}

	// if start range > endline, add empty lines
	if (start > file_lines.size()) {
		for (size_t i = file_lines.size(); i < start; i++) {
			file_lines.push_back("\n");
		}
	}

	// case: * c line
	if (parameters.size() > 2) {
		merge_line(parameters, file_lines, start, 2);
		saved_file = false;
		return;
	}

	std::string line;

	// read line from console and insert it
	while (std::getline(std::cin, line)) {
		if (line[0] == '.' && line.size() == 1) {
			break;
		}
		file_lines.insert(file_lines.begin() + start, line + "\n");
		start++;
	}
	saved_file = false;
}


// HELPER FUNCTION for file reading
void read_file(std::ifstream& ifs, std::vector<std::string>& file_lines) {
	std::string line;

	while (std::getline(ifs, line)) {
		if (ifs.good()) {
			line += "\n";
		}
		file_lines.push_back(line);
	}
}


// HELPER FUNCTION for command parsing
void parse_command(std::string command, std::vector<std::string>& parameters) {
	std::istringstream iss(command);
	for (command; iss >> command; ) {
		parameters.push_back(command);
	}
}


int main(int argc, char* argv[]) {
	
	// right number of parameters
	if (argc != 2) {
		return 1;
	}
	std::ifstream ifs;
	ifs.open(argv[1], std::fstream::in);

	std::vector<std::string> file_lines;

	// read file
	read_file(ifs, file_lines);

	std::string input;
	std::vector<std::string> parameters;
	bool saved_file = true;

	while (true) {
		parameters.clear();
		std::cout << "* ";
		std::getline(std::cin, input);

		parse_command(input, parameters);

		// if no command (clicked Enter)
		if (parameters.size() == 0) {
			std::cout << "Unsupported command\n";
			continue;
		}

		if (parameters[0] == "a") {
			my_append(file_lines, parameters, saved_file);
		}
		else if (parameters[0] == "p") {
			my_print(file_lines, parameters);
		}
		else if (parameters[0] == "w") {
			my_write(file_lines, parameters, saved_file, std::string(argv[1]));
		}
		else if (parameters[0] == "q") {
			my_quit(parameters, saved_file);
		}
		else if (parameters[0] == "q!") {
			my_force_quit(parameters);
		}
		else if (parameters[0] == "d") {
			my_delete(file_lines, parameters, saved_file);
		}
		else if (parameters[0] == "c") {
			my_change(file_lines, parameters, saved_file);
		}
		else {
			std::cout << "Unsupported command\n";
			continue;
		}
	}

	return 0;
}
