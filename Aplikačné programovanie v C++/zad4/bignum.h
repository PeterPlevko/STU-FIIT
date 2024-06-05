// Lucia Ondovcikova

#pragma once

// here you can include whatever you want :)
#include <string>
#include <stdint.h>
#include <iostream>
#include <vector>

#define SUPPORT_DIVISION 0 // define as 1 when you have implemented the division
#define SUPPORT_IFSTREAM 0 // define as 1 when you have implemented the input >>

// if you do not plan to implement bonus, just delete those lines
class BigNum final
{
public:
    // constructors
    BigNum() {
        positive = true;
        number.push_back(0);
    }

    BigNum(int64_t n) : BigNum(std::to_string(n)) {}
    
    explicit BigNum(const std::string& str) {
        if (str.length() > 0) {
            if (str[0] == '+' || (str[0] >= '0' && str[0] <= '9')) {
                positive = true;
            }
            else if (str[0] == '-') {
                positive = false;
            }
            else {
                throw std::runtime_error("Not a number.");
            }
            for (uint64_t i = 0;i < str.length();i++) {
                if ((str[i] == '+' || str[i] == '-') && str.length() != 1) {
                    continue;
                }
                else if (str[i] >= '0' && str[i] <= '9') {
                    number.push_back(str[i] - '0');
                }
                else {
                    throw std::runtime_error("Not a number.");
                }
            }
            this->eraseZeros();
        }
        else {
            throw std::runtime_error("Empty string");
        }
    }

    // copy
    //BigNum(const BigNum& other);
    //BigNum& operator=(const BigNum& rhs);

    // unary operators
    const BigNum& operator+() const {
        return *this;
    }

    BigNum operator-() const {
        BigNum num = *this;
        if (!(this->number.size() == 1 && this->number[0] == 0)) {
            num.positive = !num.positive;
        }
        return num;
    }

    // binary arithmetics operators
    BigNum& operator+=(const BigNum& rhs) {
        BigNum num = rhs;
        if (this->positive && !num.positive) {        //skocim na operaciu -=
            num.positive = !num.positive;
            return *this -= num;
        }
        else if (!this->positive && num.positive) {  //najprv vymenim znamienka, skocim na operaciu -=, na konci revertnem znamienko
            this->positive = !this->positive;
            *this = -(*this -= num);
            return *this;
        }
        if (this->numIsZero()) {    //netreba scitavat
            *this = num;
            return *this;
        }
        if (num.numIsZero()) {      //netreba scitavat
            return *this;
        }
        int64_t len_diff = num.number.size() - this->number.size();    //doplnenie nul
        if (len_diff > 0) {
            this->number.insert(this->number.begin(), len_diff, 0);
        }
        else {
            len_diff = -(len_diff);
            num.number.insert(num.number.begin(), len_diff, 0);
        }
        int to_carry = 0;
        for (int64_t i = num.number.size() - 1;i >= 0;i--) {
            int act_val = this->number[i] + num.number[i] + to_carry;
            if (act_val > 9) {
                this->number[i] = act_val - 10;
                to_carry = 1;
            }
            else {
                this->number[i] = act_val;
                to_carry = 0;
            }
        }
        if (to_carry > 0) {
            this->number.insert(this->number.begin(), to_carry);
        }
        //na konci sa musim zbavit nul na zaciatku
        this->eraseZeros();
        return *this;        
    }

