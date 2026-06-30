import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import process from "node:process";
import OpenAI from "openai";

const promptsPath = join(process.cwd(), "data", "image-prompts.json");
const model = process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-2";
const limit = Number(process.env.IMAGE_LIMIT ?? 10);
const start = Number(process.env.IMAGE_START ?? 0);
const size = process.env.IMAGE_SIZE ?? "1024x1024";

function usage() {
  console.log(`Generate EVO Sporting USA product images.

Required:
  OPENAI_API_KEY

Optional:
  OPENAI_IMAGE_MODEL   Defaults to gpt-image-2
  IMAGE_START          Zero-based prompt index, defaults to 0
  IMAGE_LIMIT          Number of images to generate, defaults to 10
  IMAGE_SIZE           Defaults to 1024x1024

Examples:
  $env:OPENAI_API_KEY="..."
  $env:IMAGE_LIMIT="25"; npm run generate:images
  $env:IMAGE_START="25"; $env:IMAGE_LIMIT="25"; npm run generate:images
`);
}

async function writeImage(output, image) {
  await mkdir(dirname(output), { recursive: true });

  if (image.b64_json) {
    await writeFile(output, Buffer.from(image.b64_json, "base64"));
    return;
  }

  if (image.url) {
    const response = await fetch(image.url);
    if (!response.ok) throw new Error(`Image download failed: ${response.status}`);
    await writeFile(output, Buffer.from(await response.arrayBuffer()));
    return;
  }

  throw new Error("Image response had neither b64_json nor url");
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    usage();
    throw new Error("OPENAI_API_KEY is not set");
  }

  const prompts = JSON.parse(await readFile(promptsPath, "utf8"));
  const selected = prompts.slice(start, start + limit);
  const client = new OpenAI();

  for (const [offset, item] of selected.entries()) {
    const index = start + offset + 1;
    const output = join(process.cwd(), item.output);
    console.log(`[${index}/${prompts.length}] ${item.sku} ${item.name}`);
    const response = await client.images.generate({
      model,
      prompt: item.prompt,
      size,
    });
    await writeImage(output, response.data[0]);
    console.log(`  saved ${output}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
