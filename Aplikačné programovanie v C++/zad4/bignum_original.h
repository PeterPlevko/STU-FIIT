#pragma once

// here you can include whatever you want :)
#include <string>
#include <stdint.h>

#define SUPPORT_DIVISION 0 // define as 1 when you have implemented the division
#define SUPPORT_IFSTREAM 0 // define as 1 when you have implemented the input >>

// if you do not plan to implement bonus, just delete those lines
class BigNum final
{
public:
    // constructors
    BigNum();
    BigNum(int64_t n);
    explicit BigNum(const std::string& str);

    // copy
    BigNum(const BigNum& other);
    BigNum& operator=(const BigNum& rhs);

    // unary operators
    const BigNum& operator+() const;
    BigNum operator-() const;

    // binary arithmetics operators
    BigNum& operator+=(const BigNum& rhs);
    BigNum& operator-=(const BigNum& rhs);
    BigNum& operator*=(const BigNum& rhs);

#if SUPPORT_DIVISION == 1
    BigNum& operator/=(const BigNum& rhs); // bonus
    BigNum& operator%=(const BigNum& rhs); // bonus
#endif

private:
    // here you can add private data and members, but do not add stuff to 
    // public interface, also you can declare friends here if you want
};

BigNum operator+(BigNum lhs, const BigNum& rhs);
BigNum operator-(BigNum lhs, const BigNum& rhs);
BigNum operator*(BigNum lhs, const BigNum& rhs);

#if SUPPORT_DIVISION == 1
BigNum operator/(BigNum lhs, const BigNum& rhs); // bonus
BigNum operator%(BigNum lhs, const BigNum& rhs); // bonus
#endif

// alternatively you can implement 
// std::strong_ordering operator<=>(const BigNum& lhs, const BigNum& rhs);
// idea is, that all comparison should work, it is not important how you do it
bool operator==(const BigNum& lhs, const BigNum& rhs);
bool operator!=(const BigNum& lhs, const BigNum& rhs);
bool operator<(const BigNum& lhs, const BigNum& rhs);
bool operator>(const BigNum& lhs, const BigNum& rhs);
bool operator<=(const BigNum& lhs, const BigNum& rhs);
bool operator>=(const BigNum& lhs, const BigNum& rhs);


std::ostream& operator<<(std::ostream& lhs, const BigNum& rhs);

#if SUPPORT_IFSTREAM == 1
std::istream& operator>>(std::istream& lhs, BigNum& rhs); // bonus
#endif