    BigNum& operator-=(const BigNum& rhs) {
        BigNum num = rhs;
        if (this->positive && !num.positive) {        //skocim na operaciu +=
            num.positive = !num.positive;
            return *this += num;
        }
        else if (!this->positive && num.positive) {  //najprv vymenim znamienka, skocim na operaciu +=, na konci revertnem znamienko
            this->positive = !this->positive;
            *this = -(*this += num);
            return *this;
        }
        if (this->numIsZero()) {    //netreba odcitavat
            *this = num;
            if (!num.numIsZero()) {
                this->positive = !this->positive;
            }
            return *this;
        }
        if (num.numIsZero()) {      //netreba odcitavat
            return *this;
        }
        BigNum bigger, smaller;
        int64_t len_diff = num.number.size() - this->number.size();
        if (len_diff > 0) {
            bigger = num;
            smaller = *this;
        }
        else if (len_diff < 0) {
            len_diff = -len_diff;
            bigger = *this;
            smaller = num;
        }
        else {
            if (num.number > this->number) {
                bigger = num;
                smaller = *this;
            }
            else {
                bigger = *this;
                smaller = num;
            }
        }
        
        smaller.number.insert(smaller.number.begin(), len_diff, 0);
        int to_carry = 0;
        for (int64_t i = smaller.number.size() - 1;i >= 0;i--) {
            int act_val = bigger.number[i] - smaller.number[i] - to_carry;
            if (act_val < 0) {
                bigger.number[i] = act_val + 10;
                to_carry = 1;
            }
            else {
                bigger.number[i] = act_val;
                to_carry = 0;
            }
        }
        if (to_carry > 0) {
            bigger.number.insert(bigger.number.begin(), to_carry);
        }

        bigger.positive = (num <= *this);
        *this = bigger;
        //na konci sa musim zbavit nul na zaciatku
        this->eraseZeros();
        return *this;
    }

    BigNum& operator*=(const BigNum& rhs) {
        BigNum num = rhs;
        if (this->numIsZero() || num.numIsZero()) {
            *this = BigNum();
            return *this;
        }
        if (this->numIsOne()) {    //netreba nasobit
            if (!this->positive) {
                num.positive = !num.positive;
            }
            *this = num;
            return *this;
        }
        if (num.numIsOne()) {      //netreba nasobit
            if (!num.positive) {
                this->positive = !this->positive;   //netreba nasobit
            }
            return *this;
        }
        BigNum bigger, smaller;
        int64_t len_diff = num.number.size() - this->number.size();
        if (len_diff > 0) {
            bigger = num;
            smaller = *this;
        }
        else {
            bigger = *this;
            smaller = num;
        }
        int num_of_zeros = 0, to_carry;
        std::vector<std::vector<int>> multiplication_lines;
        for (int64_t i = smaller.number.size() - 1;i >= 0;i--) {
            to_carry = 0;
            std::vector<int> line;
            for (int64_t j = bigger.number.size() - 1;j >= 0;j--) {
                int value = smaller.number[i] * bigger.number[j] + to_carry;
                line.insert(line.begin(), value % 10);
                to_carry = value / 10;
            }
            if (to_carry > 0) {
                line.insert(line.begin(), to_carry);
            }
            line.insert(line.end(), num_of_zeros, 0);
            num_of_zeros++;
            multiplication_lines.push_back(line);
        }
        //teraz uz len scitat lines
        BigNum result;
        result.number.erase(result.number.begin());
        to_carry = 0;
        uint64_t last_line_size = multiplication_lines[multiplication_lines.size() - 1].size();  //prvy cyklus musi prejst vsetkymi miestami v ramci riadku, takze beriem dlzku posledneho ten je najvacsi
        for (int64_t i = last_line_size-1;i >= 0;i--) {  
            int value = 0;
            for (uint64_t j = 0;j < multiplication_lines.size();j++) {  //druhy prechadza kazdou line
                if (multiplication_lines[j].size() < last_line_size) {      //aby sme vedela scitavat tak musim podoplnat riadky na rovnake dlzky, vpodstate to spravi v prvej iteracii prveho cyklu
                    multiplication_lines[j].insert(multiplication_lines[j].begin(), last_line_size - multiplication_lines[j].size(), 0);
                }
                value += multiplication_lines[j][i];
            }
            value += to_carry;
            result.number.insert(result.number.begin(), value % 10);
            to_carry = value / 10;
        }
        if (to_carry > 0) {
            result.number.insert(result.number.begin(), to_carry);
        }
        if (this->positive != num.positive) {
            result.positive = false;
        }
        *this = result;
        //na konci sa musim zbavit nul na zaciatku
        this->eraseZeros();
        return *this;
    }

#if SUPPORT_DIVISION == 1
    BigNum& operator/=(const BigNum& rhs); // bonus
    BigNum& operator%=(const BigNum& rhs); // bonus
#endif

private:
    // here you can add private data and members, but do not add stuff to 
    // public interface, also you can declare friends here if you wantz
    std::vector<int> number;
    bool positive = true;

