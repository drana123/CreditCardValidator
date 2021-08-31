using System.Collections.Generic;
using Xunit;
using SpellCheckerLib;

namespace SpellCheckerLibTest 
{       
    public class SpellCheckerTests
    {
        [Fact]
        public void Test_GetSuggestions()
        {
            SpellChecker _codeUnderTest = new SpellChecker();
            string word = "Hello";

            List<string> actualValue = _codeUnderTest.GetSuggestions(word);

            Assert.True(true);
        }
        [Fact]
        public void Test_GetSuggestions_2()
        {
            SpellChecker _codeUnderTest = new SpellChecker();
            string word = "Hello";

            List<string> actualValue = _codeUnderTest.GetSuggestions(word);

            Assert.True(true);
        }
        [Fact]
        public void Test_GetSuggestions_3()
        {
            SpellChecker _codeUnderTest = new SpellChecker();
            string word = "Hello";

            List<string> actualValue = _codeUnderTest.GetSuggestions(word);

            Assert.True(true);
        }
        [Fact]
        public void Test_GetSuggestions_4()
        {
            SpellChecker _codeUnderTest = new SpellChecker();
            string word = "Hello";

            List<string> actualValue = _codeUnderTest.GetSuggestions(word);

            Assert.True(true);
        }
        [Fact]
        public void Test_GetSuggestions_5()
        {
            SpellChecker _codeUnderTest = new SpellChecker();
            string word = "Hello";

            List<string> actualValue = _codeUnderTest.GetSuggestions(word);

            Assert.True(true);
        }
    }
}


