import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Code, FileText, Github, ExternalLink } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('gallery');
  const [selectedProblem, setSelectedProblem] = useState(null);
  
  // Manually organizing the problems with 352 first
  const problems = [
    {
      id: 4,
      number: "352",
      title: "Data Stream as Disjoint Intervals",
      code: `class SummaryRanges {
public:

    unordered_map<int, int> intervalMap;
    vector<int> values;

    SummaryRanges() {
        
    }
    
    void addNum(int value) {

        value++;

        if (!intervalMap[value]) {

        values.push_back(value);

        if (intervalMap[value - 1] && intervalMap[value + 1]) {
            intervalMap[value - 1] = intervalMap[value + 1];
        } else if (intervalMap[value + 1]) {
            intervalMap[value] = intervalMap[value + 1];
        } else if (intervalMap[value - 1]) {
            intervalMap[value] = value;
            intervalMap[value - 1] = intervalMap[value];
        } else {
            intervalMap[value] = value;
        }

        }
        
    }
    
    vector<vector<int>> getIntervals() {

        sort(values.begin(), values.end());
        vector<vector<int>> intervals;

        unordered_map<int, int> endpoints;

        for (int i = 0; i < values.size(); i++) {

            int endpoint = values[i];
            while (intervalMap[endpoint] != endpoint) {
                endpoint = intervalMap[endpoint];
            }

            if (!endpoints[endpoint] && intervalMap[values[i]]) {
                vector<int> interval;
                interval.push_back(values[i] - 1);
                interval.push_back(endpoint - 1);
                intervals.push_back(interval);
            }

            endpoints[endpoint]++;

        }

        return intervals;
        
    }
};

/**
 * Your SummaryRanges object will be instantiated and called as such:
 * SummaryRanges* obj = new SummaryRanges();
 * obj->addNum(value);
 * vector<vector<int>> param_2 = obj->getIntervals();
 */`,
      blog: "This solution uses a disjoint-set (union-find) approach to efficiently track intervals as they form. Each value maps to its interval endpoint, allowing constant-time merging of adjacent intervals. The time complexity is dominated by the sorting operation in getIntervals(), making it O(n log n) where n is the number of unique values added."
    },
    {
      id: 1,
      number: "68",
      title: "Text Justification",
      code: `class Solution {
public:
    vector<string> fullJustify(vector<string>& words, int maxWidth) {

        vector<string> solution;

        int wordIndex = 0;
        while (wordIndex < words.size()) {

            string tempLine = "";
            int lineSize = 0;
            int charCount = 0;
            int wordCount = 0;

            while ((wordIndex < words.size()) &&
                   (lineSize + words[wordIndex].size() <= maxWidth)) {
                charCount += words[wordIndex].size();
                lineSize += words[wordIndex].size() + 1;
                wordIndex++;
                wordCount++;
            }

            int spaceCount = maxWidth - charCount;

            int spaceAvg = spaceCount;
            int spaceRem = 0;

            if (wordCount > 1) {
                spaceAvg = spaceCount / (wordCount - 1);
                spaceRem = spaceCount % (wordCount - 1);
            }

            if (wordIndex == words.size()) {

                for (int i = wordIndex - wordCount; i < wordIndex; i++) {
                    tempLine += words[i];
                    if (spaceCount > 0) {
                        spaceCount--;
                        tempLine += " ";
                    }
                }
                for (int i = 0; i < spaceCount; i++) {
                    tempLine += " ";
                }

            } else if (wordCount == 1) {

                tempLine += words[wordIndex - 1];
                for (int i = 0; i < spaceCount; i++) {
                    tempLine += " ";
                }

            } else {

                for (int i = wordIndex - wordCount; i < wordIndex; i++) {

                    if (i < wordIndex - 1) {
                        tempLine += words[i];
                        for (int n = 0; n < spaceAvg; n++) {
                            tempLine += " ";
                        }
                        if (spaceRem > 0) {
                            tempLine += " ";
                            spaceRem--;
                        }
                    } else {
                        tempLine += words[i];
                    }
                }
            }

            solution.push_back(tempLine);
        }

        return solution;
        
    }
};`,
      blog: "Text justification requires careful management of spaces between words. The approach involves greedy line filling, calculating even distribution of spaces, with special handling for the last line (left-justified) and lines with a single word. The algorithm has O(n) time complexity where n is the total number of characters across all words."
    },
    {
      id: 2,
      number: "135",
      title: "Candy",
      code: `class Solution {
public:

    int candy(vector<int>& ratings) {

        unordered_map<int, int> indexValues;
        vector<int> greedyVector;

        int height = 1;
        indexValues[0] = 1;
        for (int i = 1; i < ratings.size(); i++) { 

            if (ratings[i] > ratings[i - 1]) {
                height++;
            } else {
                height = 1;
            }

            indexValues[i] = height;

        }

        height = 1;
        int totalCandies = indexValues[ratings.size() - 1];

        for (int i = ratings.size() - 2; i >= 0; i--) { 

            if (ratings[i] > ratings[i + 1]) {
                height++;
            } else {
                height = 1;
            }

            totalCandies += max(indexValues[i], height);

        }

        return totalCandies;

    }

};`,
      blog: "This solution uses a two-pass approach to ensure that each child with a higher rating gets more candies than their neighbors. The first pass assigns candies based on left-to-right comparisons, and the second pass adjusts for right-to-left comparisons, taking the maximum value needed to satisfy both constraints. The algorithm achieves an optimal O(n) time complexity."
    },
    {
      id: 3,
      number: "149",
      title: "Max Points on a Line",
      code: `class Solution {
public:
    int maxPoints(vector<vector<int>>& points) {

        if (points.size() == 1) return 1;

        int maxPoints = 0;
        unordered_map<int, int> vert;
        for (int i = 0; i < points.size(); i++) {
            vert[points[i][0]]++;
            numMax = max(numMax, vert[points[i][0]]);
        }

        for (int i = 0; i < points.size() - 1; i++) {

            unordered_map<double, int> seen;

            int y1 = points[i][1];
            int x1 = points[i][0];
            for (int n = i + 1; n < points.size(); n++) {

                int y2 = points[n][1];
                int x2 = points[n][0];
                int dy = (y2 - y1);
                int dx = (x2 - x1);

                if (dx != 0) {
                    double slope = (dy + 0.0) / (dx + 0.0);
                    seen[slope]++;
                    numMax = max(numMax, (seen[slope] + 1));
                } 
                
            }

        }

        return maxPoints;

    }
};`,
      blog: "Finding the maximum number of points on a line requires checking all possible lines. This solution first handles vertical lines separately, then computes slopes between each pair of points to count collinear points. By storing slope frequencies in a hash map, we achieve O(n²) time complexity, which is optimal for this problem as we must check all pairs of points."
    },
    {
      id: 5,
      number: "1028",
      title: "Recover a Tree From Preorder Traversal",
      code: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:

    TreeNode* recoverFromPreorder(string traversal) {
        
        traversal += '-';
        unordered_map<int, TreeNode*> depthLastNode;

        string stringVal = "";
        int index = 0;
        while (traversal[index] != '-') {
            stringVal += traversal[index];
            index++;
        }

        int startVal = stoi(stringVal);

        TreeNode* root = new TreeNode(startVal);
        depthLastNode[0] = root;

        int depth = 0;
        for (int i = index; i < traversal.size(); i++) {

            if (traversal[i] == '-') {
                depth++;
            } else {

                stringVal = "";
                while (traversal[i] != '-') {
                    stringVal += traversal[i];
                    i++;
                }

                i--;

                int currVal = stoi(stringVal);
                TreeNode* currNode = new TreeNode(currVal);
                depthLastNode[depth] = currNode;
                
                TreeNode* parent = depthLastNode[depth - 1];
                if (!parent->left) {
                    parent->left = currNode;
                } else {
                    parent->right = currNode;
                }

                depth = 0;

            }

        }

        return root;

    }

};`,
      blog: "This problem requires parsing a string representation of a binary tree's preorder traversal with depth information. The key insight is using a map to track the last node seen at each depth level, which serves as the parent for the next node at a deeper level. This single-pass approach achieves O(n) time complexity, where n is the length of the input string."
    }
  ];

  const handleProblemClick = (problem) => {
    setSelectedProblem(problem);
    setActiveTab('detail');
  };

  const handleBackToGallery = () => {
    setActiveTab('gallery');
    setSelectedProblem(null);
  };

  // Style classes for code syntax highlighting
  const CodeBlock = ({ code, maxLines }) => {
    // CSS classes for syntax highlighting - more blues and purples, less yellow/orange
    const codeClasses = {
      container: "font-mono text-gray-300 overflow-auto",
      keyword: "text-indigo-300", // class, public, if, else, etc.
      type: "text-blue-200", // int, string, vector, etc.
      function: "text-blue-400", // function names
      number: "text-purple-300", // numeric literals
      string: "text-teal-300", // string literals
      comment: "text-gray-500", // comments
      operator: "text-blue-300", // +, -, *, /, etc.
      variable: "text-gray-300", // variable names
      punctuation: "text-gray-400", // { } ( ) ; ,
    };

    // Split the code into lines
    const lines = code.split('\n');
    const displayLines = maxLines ? lines.slice(0, maxLines) : lines;
    
    // Process each line for syntax highlighting
    const processedLines = displayLines.map((line, lineIndex) => {
      // Helper function to add span with class
      const span = (content, className) => <span key={`${lineIndex}-${content}-${Math.random()}`} className={className}>{content}</span>;
      
      // This is a simplified syntax highlighter for C++
      // Replace with more robust rules as needed
      
      // Process the line token by token
      const processedTokens = [];
      let currentToken = '';
      let inString = false;
      let inComment = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (inComment) {
          currentToken += char;
          continue;
        }
        
        if (inString) {
          currentToken += char;
          if (char === '"' && line[i-1] !== '\\') {
            processedTokens.push(span(currentToken, codeClasses.string));
            inString = false;
            currentToken = '';
          }
          continue;
        }
        
        // Check for start of comment
        if (char === '/' && i+1 < line.length && line[i+1] === '/') {
          if (currentToken) {
            processedTokens.push(span(currentToken, codeClasses.variable));
            currentToken = '';
          }
          inComment = true;
          currentToken = char;
          continue;
        }
        
        // Check for start of string
        if (char === '"') {
          if (currentToken) {
            processedTokens.push(span(currentToken, codeClasses.variable));
            currentToken = '';
          }
          inString = true;
          currentToken = char;
          continue;
        }
        
        // Check for operators
        if ('+-*/=!<>&|^%'.includes(char)) {
          if (currentToken) {
            // Check if current token is a keyword
            if (['class', 'public', 'private', 'protected', 'void', 'int', 'double', 'float', 'char', 'bool', 'string', 'vector', 'map', 'unordered_map', 'set', 'unordered_set', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'return', 'true', 'false', 'nullptr', 'const', 'static', 'auto', 'new', 'delete', 'try', 'catch', 'throw'].includes(currentToken)) {
              processedTokens.push(span(currentToken, codeClasses.keyword));
            } 
            // Check if current token is a type
            else if (['TreeNode', 'Solution', 'SummaryRanges'].includes(currentToken)) {
              processedTokens.push(span(currentToken, codeClasses.type));
            }
            // Check if current token is a number
            else if (/^\d+$/.test(currentToken)) {
              processedTokens.push(span(currentToken, codeClasses.number));
            } 
            // Otherwise it's a variable or function name
            else {
              // Check if it looks like a function (followed by open paren)
              if (i+1 < line.length && line[i+1] === '(') {
                processedTokens.push(span(currentToken, codeClasses.function));
              } else {
                processedTokens.push(span(currentToken, codeClasses.variable));
              }
            }
            currentToken = '';
          }
          processedTokens.push(span(char, codeClasses.operator));
          continue;
        }
        
        // Check for punctuation
        if ('{}()[],;:.'.includes(char)) {
          if (currentToken) {
            // Check if current token is a keyword
            if (['class', 'public', 'private', 'protected', 'void', 'int', 'double', 'float', 'char', 'bool', 'string', 'vector', 'map', 'unordered_map', 'set', 'unordered_set', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'return', 'true', 'false', 'nullptr', 'const', 'static', 'auto', 'new', 'delete', 'try', 'catch', 'throw'].includes(currentToken)) {
              processedTokens.push(span(currentToken, codeClasses.keyword));
            } 
            // Check if current token is a type
            else if (['TreeNode', 'Solution', 'SummaryRanges'].includes(currentToken)) {
              processedTokens.push(span(currentToken, codeClasses.type));
            }
            // Check if current token is a number
            else if (/^\d+$/.test(currentToken)) {
              processedTokens.push(span(currentToken, codeClasses.number));
            } 
            // Otherwise it's a variable or function name
            else {
              // Check if it looks like a function (followed by open paren)
              if (char === '(') {
                processedTokens.push(span(currentToken, codeClasses.function));
              } else {
                processedTokens.push(span(currentToken, codeClasses.variable));
              }
            }
            currentToken = '';
          }
          processedTokens.push(span(char, codeClasses.punctuation));
          continue;
        }
        
        // Check for whitespace
        if (char === ' ' || char === '\t') {
          if (currentToken) {
            // Check if current token is a keyword
            if (['class', 'public', 'private', 'protected', 'void', 'int', 'double', 'float', 'char', 'bool', 'string', 'vector', 'map', 'unordered_map', 'set', 'unordered_set', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'return', 'true', 'false', 'nullptr', 'const', 'static', 'auto', 'new', 'delete', 'try', 'catch', 'throw'].includes(currentToken)) {
              processedTokens.push(span(currentToken, codeClasses.keyword));
            } 
            // Check if current token is a type
            else if (['TreeNode', 'Solution', 'SummaryRanges'].includes(currentToken)) {
              processedTokens.push(span(currentToken, codeClasses.type));
            }
            // Check if current token is a number
            else if (/^\d+$/.test(currentToken)) {
              processedTokens.push(span(currentToken, codeClasses.number));
            } 
            // Otherwise it's a variable
            else {
              processedTokens.push(span(currentToken, codeClasses.variable));
            }
            currentToken = '';
          }
          processedTokens.push(char);
          continue;
        }
        
        // Add to current token
        currentToken += char;
      }
      
      // Handle any remaining token
      if (currentToken) {
        if (inComment) {
          processedTokens.push(span(currentToken, codeClasses.comment));
        } else if (inString) {
          processedTokens.push(span(currentToken, codeClasses.string));
        } else {
          // Check if current token is a keyword
          if (['class', 'public', 'private', 'protected', 'void', 'int', 'double', 'float', 'char', 'bool', 'string', 'vector', 'map', 'unordered_map', 'set', 'unordered_set', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'return', 'true', 'false', 'nullptr', 'const', 'static', 'auto', 'new', 'delete', 'try', 'catch', 'throw'].includes(currentToken)) {
            processedTokens.push(span(currentToken, codeClasses.keyword));
          } 
          // Check if current token is a type
          else if (['TreeNode', 'Solution', 'SummaryRanges'].includes(currentToken)) {
            processedTokens.push(span(currentToken, codeClasses.type));
          }
          // Check if current token is a number
          else if (/^\d+$/.test(currentToken)) {
            processedTokens.push(span(currentToken, codeClasses.number));
          } 
          // Otherwise it's a variable
          else {
            processedTokens.push(span(currentToken, codeClasses.variable));
          }
        }
      }
      
      return (
        <div key={lineIndex} className="whitespace-pre">
          {processedTokens}
        </div>
      );
    });
    
    return (
      <div className={codeClasses.container}>
        {processedLines}
      </div>
    );
  };

  const GalleryView = () => (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {problems.map(problem => (
          <div 
            key={problem.id}
            onClick={() => handleProblemClick(problem)}
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-105 cursor-pointer border border-gray-700"
          >
            <div className="p-4 border-b border-gray-700 bg-gray-900 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-200">
                {problem.number}. {problem.title}
              </h3>
              <span className="bg-gray-800 text-red-400 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full border border-gray-700">
                Hard
              </span>
            </div>
            <div className="p-4">
              <div className="bg-gray-900 p-3 rounded overflow-hidden h-64">
                <pre className="text-xs text-gray-300 overflow-auto h-full whitespace-pre">
                  <CodeBlock code={problem.code} maxLines={18} />
                </pre>
              </div>
              <p className="mt-4 text-sm text-gray-400">
                {problem.blog.substring(0, 150)}...
              </p>
            </div>
            <div className="p-4 bg-gray-900 flex justify-end">
              <button className="text-blue-400 flex items-center text-sm font-medium">
                View solution <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const DetailView = () => {
    if (!selectedProblem) return null;
    
    return (
      <div className="container mx-auto p-6">
        <button 
          onClick={handleBackToGallery}
          className="mb-6 flex items-center text-blue-400 hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to gallery
        </button>
        
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
          <div className="p-6 border-b border-gray-700 bg-gray-900">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-200">
                {selectedProblem.number}. {selectedProblem.title}
              </h2>
              <div className="flex items-center space-x-3">
                <span className="bg-gray-800 text-red-400 text-sm font-medium px-2.5 py-0.5 rounded-full border border-gray-700">
                  Hard
                </span>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <ExternalLink className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/3 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-200">
                <Code className="mr-2 h-5 w-5" /> Solution
              </h3>
              <div className="bg-gray-900 rounded-lg p-4 overflow-auto max-h-96">
                <pre className="text-sm text-gray-300 font-mono whitespace-pre">
                  <CodeBlock code={selectedProblem.code} />
                </pre>
              </div>
            </div>
            
            <div className="lg:w-1/3 p-6 border-t lg:border-t-0 lg:border-l border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-200">
                <FileText className="mr-2 h-5 w-5" /> Approach
              </h3>
              <div className="prose prose-dark">
                <p className="text-gray-400">
                  {selectedProblem.blog}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Code className="h-6 w-6 text-blue-400 mr-2" />
            <h1 className="text-xl font-bold text-gray-200 flex items-center">
              My LeetCode 
              <span className="ml-2 bg-gray-800 text-red-400 text-sm font-medium px-2.5 py-0.5 rounded-full border border-gray-700">
                Hards
              </span>
            </h1>
          </div>
          <nav className="flex items-center space-x-4">
            <button className="text-sm font-medium text-gray-400 hover:text-blue-400">About</button>
            <button className="text-sm font-medium text-gray-400 hover:text-blue-400">Contact</button>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200"
            >
              <Github className="h-5 w-5" />
            </a>
          </nav>
        </div>
      </header>
      
      <main className="py-8">
        {activeTab === 'gallery' && <GalleryView />}
        {activeTab === 'detail' && <DetailView />}
      </main>
      
      <footer className="bg-gray-800 border-t border-gray-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} My LeetCode Hards. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;