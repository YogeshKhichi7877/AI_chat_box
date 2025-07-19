// import express from 'express';
// const app = express();
// import cors from 'cors';
// app.use(cors());

// import dotenv from 'dotenv';
// dotenv.config();
// import multer from 'multer';
// import { GoogleGenAI } from "@google/genai";


// import * as fs from 'fs';


// // import db from './db.js';
// // import Content from './models/content.js';
// import bodyParser from 'body-parser';

// // Fix for __dirname in ES modules:
// import path from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// app.use(bodyParser.json());
// app.use(express.static(__dirname)); // Now this works!



// app.post('/text', async (req, res) => {
//   try {
//     const { text } = req.body;
//     console.log("User question:", text);

//     const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
//     console.log("Model :");
     

//     const response = await ai.models.generateContent({
//       model: 'gemini-2.0-flash',
//       contents: text,
//     });
//     console.log(response);

//     // Optionally save question to DB
//     // await Content.create({ text });
//     // Assuming response.text contains the AI's answer
//     res.json({ answer: response.text });

//     console.log("Gemini answer:", response.text);
//     // res.send(response.text);
    
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send({error : error.message });
//   }
//   // const answer1  = response.text ;
//   // module.exports = response.text ; 
// });



// app.post('/code' , async (req , res)=>{
//     try{
//          const { text } = req.body;
//          console.log("User question:", text);
        
//   const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

//   let response = await ai.models.generateContent({
//   model: "gemini-2.0-flash",
//   contents: [ text ,
//   ],
//   config: {
//     tools: [{ codeExecution: {} }],
//   },
// });

// const parts = response?.candidates?.[0]?.content?.parts || [];

// //collecting all data 
// let results = [];

// parts.forEach((part) => {
//   if (part.text) {
//     results.push({ type: 'text', value: part.text });
//   }
//   if (part.executableCode && part.executableCode.code) {
//     results.push({ type: 'code', value: part.executableCode.code });
//   }
//   if (part.codeExecutionResult && part.codeExecutionResult.output) {
//     results.push({ type: 'output', value: part.codeExecutionResult.output });
//   }
// });

// //printing all data 
// res.json({ answer: response.text });

// results.forEach((data)=>{
//     console.log( "your data is as follows : ",data);
    
// })
//     } catch(err){
//         console.log('error occured :' , err);
//         res.status(500).json({error : err.message});
//     }
// })

// app.post('/url' , (req , res)=>{
//   try{
//      const text = req.body;
//      console.log("User question:", text);

//     const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
   

// async function main() {

//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash-preview-05-20",
//     contents: [
//         text ,
//     ],
//     config: {
//       tools: [{urlContext: {}}, {googleSearch: {}}],
//     },
//   });

//   //printing all data 
//   res.status(200).json({ answer: response.text });
//   console.log(response.text);

  
// }

// main();


//   }catch(err){
//     console.log('error occured :' , err);
//     res.status(500).json({error : err.message});
//   }
// })


// // this is not working ...
// //for image generation 
// app.use(express.static(__dirname));

// app.post('/image' , (req , res)=>{
//   try{
//     const text = req.body;
//        console.log("User question:", text);

//   const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
 
//   const response =  ai.models.generateImages({
//     model: 'imagen-3.0-generate-002',
//     prompt: text ,
//     config: {
//       numberOfImages: 4,
//     },
//   });

//   let idx = 1;
//   for (const generatedImage of response.generatedImages) {
//     let imgBytes = generatedImage.image.imageBytes;
//     console.log("imgBytes : " , imgBytes);
//     const buffer = Buffer.from(imgBytes, "base64");
//     console.log("image has been generated :)");
//     console.log("Buffer is " , buffer);
//     fs.writeFileSync(`imagen-${idx}.png`, buffer);
   
//     idx++;
//   }
//   let imageUrls = [];
//   for (let j = 1; j <= 4; j++) {
//   imageUrls.push(`http://localhost:5002/imagen-${j}.png`);
// }
// res.json({ images: imageUrls });
//  res.set('Content-Type', 'image/png');
//     res.status(200);
//     res.send(imageUrls);

//   }catch(err){

//   }
// })
// const upload = multer({ dest: 'uploads/' });

// app.post('/pdf', upload.single('file') ,(req, res) => {
//   try {
//     const text = req.body.text;
//     console.log("User question:", text);
//     const filePath = req.file.path;

//     const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

