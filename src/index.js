const characters = [
    {
        NOME: "MARIO",
        VELOCIDADE: 4,
        MANOBRABILIDADE: 3,
        PODER: 3,
        PONTOS: 0,
        VITORIAS: 0,
        TURBOS: 0,
        CONFRONTOS_VENCIDOS: 0
    },
    {
        NOME: "LUIGI",
        VELOCIDADE: 3,
        MANOBRABILIDADE: 4,
        PODER: 4,
        PONTOS: 0,
        VITORIAS: 0,
        TURBOS: 0,
        CONFRONTOS_VENCIDOS: 0
    },
    {
        NOME: "PEACH",
        VELOCIDADE: 3,
        MANOBRABILIDADE: 4,
        PODER: 2,
        PONTOS: 0,
        VITORIAS: 0,
        TURBOS: 0,
        CONFRONTOS_VENCIDOS: 0
    },
    {
        NOME: "BOWSER",
        VELOCIDADE: 5,
        MANOBRABILIDADE: 2,
        PODER: 5,
        PONTOS: 0,
        VITORIAS: 0,
        TURBOS: 0,
        CONFRONTOS_VENCIDOS: 0
    },
    {
        NOME: "YOSHI",
        VELOCIDADE: 2,
        MANOBRABILIDADE: 4,
        PODER: 3,
        PONTOS: 0,
        VITORIAS: 0,
        TURBOS: 0,
        CONFRONTOS_VENCIDOS: 0
    },
    {
        NOME: "DONKEY KONG",
        VELOCIDADE: 5,
        MANOBRABILIDADE: 2,
        PODER: 4,
        PONTOS: 0,
        VITORIAS: 0,
        TURBOS: 0,
        CONFRONTOS_VENCIDOS: 0
    }
];


// ==========================================
// ESCOLHER DOIS PERSONAGENS ALEATORIAMENTE
// ==========================================

function chooseRandomCharacters() {

    const character1 =
        characters[Math.floor(Math.random() * characters.length)];

    let character2;

    do {
        character2 =
            characters[Math.floor(Math.random() * characters.length)];

    } while (character1 === character2);

    return [character1, character2];
}


// ==========================================
// ROLAR DADO
// ==========================================

async function rollDice() {

    return Math.floor(Math.random() * 6) + 1;

}


// ==========================================
// ESCOLHER BLOCO
// ==========================================

async function getRandomBlock() {

    let random = Math.random();

    let result;

    switch (true) {

        case random < 0.33:
            result = "RETA";
            break;

        case random < 0.66:
            result = "CURVA";
            break;

        default:
            result = "CONFRONTO";
    }

    return result;
}


// ==========================================
// ESCOLHER EVENTO ESPECIAL
// ==========================================

async function getRandomEvent() {

    let random = Math.random();

    // 25% de chance de não acontecer evento
    if (random < 0.25) {
        return "NORMAL";
    }

    // 25% de chance de evento +1 ponto
    if (random < 0.50) {
        return "PONTOS";
    }

    // 25% de chance de chuva
    if (random < 0.75) {
        return "CHUVA";
    }

    // 25% de chance de pista em chamas
    return "FOGO";
}


// ==========================================
// MOSTRAR RESULTADO DO DADO
// ==========================================

async function logRollResult(
    characterName,
    attributeName,
    diceResult,
    attribute
) {

    console.log(
        `${characterName} 🎲 rolou um dado de ${attributeName} ${diceResult} + ${attribute} = ${diceResult + attribute}`
    );

}


// ==========================================
// MOTOR DA CORRIDA
// ==========================================

