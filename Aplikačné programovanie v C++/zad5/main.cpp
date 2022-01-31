//Lucia Ondovcikova

#include <fstream>
#include <iostream>
#include <string>
#include <vector>


void allowed_chars(char letter, size_t line) {
	if (!((letter >= 'a' && letter <= 'z') || (letter >= 'A' && letter <= 'Z') || (letter == '\n'))) {
		std::cout << "Error on line " << line + 1;
		exit(1);
	}
}


void empty_num_check(std::string num, size_t line) {
	if (num == "") {
		std::cout << "Error on line " << line + 1;
		exit(1);
	}
}


void compress(std::vector<std::string>& vec, std::ofstream& ofs) {
	for (size_t i = 0; i < vec.size(); i++) {
		std::string line = "";
		size_t counter = 1;
		for (size_t j = 0; j < vec[i].size(); j++) {
			allowed_chars(vec[i][j], i);
			if (vec[i][j] == '\n') {
				ofs << '\n';
				continue;
			}
			if (vec[i][j] == vec[i][j + 1]) {
				counter++;
			}
			else {
				line += (vec[i][j] + std::to_string(counter));
				counter = 1;
			}
		}
		ofs << line << '\n';
	}
}


void decompress(std::vector<std::string>& vec, std::ofstream& ofs) {
	for (size_t i = 0; i < vec.size(); i++) {
		std::string line = "";
		for (size_t j = 0; j < vec[i].size(); j++) {
			allowed_chars(vec[i][j], i);
			char temp_char = vec[i][j];
			if (vec[i][j] == '\n') {
				ofs << '\n';
				continue;
			}
			std::string num = "";
			// process of decompressing - find number, create string of given length
			while (j + 1 < vec[i].size() && (vec[i][j + 1] >= '0' && vec[i][j + 1] <= '9')) {
				num += vec[i][j + 1];
				j++;
			}
			empty_num_check(num, i);
			line += std::string(stol(num), temp_char);
		}
		ofs << line << '\n';
	}
}


int main(int argc, char* argv[]){
	if (argc != 4) {									// right number of characters
		return 1;
	}
	std::string type = (argv[1]);
	if (!(type == "compress" || type == "decompress")) {
		//std::cerr << "Bad input compression argument.";
		return 1;
	}
	std::ifstream ifs(argv[2]);
	if (!ifs.is_open()) {								// check file
		//std::cerr << "Cannot open ifs file.";
		return 1;
	}
	std::ofstream ofs(argv[3]);
	if (!ofs.is_open()) {								// check file
		//std::cerr << "Cannot open ofs file.";
		return 1;
	}

	// read file
	std::string line;
	std::vector<std::string> vec;
	while (std::getline(ifs, line)) {
		vec.push_back(line);
	}

	if (type == "compress") {
		compress(vec, ofs);
	}
	else {
		decompress(vec, ofs);
	}

	return 0;
}
