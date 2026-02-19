#!/usr/bin/env node
import * as readline from "readline";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "..", "content", "blog");

function ask(rl, prompt) {
  return new Promise((resolve) => rl.question(prompt, resolve));
}

function todayYYYYMMDD() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}${m}${day}`;
}

function slugify(filename) {
  return filename
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_-]/g, "");
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  const title = (await ask(rl, "Title: ")).trim();
  if (!title) {
    console.error("Title is required.");
    rl.close();
    process.exit(1);
  }

  const description = (await ask(rl, "Description: ")).trim();
  if (!description) {
    console.error("Description is required.");
    rl.close();
    process.exit(1);
  }

  const shortName = (await ask(rl, "Short filename (e.g. comida): ")).trim();
  if (!shortName) {
    console.error("Short filename is required.");
    rl.close();
    process.exit(1);
  }

  rl.close();

  const slug = slugify(shortName);
  const dateStr = todayYYYYMMDD();
  const [y, m, d] = [dateStr.slice(0, 4), dateStr.slice(4, 6), dateStr.slice(6, 8)];
  const isoDate = `${y}-${m}-${d}T00:00:00.000Z`;
  const filename = `${dateStr}_${slug}.md`;
  const filepath = path.join(blogDir, filename);

  if (fs.existsSync(filepath)) {
    console.error(`File already exists: ${filepath}`);
    process.exit(1);
  }

  const content = `---
title: ${title}
description: ${description}
date: ${isoDate}
tags:
---

Write your post here.
`;

  fs.mkdirSync(blogDir, { recursive: true });
  fs.writeFileSync(filepath, content, "utf8");
  console.log(`Created: content/blog/${filename}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
