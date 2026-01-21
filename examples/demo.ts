import { localuid } from "../src/index"; 

console.log("--- 🚀 localuid Real-World Demo ---");

// 1. Simulating a Database Entry for a Search Engine
const searchResult = {
  id: localuid.number({ length: 13 }), // Max length for search engine table IDs
  title: "The Future of AI",
  slug: `post-${localuid.alphanumeric({ length: 8 })}`
};

console.log("Database Object:", searchResult);
console.log(`URL Path: /search/${searchResult.id}/${searchResult.slug}`);

// 2. Generating a Secure User Invite Fragment
const inviteCode = localuid.alpha({ length: 10 });
console.log(`Invite Code: ${inviteCode}`);

// 3. Using a Human-Friendly Custom Charset (Excluding 0, O, I, l)
const humanFriendlyId = localuid.custom(
  { length: 8 }, 
  "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
);
console.log(`Human Readable ID: ${humanFriendlyId}`);

console.log("-----------------------------------");