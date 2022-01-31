// Lucia Ondovcikova

#include <fstream>
#include <sstream>
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>


bool is_in_list(std::string word) {
	std::vector<std::string> allowed_words = { "dec", "hex", "bin", "str", "vec" };
	return std::find(allowed_words.begin(), allowed_words.end(), word) != allowed_words.end();
}


// VALIDATION BIN
bool is_bin_notation(std::string const& str) {
	return str.find_first_not_of("01") == std::string::npos;
}


// CONVERT TO BIN
void check_bin_number(std::string number, uint32_t& num) {
	if (!is_bin_notation(number)) {
		exit(1);
	}
	num = std::stoul(number, nullptr, 2);
}


// VALIDATION HEX
bool is_hex_notation(std::string const& str) {
	return str.compare(0, 2, "0x") == 0
		&& str.size() > 2
		&& str.find_first_not_of("0123456789abcdefABCDEF", 2) == std::string::npos;
}


// CONVERT FROM HEX
void check_hex_number(std::string number, uint32_t& num) {
	if (!is_hex_notation(number)) {
		exit(1);
	}
	num = std::stoul(number, nullptr, 16);
}


// VALIDATION DEC
bool is_dec_notation(const std::string& str) {
	return str.find_first_not_of("+-0123456789") == std::string::npos;
}


// CONVERT FROM DEC
void check_int_number(std::string number, int32_t& num) {
	if (!is_dec_notation(number)) {
		exit(1);
	}
	num = stoi(number);
}


// VECTOR CHECK ALLOWED CHARS
bool vec_allowed_chars(std::string const& str) {
	return str.find_first_not_of("0123456789,+-") == std::string::npos;;
}


// SPLIT LINE
void split_line(std::string str, std::vector<int32_t>& vec) {
	if (!vec_allowed_chars(str)) {
		exit(1);
	}

	std::string delimiter = ",";
	size_t pos = 0;

	while ((pos = str.find(delimiter)) != std::string::npos) {
		std::string temp = str.substr(0, pos);
		int32_t num = stol(temp);
		vec.push_back(num);
		str.erase(0, pos + delimiter.length());
	}
	// if program found last delimiter, it has to push_back last number manually
	// else no delimiter (vector size of 1), push_back just one number
	if (pos == std::string::npos) {
		if (str != "") {
			vec.push_back(stol(str));
			return;
		}
	}
	else {
		vec.push_back(stol(str));
	}
}


void dec_type(std::ifstream& ifs, std::ofstream& ofs) {
	
	std::vector<std::pair<int32_t, std::string>> file;
	std::string line;

	// read file
	while (std::getline(ifs, line)) {
		int32_t num = 0;
		check_int_number(line, num);
		file.push_back(std::make_pair(num, line));
	}

	// sort
	std::sort(file.begin(), file.end());

	// write to file
	for (size_t i = 0; i < file.size();i++) {
		ofs << file[i].second << std::endl;
	}
}


void hex_type(std::ifstream& ifs, std::ofstream& ofs) {
	
	std::vector<std::pair<uint32_t, std::string>> file;
	std::string line;

	// read file
	while (std::getline(ifs, line)) {
		uint32_t num = 0;
		check_hex_number(line, num);
		file.push_back(std::make_pair(num, line));
	}

	// sort
	std::sort(file.begin(), file.end());

	// write to file
	for (size_t i = 0; i < file.size();i++) {
		ofs << file[i].second << std::endl;
	}
}


void bin_type(std::ifstream& ifs, std::ofstream& ofs) {
	
	std::vector<std::pair<uint32_t, std::string>> file;
	std::string line;

	// read file
	while (std::getline(ifs, line)) {
		uint32_t num = 0;
		check_bin_number(line, num);
		file.push_back(std::make_pair(num, line));
	}

	// sort
	std::sort(file.begin(), file.end());

	// write to file
	for (size_t i = 0; i < file.size();i++) {
		ofs << file[i].second << std::endl;
	}
}


void str_type(std::ifstream& ifs, std::ofstream& ofs) {
	
	std::vector<std::string> file;
	std::string line;

	// read file
	while (std::getline(ifs, line)) {
		file.push_back(line);
	}

	// sort
	std::sort(file.begin(), file.end());

	// write to file
	for (size_t i = 0; i < file.size();i++) {
		ofs << file[i] << std::endl;
	}
}


// HELPER FUNCTION to sort vector by size, then by numbers
bool vec_compare(const std::pair<std::vector<int32_t>, std::string>& a, const std::pair<std::vector<int32_t>, std::string>& b) {
	if (a.first.size() != b.first.size()) {
		return a.first.size() < b.first.size();
	}

	for (size_t i = 0;i < a.first.size();i++) {
		if (a.first[i] != b.first[i]) {
			return a.first[i] < b.first[i];
		}
	}

	return false;
}


void vec_type(std::ifstream& ifs, std::ofstream& ofs) {
	
	std::vector<std::pair<std::vector<int32_t>, std::string>> file;
	std::string line;

	// read file
	while (std::getline(ifs, line)) {
		std::vector<int32_t> vec;
		split_line(line, vec);
		std::sort(vec.begin(), vec.end());
		file.push_back(std::make_pair(vec, line));
	}

	// sort
	std::sort(file.begin(), file.end(), vec_compare);

	// write to file
	for (size_t i = 0; i < file.size();i++) {
		ofs << file[i].second << std::endl;
	}
}


int main(int argc, char* argv[]){

	if (argc != 4) {
		return 1;
	}

	std::ifstream ifs(argv[1]);
	if (!ifs.is_open()) {
		return 1;
	}
	std::ofstream ofs(argv[2]);
	if (!ofs.is_open()) {
		return 1;
	}
	if (!is_in_list(std::string(argv[3]))) {
		return 1;
	}
	std::string type = argv[3];
	

	if (type == "dec") {
		dec_type(ifs, ofs);
	}
	else if (type == "hex") {
		hex_type(ifs, ofs);
	}
	else if (type == "bin") {
		bin_type(ifs, ofs);
	}
	else if (type == "str") {
		str_type(ifs, ofs);
	}
	else if (type == "vec") {
		vec_type(ifs, ofs);
	}

	return 0;
}
