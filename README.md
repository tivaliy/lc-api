# lc-api

## Overview

`lc-api` is a project that provides an API service utilizing various language models. It is built using the NestJS framework and integrates with different language model services.

Supported LLM services:
- [x] OpenAI
- [x] Ollama
- [x] AWS Bedrock

## Motivation

The aim of this project is to play around with TypeScript, NestJS, and LangChain.

## Features

- **Language Model Integration**: Supports multiple language models.
- **Configurable**: Easily configurable through a centralized configuration service.
- **Modular Design**: Built with a modular design to facilitate easy extension and maintenance.

## Technologies Used

- **TypeScript**: The primary language used for development.
- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **LangChain**: A library for building language model applications.
- **npm**: Node package manager for managing dependencies.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/tivaliy/lc-api.git
   ```
2. Install dependencies:
   ```sh
   cd lc-api
   npm install
    ```
3. Copy the `.env.example` file and rename it to `.env`. Update the environment variables as needed.
4. Start the application:
   ```sh
   npm run start
   ```
5. The application should now be running on `http://localhost:8888`.

## Keywords

`TypeScript` | `NestJS` | `LangChain` | `LLM` | `API` | `Language Models`