async function playRaceEngine(character1, character2) {

    for (let round = 1; round <= 5; round++) {

        console.log(`\n🏁 RODADA ${round}`);

        console.log("-------------------");


        // ==========================================
        // EVENTO ESPECIAL
        // ==========================================

        let event = await getRandomEvent();


        if (event === "PONTOS") {

            console.log("⚡ EVENTO ESPECIAL!");
            console.log("Todos receberam +1 ponto! ⚡");

            character1.PONTOS++;
            character2.PONTOS++;

        }


        else if (event === "CHUVA") {

            console.log("🌧️ CHUVA!");
            console.log("A velocidade de todos foi reduzida em 1 nesta rodada.");

        }


        else if (event === "FOGO") {

            console.log("🔥 PISTA EM CHAMAS!");
            console.log("O confronto vale o dobro!");

        }


        else {

            console.log("☀️ Pista normal.");

        }


        // ==========================================
        // SORTEAR BLOCO
        // ==========================================

        let block = await getRandomBlock();

        console.log(`🏁 Bloco: ${block}`);


        // ==========================================
        // ROLAR DADOS
        // ==========================================

        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();


        // ==========================================
        // RETA
        // ==========================================

        if (block === "RETA") {

            let velocidade1 = character1.VELOCIDADE;
            let velocidade2 = character2.VELOCIDADE;


            // Chuva reduz velocidade em 1
            if (event === "CHUVA") {

                velocidade1--;
                velocidade2--;

                // Evitar velocidade negativa
                if (velocidade1 < 0) {
                    velocidade1 = 0;
                }

                if (velocidade2 < 0) {
                    velocidade2 = 0;
                }

            }


            let totalTestSkill1 =
                diceResult1 + velocidade1;

            let totalTestSkill2 =
                diceResult2 + velocidade2;


            await logRollResult(
                character1.NOME,
                "VELOCIDADE",
                diceResult1,
                velocidade1
            );


            await logRollResult(
                character2.NOME,
                "VELOCIDADE",
                diceResult2,
                velocidade2
            );


            if (totalTestSkill1 > totalTestSkill2) {

                character1.PONTOS++;
                character1.VITORIAS++;

                console.log(
                    `🏎️ ${character1.NOME} venceu a reta e marcou 1 ponto!`
                );

            }


            else if (totalTestSkill2 > totalTestSkill1) {

                character2.PONTOS++;
                character2.VITORIAS++;

                console.log(
                    `🏎️ ${character2.NOME} venceu a reta e marcou 1 ponto!`
                );

            }


            else {

                console.log(
                    "🤝 A reta terminou empatada!"
                );

            }

        }


        // ==========================================
        // CURVA
        // ==========================================

        if (block === "CURVA") {

            let totalTestSkill1 =
                diceResult1 + character1.MANOBRABILIDADE;

            let totalTestSkill2 =
                diceResult2 + character2.MANOBRABILIDADE;


            await logRollResult(
                character1.NOME,
                "MANOBRABILIDADE",
                diceResult1,
                character1.MANOBRABILIDADE
            );


            await logRollResult(
                character2.NOME,
                "MANOBRABILIDADE",
                diceResult2,
                character2.MANOBRABILIDADE
            );


            if (totalTestSkill1 > totalTestSkill2) {

                character1.PONTOS++;
                character1.VITORIAS++;

                console.log(
                    `🏎️ ${character1.NOME} venceu a curva e marcou 1 ponto!`
                );

            }


            else if (totalTestSkill2 > totalTestSkill1) {

                character2.PONTOS++;
                character2.VITORIAS++;

                console.log(
                    `🏎️ ${character2.NOME} venceu a curva e marcou 1 ponto!`
                );

            }


            else {

                console.log(
                    "🤝 A curva terminou empatada!"
                );

            }

        }


        // ==========================================
        // CONFRONTO
        // ==========================================

        if (block === "CONFRONTO") {

            let powerResult1 =
                diceResult1 + character1.PODER;

            let powerResult2 =
                diceResult2 + character2.PODER;


            console.log(
                `🥊 ${character1.NOME} confrontou com ${character2.NOME}!`
            );


            await logRollResult(
                character1.NOME,
                "PODER",
                diceResult1,
                character1.PODER
            );


            await logRollResult(
                character2.NOME,
                "PODER",
                diceResult2,
                character2.PODER
            );


            // ==========================================
            // SORTEAR CASCO OU BOMBA
            // ==========================================

            let item =
                Math.random() < 0.5
                    ? "CASCO"
                    : "BOMBA";


            let damage =
                item === "CASCO"
                    ? 1
                    : 2;


            // Pista em chamas dobra o dano
            if (event === "FOGO") {

                damage *= 2;

            }


            console.log(
                `🎲 Item sorteado: ${
                    item === "CASCO"
                        ? "🐢 CASCO"
                        : "💣 BOMBA"
                }`
            );


            console.log(
                `💥 Dano do item: ${damage} ponto(s)`
            );


            // ==========================================
            // VENCEDOR DO CONFRONTO
            // ==========================================

            if (powerResult1 > powerResult2) {

                character1.CONFRONTOS_VENCIDOS++;

                console.log(
                    `🥊 ${character1.NOME} venceu o confronto!`
                );


                // Tirar pontos do personagem 2

                if (character2.PONTOS > 0) {

                    character2.PONTOS -= damage;


                    if (character2.PONTOS < 0) {
                        character2.PONTOS = 0;
                    }


                    console.log(
                        `${character2.NOME} perdeu ${damage} ponto(s)!`
                    );

                }

                else {

                    console.log(
                        `${character2.NOME} não tinha pontos para perder.`
                    );

                }


                // ==========================================
                // CHANCE DE TURBO
                // ==========================================

                let turbo = Math.random() < 0.5;


                if (turbo) {

                    character1.PONTOS++;
                    character1.TURBOS++;

                    console.log(
                        `🚀 ${character1.NOME} ganhou um TURBO e recebeu +1 ponto!`
                    );

                }

                else {

                    console.log(
                        `❌ ${character1.NOME} não conseguiu o TURBO.`
                    );

                }

            }


            else if (powerResult2 > powerResult1) {

                character2.CONFRONTOS_VENCIDOS++;

                console.log(
                    `🥊 ${character2.NOME} venceu o confronto!`
                );


                // Tirar pontos do personagem 1

                if (character1.PONTOS > 0) {

                    character1.PONTOS -= damage;


                    if (character1.PONTOS < 0) {
                        character1.PONTOS = 0;
                    }


                    console.log(
                        `${character1.NOME} perdeu ${damage} ponto(s)!`
                    );

                }

                else {

                    console.log(
                        `${character1.NOME} não tinha pontos para perder.`
                    );

                }


                // ==========================================
                // CHANCE DE TURBO
                // ==========================================

                let turbo = Math.random() < 0.5;


                if (turbo) {

                    character2.PONTOS++;
                    character2.TURBOS++;

                    console.log(
                        `🚀 ${character2.NOME} ganhou um TURBO e recebeu +1 ponto!`
                    );

                }

                else {

                    console.log(
                        `❌ ${character2.NOME} não conseguiu o TURBO.`
                    );

                }

            }


            else {

                console.log(
                    "🤝 Confronto empatado! Ninguém perdeu pontos."
                );

            }

        }


        // ==========================================
        // PLACAR DA RODADA
        // ==========================================

        console.log("-------------------");

        console.log(
            `📊 ${character1.NOME}: ${character1.PONTOS} ponto(s)`
        );

        console.log(
            `📊 ${character2.NOME}: ${character2.PONTOS} ponto(s)`
        );

    }

}


