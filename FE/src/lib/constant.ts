const Java = `class Solution {
    public static void main(String[] args) {
        System.out.println("HelloWorld by Java");
    }
}`

const C = `#include <stdio.h>

int main() {
    // Write C code here
    printf("HelloWorld by C");

    return 0;
}`

const CPlus = `#include <iostream>

int main() {
    // Write C++ code here
    std::cout << "HelloWorld by C++";

    return 0;
}`

export {Java, C, CPlus} 