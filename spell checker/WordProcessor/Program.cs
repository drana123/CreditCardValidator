using System;
using SpellCheckerLib;
namespace WordProcessor
{
    class Program
    {
        static void Main(string[] args)
        {  
            SpellChecker obj = new SpellChecker();
            obj.GetSuggestions("hello");
            Console.WriteLine("Hello World!");
        }
    }
}