    friend std::ostream& operator<<(std::ostream& lhs, const BigNum& rhs);
    friend bool operator==(const BigNum& lhs, const BigNum& rhs);
    friend bool operator!=(const BigNum& lhs, const BigNum& rhs);
    friend bool operator<(const BigNum& lhs, const BigNum& rhs);
    friend bool operator>(const BigNum& lhs, const BigNum& rhs);
    friend bool operator<=(const BigNum& lhs, const BigNum& rhs);
    friend bool operator>=(const BigNum& lhs, const BigNum& rhs);

    bool numIsZero(){
        return (this->number.size() == 1) && (this->number[0] == 0);
    }

    bool numIsOne() {
        return (this->number.size() == 1) && (this->number[0] == 1);
    }

    void eraseZeros() {
        if (this->number.size() > 0) {
            while (true) {
                if (this->number.size() == 0 || this->number[0] != 0) {
                    break;
                }
                this->number.erase(this->number.begin());
            }
            if (this->number.size() == 0) {
                this->number.push_back(0);
                this->positive = true;
            }
        }
    }
    
};

BigNum operator+(BigNum lhs, const BigNum& rhs) {
    return lhs += rhs;
}
BigNum operator-(BigNum lhs, const BigNum& rhs) {
    return lhs -= rhs;
}
BigNum operator*(BigNum lhs, const BigNum& rhs) {
    return lhs *= rhs;
}

#if SUPPORT_DIVISION == 1
BigNum operator/(BigNum lhs, const BigNum& rhs); // bonus
BigNum operator%(BigNum lhs, const BigNum& rhs); // bonus
#endif

// alternatively you can implement 
// std::strong_ordering operator<=>(const BigNum& lhs, const BigNum& rhs);
// idea is, that all comparison should work, it is not important how you do it
bool operator==(const BigNum& lhs, const BigNum& rhs) {
    return (lhs.positive == rhs.positive) && (lhs.number == rhs.number);
}

bool operator!=(const BigNum& lhs, const BigNum& rhs) {
    return !(lhs == rhs);
}

bool operator<(const BigNum& lhs, const BigNum& rhs) {
    if (lhs.positive != rhs.positive) { //opacne znamienko
        return !lhs.positive;
    }
    if (lhs.number.size() != rhs.number.size()) {   //rozna velkost
        if (lhs.positive) {                            //ak obidve pozitivne
            return (lhs.number.size() < rhs.number.size());
        }
        else {
            return !(lhs.number.size() < rhs.number.size());
        }
    }
    //tu su obidve rovnakej velkosti rovnakeho znamienka
    int sign;
    if (lhs.positive) {
        sign = 1;
    }
    else {
        sign = -1;
    }
    for (uint64_t i = 0; i < lhs.number.size();i++) {
        if (lhs.number[i] != rhs.number[i]) {
            return lhs.number[i] * sign < rhs.number[i] * sign;
        }
    }
    return false;
}

bool operator>(const BigNum& lhs, const BigNum& rhs) {
    return (lhs >= rhs) && !(lhs == rhs);
}

bool operator<=(const BigNum& lhs, const BigNum& rhs) {
    return (lhs < rhs) || (lhs == rhs);
}

bool operator>=(const BigNum& lhs, const BigNum& rhs) {
    return !(lhs < rhs);
}

std::ostream& operator<<(std::ostream& lhs, const BigNum& rhs) {
    if (!rhs.positive) {
        lhs << '-';
    }
    for (uint64_t i = 0;i < rhs.number.size();i++) {
        lhs << rhs.number[i];
    }
    return lhs;
}

#if SUPPORT_IFSTREAM == 1
std::istream& operator>>(std::istream& lhs, BigNum& rhs); // bonus
#endif