//     async function main() {
//       const contents = [
//         {
//           parts: [
//             { text: text },
//             {
//               inlineData: {
//                 mimeType: "application/pdf",
//                 data: Buffer.from(fs.readFileSync(filePath)).toString("base64")
//               }
//             }
//           ]
//         }
//       ];

//       const response = await ai.models.generateContent({
//       model: "gemini-2.0-flash"

// ,// or your model
//         contents: contents 
//       });
//        //printing all data 
//       res.json({ answer: response.text });
//       console.log("response.text");
//       res.status(200).send(response.text);
//     }

//     main();
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });


// app.listen(5002 , (req ,res) =>{
//    console.log('http://localhost:5002');
// })


import express from 'express';
const app = express();
import cors from 'cors';
app.use(cors());

import dotenv from 'dotenv';
dotenv.config();
import multer from 'multer';
import { GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAI } from '@google/generative-ai';

import * as fs from 'fs';
import bodyParser from 'body-parser';

// Fix for __dirname in ES modules:
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Basic text chat
app.post('/text', async (req, res) => {
  try {
    const { text } = req.body;
    console.log("User question:", text);

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: text,
    });

    res.json({ answer: response.text });
    console.log("Gemini answer:", response.text);
    
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({error : error.message });
  }
});

// Multi-turn chat
app.post('/chat', async (req, res) => {
  try {
    const { text, history = [] } = req.body;
    console.log("Multi-turn chat question:", text);

    // Initialize Gemini AI with your API key
    const ai = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

    // Create the generative model instance
    const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Set up the chat session with history if any
    const chat = model.startChat({ history });

    // Get AI's response
    const result = await chat.sendMessage(text);

    // result.response is a GenerativeContent object,
    // result.response.text() gives the text string
    const answer = result.response.text();

    res.json({ answer });
    console.log("Multi-turn chat answer:", answer);

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});
// Code execution
app.post('/code', async (req, res) => {
  try {
    const { text } = req.body;
    console.log("Code question:", text);
        
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    let response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [text],
      config: {
        tools: [{ codeExecution: {} }],
      },
    });

    const parts = response?.candidates?.[0]?.content?.parts || [];
    let results = [];

    parts.forEach((part) => {
      if (part.text) {
        results.push({ type: 'text', value: part.text });
      }
      if (part.executableCode && part.executableCode.code) {
        results.push({ type: 'code', value: part.executableCode.code });
      }
      if (part.codeExecutionResult && part.codeExecutionResult.output) {
        results.push({ type: 'output', value: part.codeExecutionResult.output });
      }
    });

    res.json({ answer: response.text, results });
    
  } catch(err) {
    console.log('error occurred:', err);
    res.status(500).json({error : err.message});
  }
});

// Thinking model
app.post('/thinking', async (req, res) => {
  try {
    const { text } = req.body;
    console.log("Thinking model question:", text);

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-thinking-exp',
      contents: text,
    });

    // Extract thinking process if available
    const thinking = response.candidates?.[0]?.content?.parts?.find(part => 
      part.thought || part.thinking
    );

    res.json({ 
      answer: response.text,
      thinking: thinking?.thought || thinking?.thinking || "Processing your request with deep analysis..."
    });
    
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({error : error.message });
  }
});

// Structured output
app.post('/structured', async (req, res) => {
  try {
    const { text, schema } = req.body;
    console.log("Structured output question:", text);

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `${text}\n\nPlease provide the response in the following JSON structure: ${JSON.stringify(schema)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    let structuredData;
    try {
      structuredData = JSON.parse(response.text);
    } catch (parseError) {
      structuredData = { raw: response.text };
    }

    res.json({ 
      answer: "Structured data generated successfully",
      structuredData
    });
    
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({error : error.message });
  }
});

// PDF analysis (existing)
const upload = multer({ dest: 'uploads/' });

app.post('/pdf', upload.single('file'), (req, res) => {
  try {
    const text = req.body.text;
    console.log("PDF analysis question:", text);
    const filePath = req.file.path;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    async function main() {
      const contents = [
        {
          parts: [
            { text: text },
            {
              inlineData: {
                mimeType: "application/pdf",
                data: Buffer.from(fs.readFileSync(filePath)).toString("base64")
              }
            }
          ]
        }
      ];

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: contents 
      });
      
      res.json({ answer: response.text });
      console.log("PDF analysis complete");
    }

    main();
  } catch (error) {
    console.error("PDF analysis error:", error);
    res.status(500).json({error: error.message});
  }
});

app.listen(5002, () => {
   console.log('Server running on https://ai-chat-box-2.onrender.com');
});