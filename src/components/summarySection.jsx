import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const SummarySection = ({ messages }) => {
  const [summary, setSummary] = useState('');

  const generateSummary = async () => {
    const allMessages = messages.map(message => `${message.username}: "${message.message}"`).join('\n');
    const prompt = `Here is the list of messages in format Name: "message". Summarize this chat between these two and return a summary. Don't reply anything else, just give me the summary with no additional dialogues.:\n${allMessages}`;
    const genAI = new GoogleGenerativeAI("AIzaSyC_ZVQqDffuMFU3xJtBhB3k0ZrMCyoYwAA"); // Replace with your actual API key
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    try {
      const result = await model.generateContentStream(prompt);
      let summaryText = '';

      for await (const chunk of result.stream) {
        summaryText += chunk.text();
      }

      setSummary(summaryText);
    } catch (error) {
      console.error('Error generating summary:', error);
      setSummary('Error generating summary. Please try again later.');
    }
  };

  return (
    <div className="summary space-y-2">
      {summary && <div className='bg-neutral-800 border p-2 border-neutral-700 max-w-xl text-white rounded-md'>{summary}</div>}
      <div>
        <button id="summaryButton" onClick={generateSummary} className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            Generate Summary
          </button>
      </div>
    </div>
  );
};

export default SummarySection;
