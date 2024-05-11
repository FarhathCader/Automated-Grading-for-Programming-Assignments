export const LANGUAGE_VERSIONS = {
    javascript: '18.15.0',
    python: '3.10.0',
    java: '15.0.2',
    cpp: '10.2.0',
    c: '10.2.0',
    csharp: '6.12.0'
}




export const CODE_SNIPPETS ={
    javascript: `function add(a,b){
        return a+b;
    }`,
    python: `def add(a,b):
        return a+b`,
    java: `public class Main {
        public static void main(String[] args) {
            System.out.println("Hello, World");
        }
    }`,
    cpp: `#include <iostream>
    using namespace std;
    int main() {
        cout << "Hello, World!";
        return 0;
    }`,
    c: `#include <stdio.h>
    int main() {
        printf("Hello, World!");
        return 0;
    }`,
    csharp: `using System;
    class Program
    {
        static void Main()
        {
            Console.WriteLine("Hello, World");
        }
    }`
}