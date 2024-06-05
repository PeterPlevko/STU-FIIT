
#include <iostream>
#include <fstream>
#include <vector>
#include <tuple>

const size_t NEWL_SIZE = 1;

void print_matches(std::vector<std::tuple<size_t, size_t>> found_matches) {
	if (!found_matches.empty()) {
		std::cout << std::get<0>(found_matches[0]) << " " << std::get<1>(found_matches[0]) << std::endl;
		for (size_t i = 1; i < found_matches.size(); i++) {
			if (found_matches[i] != found_matches[i - 1]) {
				std::cout << std::get<0>(found_matches[i]) << " " << std::get<1>(found_matches[i]) << std::endl;
			}
		}
	}
}

void find_str(std::ifstream& input, uint32_t surround, std::string str) {
	size_t file_pos = 0;
	//file_pos - pos_offset = position in line
	size_t pos_offset = 0;

	int line = 0;

	std::string buffer;
	buffer.resize(str.size());

	std::string surrounding;
	surrounding.resize(str.size());

	std::vector<std::tuple<size_t, size_t>> found_matches;

	while (input.read(buffer.data(), str.size())) {
		if (input.eof()) { break; }

		if (buffer == str) {
	
			std::tuple<size_t, size_t> match = { line, file_pos - pos_offset };		

			if (buffer[0] == '\n') {
				line++;
				pos_offset = file_pos + NEWL_SIZE;
			}
			
			input.clear();
			input.seekg(++file_pos);

			for (size_t i = 0; i < surround; i++) {
				
				input.read(surrounding.data(), str.size());

				if (input.eof()) {
					break;
				}

				if (surrounding == str) {
					found_matches.push_back(match);
					found_matches.push_back({ line, file_pos - pos_offset });
					break;
				}
				
				else if (surrounding[0] == '\n') {
					line++;
					pos_offset = file_pos + NEWL_SIZE;
				}

				input.clear();
				input.seekg(++file_pos);

			}
		}
		else {
			if (buffer[0] == '\n') {
				line++;
				pos_offset = file_pos + NEWL_SIZE;
			}
			file_pos++;
		}


		input.clear();
		input.seekg(file_pos);


	}
	print_matches(found_matches);
}

int main(int argc, char* argv[])
{
	if (argc == 4) {
		std::ifstream input(argv[1]);
		if (!input.is_open()) {
			std::cerr << "wrong parameters" << std::endl;
			return 1;
		}
		auto temp = strtol(argv[3], NULL, 0);
		if (temp == 0 || temp < 0) {
			return 1;
		}
		auto surround = static_cast<uint32_t> (temp);
		find_str(input, surround, argv[2]);
	}
	else {
		std::cerr << "wrong parameters" << std::endl;
		return 1;
	}
	return 0;
}