// ==========================================
// PROGRAMA PRINCIPAL
// ==========================================

(async function main() {

    // Escolher dois personagens
    const [player1, player2] =
        chooseRandomCharacters();


    console.log(
        `\n🏁🚨 CORRIDA ENTRE ${player1.NOME} E ${player2.NOME} COMEÇANDO! 🚨🏁`
    );


    // Iniciar corrida
    await playRaceEngine(
        player1,
        player2
    );


    // ==========================================
    // RESULTADO FINAL E MEDALHAS
    // ==========================================

    console.log("\n");
    console.log("====================================");
    console.log("🏆 RESULTADO FINAL 🏆");
    console.log("====================================");


    if (player1.PONTOS > player2.PONTOS) {

        console.log(
            `🥇 ${player1.NOME}: ${player1.PONTOS} ponto(s)`
        );

        console.log(
            `🥈 ${player2.NOME}: ${player2.PONTOS} ponto(s)`
        );

        console.log(
            `\n🏆 ${player1.NOME} VENCEU A CORRIDA! 🏆`
        );

    }


    else if (player2.PONTOS > player1.PONTOS) {

        console.log(
            `🥇 ${player2.NOME}: ${player2.PONTOS} ponto(s)`
        );

        console.log(
            `🥈 ${player1.NOME}: ${player1.PONTOS} ponto(s)`
        );

        console.log(
            `\n🏆 ${player2.NOME} VENCEU A CORRIDA! 🏆`
        );

    }


    else {

        console.log(
            `🎖️ ${player1.NOME}: ${player1.PONTOS} ponto(s)`
        );

        console.log(
            `🎖️ ${player2.NOME}: ${player2.PONTOS} ponto(s)`
        );

        console.log(
            "\n🤝 A CORRIDA TERMINOU EMPATADA!"
        );

    }


    // ==========================================
    // ESTATÍSTICAS
    // ==========================================

    console.log("\n");
    console.log("====================================");
    console.log("📊 ESTATÍSTICAS DA CORRIDA");
    console.log("====================================");


    console.log(`\n🏎️ ${player1.NOME}`);

    console.log(
        `Vitórias: ${player1.VITORIAS}`
    );

    console.log(
        `Turbos: ${player1.TURBOS}`
    );

    console.log(
        `Confrontos vencidos: ${player1.CONFRONTOS_VENCIDOS}`
    );


    console.log(`\n🏎️ ${player2.NOME}`);

    console.log(
        `Vitórias: ${player2.VITORIAS}`
    );

    console.log(
        `Turbos: ${player2.TURBOS}`
    );

    console.log(
        `Confrontos vencidos: ${player2.CONFRONTOS_VENCIDOS}`
    );


    console.log("\n====================================");
    console.log("🏁 FIM DA CORRIDA!");
    console.log("====================================");

})();cls