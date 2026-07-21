// Capitão Soluço e o Barba-de-Fogo — branching adventure graph (PT-PT, age 5)
// Node: { img, say, next? } linear  |  { img, say, decision: { ask, options: [{say, next, set?, needs?}] } }  |  { img, say, ending: {badge, name} }
// Flags (set by choices): 'bolo' (ghost cake), 'lore' (opera secret), 'empatia' (heard he's lonely)
// Finale shows max 3 options: unlocked first, then 'hip', then 'fuga'.

const NODES = {
  intro1: {
    img: 'intro1',
    say: 'Era uma vez um pirata muito corajoso! Bem... quase corajoso. Era o Capitão Soluço! Sempre que tinha medo, acontecia-lhe uma coisa engraçada: Hip! Soluços! Ele vivia numa praia dourada com o seu melhor amigo, o papagaio Louro.',
    next: 'intro2'
  },
  intro2: {
    img: 'intro2',
    say: 'Um dia, o céu ficou verde e zangado. O navio fantasma do terrível Barba-de-Fogo apareceu no horizonte! SWOOSH! O pirata fantasma voou até à praia e agarrou o Louro! "Socorro! Cruááá!", gritou o papagaio. E o navio desapareceu na neblina...',
    decision: {
      ask: 'O Capitão Soluço tinha de salvar o Louro! Mas como?',
      options: [
        { say: 'Zarpar já no seu barco à vela!', next: 'sea1' },
        { say: 'Remar pelo atalho secreto do mangal!', next: 'jung1' }
      ]
    }
  },

  // ---- SEA PATH ----
  sea1: {
    img: 'sea1',
    say: 'O Capitão Soluço içou as velas e zarpou! Os golfinhos saltavam à volta do barco, como se dissessem "nós ajudamos!" Mas ao longe... uma tempestade gigante, escura como tinta de choco! Hip!',
    decision: {
      ask: 'A tempestade estava mesmo à frente! O que fazer?',
      options: [
        { say: 'Enfrentar as ondas gigantes!', next: 'sea2a' },
        { say: 'Esconder-se na gruta brilhante!', next: 'sea2b' }
      ]
    }
  },
  sea2a: {
    img: 'sea2a',
    say: 'Coragem! O barco subiu montanhas de água e desceu vales espumosos! UOU! UOU! O Capitão Soluço ficou encharcado até aos ossos e o chapéu voou... mas ele aguentou-se! E o chapéu? Aterrou-lhe outra vez na cabeça. Que sorte!',
    next: 'lagoon1'
  },
  sea2b: {
    img: 'sea2b',
    say: 'O Capitão Soluço escondeu-se numa gruta que brilhava como mil estrelas-do-mar. Era linda! Mas um bocadinho assustadora. Hip! Ele esperou que a tempestade passasse, a contar estrelas brilhantes nas paredes.',
    next: 'lagoon1'
  },

  // ---- JUNGLE PATH ----
  jung1: {
    img: 'jung1',
    say: 'O atalho do mangal era verde e misterioso. De repente... macacos! Um macaco maroto saltou e roubou o chapéu do Capitão Soluço! "Devolve!", gritou ele. Hip! O macaco cheirou o chapéu, fez uma careta... e devolveu. Ih!',
    decision: {
      ask: 'À frente havia uma ponte velhinha sobre um rio de lama. E ao lado... uma liana enorme!',
      options: [
        { say: 'Atravessar a ponte com muito cuidado', next: 'jung2a' },
        { say: 'Voar na liana como um herói da selva!', next: 'jung2b' }
      ]
    }
  },
  jung2a: {
    img: 'jung2a',
    say: 'Devagarinho... devagarinho... tábua a tábua. Mas os soluços do Capitão abanavam a ponte toda! Hip! Hip! Uaaaa! A ponte balançava como gelatina! Ele chegou ao outro lado a tremer... mas inteiro!',
    next: 'lagoon1'
  },
  jung2b: {
    img: 'jung2b',
    say: 'TARZAAAAN! ... SPLAT! O Capitão Soluço caiu mesmo no meio de um lameiro! Ficou tão lambuzado que parecia um monstro de chocolate! Os macacos riram-se tanto que quase caíram das árvores.',
    next: 'lagoon1'
  },

  // ---- CONVERGE: LAGOON & TAVERN ----
  lagoon1: {
    img: 'lagoon1',
    say: 'Ao entardecer, o Capitão Soluço chegou à Lagoa da Caveira. E ali estava ele: o navio fantasma do Barba-de-Fogo, com chamas verdes a dançar no convés! Num cais velhinho, havia uma taberna feita de troncos à deriva...',
    next: 'tavern1'
  },
  tavern1: {
    img: 'tavern1',
    say: 'Lá dentro estava o Dente-de-Ouro, o pirata mais sabido dos sete mares! O seu dente de ouro brilhava como um farol. "Eu conheço a entrada secreta do navio fantasma", disse ele. "Mas o meu mapa tem um preço!"',
    decision: {
      ask: 'Como conseguir o mapa secreto?',
      options: [
        { say: 'Trocar pelo botão dourado do casaco', next: 'map_a' },
        { say: 'Desafiar para um concurso de olhares!', next: 'map_b' }
      ]
    }
  },
  map_a: {
    img: 'map_a',
    say: 'O Capitão Soluço tirou o botão mais brilhante do casaco. Os olhos do Dente-de-Ouro ficaram ENORMES! "Negócio fechado!" E o mapa secreto mudou de mãos. O casaco ficou com menos um botão... mas a aventura ganhou um mapa!',
    next: 'approach'
  },
  map_b: {
    img: 'map_b',
    say: 'Concurso de olhares! Um... dois... TRÊS! Ninguém pestanejava... ninguém... até que o Capitão Soluço fez... Hip! O Dente-de-Ouro riu tanto que caiu da cadeira! "Ganhaste, miúdo! És o pirata mais engraçado que já conheci!"',
    next: 'approach'
  },
  approach: {
    img: 'approach',
    say: 'Com o mapa na mão, o Capitão Soluço olhou para o navio fantasma. Estava tão perto! As chamas verdes reflectiam-se na água escura. Só faltava decidir... como ir lá ter?',
    decision: {
      ask: 'Como chegar ao navio fantasma?',
      options: [
        { say: 'Esconder-se num barril flutuante', next: 'ship_a' },
        { say: 'Remar até lá e bater à porta, como um pirata educado', next: 'ship_b' }
      ]
    }
  },

  // ---- GHOST SHIP ----
  ship_a: {
    img: 'ship_a',
    say: 'Plop! O Capitão Soluço escondeu-se num barril e flutuou até ao navio. Tudo corria bem... até que... Hip! O soluço ecoou lá dentro! Um esqueleto pirata espreitou por cima do barril. O Capitão prendeu a respiração... Ufa! O esqueleto foi-se embora.',
    next: 'ship1'
  },
  ship_b: {
    img: 'ship_b',
    say: 'O Capitão Soluço remou até ao navio fantasma e bateu à porta: TOC, TOC! O esqueleto pirata ficou tão confuso com tanta educação que... abriu a porta! "Obrigado!", disse o Capitão Soluço. Hip! Nunca ninguém tinha batido à porta daquele navio.',
    next: 'ship1'
  },
  ship1: {
    img: 'ship1',
    say: 'Lá dentro, o navio era verde e fantasmagórico. Lanternas flutuavam no ar como pirilampos! Havia dois corredores: de um vinha uma cantiga assustadora... do outro, um barulho muito conhecido: Cruááá!',
    decision: {
      ask: 'Que corredor seguir?',
      options: [
        { say: 'Seguir a cantiga misteriosa', next: 'sing_a', set: 'lore' },
        { say: 'Seguir o cruá do Louro!', next: 'squawk_a', set: 'bolo' }
      ]
    }
  },
  sing_a: {
    img: 'sing_a',
    say: 'No fim do corredor, um coro de fantasmas cantava! E na parede, um retrato: o Barba-de-Fogo quando era vivo... a cantar ópera num palco! O pirata fantasma ADORAVA cantar! O Capitão Soluço guardou este segredo. Podia ser muito útil!',
    next: 'cage1'
  },
  squawk_a: {
    img: 'squawk_a',
    say: 'O corredor passava pela cozinha fantasma. E em cima da mesa... um bolo fantasma brilhante! Cheirava a chocolate! (Sim, os fantasmas também gostam de bolo.) O Capitão Soluço guardou-o no saco. Nunca se sabe quando um bolo pode ser útil!',
    next: 'cage1'
  },
  cage1: {
    img: 'cage1',
    say: 'Cruááá! Cruááá! Ali estava o Louro, preso numa gaiola dourada, mesmo à porta do camarote do capitão! "Capitão! Cuidado, ele vem aí!", piou o Louro. Passos pesados ecoaram no corredor... DUM! DUM! DUM!',
    decision: {
      ask: 'O Barba-de-Fogo estava a chegar! Rápido!',
      options: [
        { say: 'Esconder atrás da pilha de tesouros', next: 'hide_a', set: 'empatia' },
        { say: 'Ficar quietinho e soluçar com coragem', next: 'stand_a' }
      ]
    }
  },
  hide_a: {
    img: 'hide_a',
    say: 'Escondido atrás das moedas de ouro, o Capitão Soluço ouviu o Barba-de-Fogo a falar com o retrato da avó: "Ninguém quer ser meu amigo, avó... nem o papagaio gosta de mim." O terrível pirata fantasma estava... triste? O coração do Capitão Soluço ficou apertadinho.',
    next: 'face1'
  },
  stand_a: {
    img: 'stand_a',
    say: 'O Capitão Soluço respirou fundo e ficou de pé, bem no meio do corredor. As pernas tremiam-lhe. Hip! Hip! Hip! Mas ele não fugiu. Um pirata a sério nunca abandona o seu papagaio!',
    next: 'face1'
  },

  // ---- CONFRONTATION ----
  face1: {
    img: 'face1',
    say: 'O Barba-de-Fogo apareceu! A barba de chamas verdes crepitava e os olhos brilhavam como brasas! "QUEM SE ATREVE A ENTRAR NO MEU NAVIO?!", trovejou ele. Hip! disse o Capitão Soluço. "Eu... eu venho buscar o meu papagaio!"',
    decision: {
      ask: 'E agora?! O que faz o Capitão Soluço?',
      options: [
        { say: 'Desafiar para um concurso de dança!', next: 'dance_a' },
        { say: 'Fazer cócegas na barba de fogo com uma pena!', next: 'tickle_a' }
      ]
    }
  },
  dance_a: {
    img: 'dance_a',
    say: '"DESAFIO-TE PARA UM CONCURSO DE DANÇA!", gritou o Capitão Soluço. O Barba-de-Fogo ficou de boca aberta! E depois... começou a dançar! Rebolava como uma tempestade! O Capitão Soluço fez o robô, o verme, e a galinha assustada! O navio inteiro tremeu com tanta dança!',
    next: 'finale'
  },
  tickle_a: {
    img: 'tickle_a',
    say: 'O Louro soltou uma pena, o Capitão Soluço agarrou nela e... CÓCEGAS NA BARBA! "Nããão! Tudo menos cócegas!", berrou o Barba-de-Fogo, a rir às gargalhadas! A barba de fogo começou a apagar-se: primeiro fogo grande, depois fumacinha, depois... fumos pequeninos!',
    next: 'finale'
  },

  // ---- FINALE (max 3 options shown: unlocked first, then hip, then fuga) ----
  finale: {
    img: 'finale',
    say: 'O Barba-de-Fogo estava distraído! A gaiola do Louro estava ali, mesmo ao alcance. Esta era a grande oportunidade do Capitão Soluço!',
    decision: {
      ask: 'O grande momento! O que faz o Capitão Soluço?',
      finale: true,
      options: [
        { say: 'Oferecer o bolo fantasma!', next: 'end_bolo', needs: 'bolo' },
        { say: 'Cantar a ópera do Barba-de-Fogo!', next: 'end_canto', needs: 'lore' },
        { say: 'Perguntar porque está ele tão triste', next: 'end_amigo', needs: 'empatia' },
        { say: 'Dar o maior soluço de sempre!', next: 'end_hip' },
        { say: 'Agarrar o Louro e fugir a sete pés!', next: 'end_fuga' }
      ]
    }
  },

  // ---- ENDINGS ----
  end_bolo: {
    img: 'end_bolo',
    say: '"Queres... um bocadinho de bolo?", perguntou o Capitão Soluço. O Barba-de-Fogo provou o bolo fantasma... e os olhos encheram-se de lágrimas de alegria! "Há cem anos que ninguém partilhava bolo comigo!" Fizeram uma festa na praia, e a barba de fogo serviu para acender as velas! Hip!',
    ending: { badge: '🎂', name: 'Festa da Amizade' }
  },
  end_canto: {
    img: 'end_canto',
    say: 'O Capitão Soluço começou a cantar a ópera do retrato! O Barba-de-Fogo ficou paralisado... e depois cantou com ele, com uma voz linda, forte como o trovão! Cantaram até ao nascer do sol, e o Louro fez de maestro. "Finalmente alguém que gosta de música!", disse o pirata fantasma, e abriu a gaiola com um sorriso.',
    ending: { badge: '🎵', name: 'Dueto Fantasma' }
  },
  end_amigo: {
    img: 'end_amigo',
    say: '"Porque é que estás tão triste?", perguntou o Capitão Soluço. E o Barba-de-Fogo contou tudo: estava sozinho há cem anos! O Capitão Soluço deu-lhe um grande abraço. (Cheirava um bocadinho a fumacinha.) A partir desse dia, o navio fantasma parou na Lagoa todos os domingos... para o lanche dos amigos!',
    ending: { badge: '💜', name: 'Coração de Pirata' }
  },
  end_hip: {
    img: 'end_hip',
    say: 'O Capitão Soluço encheu o peito de ar, abriu bem a boca e... HIIIIP! O MAIOR SOLUÇO DA HISTÓRIA DOS PIRATAS! A barba de fogo apagou-se como velas de aniversário! Sem chama, o Barba-de-Fogo desatou a rir e abriu a gaiola. "Volta quando quiseres", disse ele. "És o pirata mais engraçado que já conheci!"',
    ending: { badge: '💨', name: 'Soluço Supremo' }
  },
  end_fuga: {
    img: 'end_fuga',
    say: 'O Capitão Soluço agarrou na gaiola e CORREU! Escorregou pelo convés, saltou para um barril, rolou pelo cais e... SPLASH! mergulhou no mar! Nadaram até casa a rir às gargalhadas, com o navio fantasma a ficar cada vez mais pequenino. Que fuga maluca!',
    ending: { badge: '🛢️', name: 'Fuga Maluca' }
  }
};

const START_NODE = 'intro1';
const ALL_BADGES = ['🎂', '🎵', '💜', '💨', '🛢️'];
const GAME_TITLE = 'Capitão Soluço e o Barba-de-Fogo';
