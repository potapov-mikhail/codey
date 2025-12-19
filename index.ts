


async function main() {
    for await (const line of console) {
        const input = line.trim();
        if (input === "exit") break

        console.log(`Response: ${input.toUpperCase()}`);
        console.write("> ");
    }
}

main()